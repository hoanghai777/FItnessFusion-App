import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, Text, useTheme } from "native-base";
import { ArrowCircleLeft2, ArrowCircleRight2 } from "iconsax-react-native";
import { IFood, ISession } from "../type/common";
import CustomButton from "./CustomButton";
import { getCurrentDate } from "../utils/forms";
import { useAppDispatch } from "../store";
import { removeLoading, setLoading } from "../store/loading.reducer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";

type Props = {
  AddFoodToSession?: Function;
  isUpdateDaily?: boolean;
  foodInfo: IFood;
  sessionId?: string;
  isEdit?: boolean;
};

const FoodMenuCard = (props: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const {
    AddFoodToSession = () => {},
    isEdit = false,
    foodInfo,
    isUpdateDaily = null,
    sessionId = "",
  } = props;
  const [food, setFood] = useState(foodInfo);
  const [quantity, setQuantity] = useState(foodInfo.quantityPicked || 0);
  const date = getCurrentDate();

  const isDisabledLeft = quantity == 0 || !isEdit;
  const isDisabledRight = !isEdit;

  useEffect(() => {
    if (AddFoodToSession) {
      AddFoodToSession(foodInfo, quantity);
    }
  }, [quantity]);

  const handleUpdateDaily = async () => {
    try {
      dispatch(setLoading());
      const docRef = doc(firebaseDb, "daily", date);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let allSessionFood: ISession = docSnap.data();
        await updateDoc(docRef, {
          [sessionId]: {
            ...allSessionFood[sessionId],
            [foodInfo.id!]: {
              ...foodInfo,
              status: true,
            },
          },
        });
      }
      setFood({ ...food, status: true });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(removeLoading());
    }
  };

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      bgColor={"muted.100"}
      px={4}
      py={3}
      borderRadius={16}
    >
      <Box>
        <Text fontSize={16} fontWeight={400} color="muted.900">
          {food.name}
        </Text>
        <Text fontSize={14} fontWeight={400} color="text.500">
          {food.quantity}g - {food.calories} Calories
        </Text>
      </Box>
      <Box>
        {isUpdateDaily ? (
          <Box width={10}>
            <CustomButton
              btnText={food.quantityPicked!.toString()}
              handleBtn={handleUpdateDaily}
              active={food.status}
            />
          </Box>
        ) : (
          <HStack space={2} alignItems={"center"}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity - 1)}
              disabled={isDisabledLeft}
            >
              <ArrowCircleLeft2
                size="24"
                color={isDisabledLeft ? colors.muted[500] : colors.primary[600]}
              />
            </TouchableOpacity>
            <Text fontSize={18} color="muted.900">
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              disabled={isDisabledRight}
            >
              <ArrowCircleRight2
                size="24"
                color={
                  isDisabledRight ? colors.muted[500] : colors.primary[600]
                }
              />
            </TouchableOpacity>
          </HStack>
        )}
      </Box>
    </HStack>
  );
};

export default FoodMenuCard;

const styles = StyleSheet.create({});
