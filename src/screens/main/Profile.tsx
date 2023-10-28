import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  HStack,
  Text,
  VStack,
  useTheme,
} from "native-base";
import Header from "../../components/Header";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { calculateBMI, evaluateBMI, getCurrentDate } from "../../utils/forms";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { firebaseDb } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ISession } from "../../type/common";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { createExercise, createFood, createNews } from "../../data/mockup";
// import { createExercise, createNews } from "../../data/mockup";

type BoxCaloriesProps = {
  type: "take" | "required";
  value: number;
};
const BoxCalories = (props: BoxCaloriesProps) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { type, value } = props;

  let bgColor, textColor, typeText, disabled;
  if (type == "take") {
    bgColor = colors.muted[100];
    textColor = "black";
    typeText = "Đã nạp";
    disabled = false;
  } else if (type == "required") {
    bgColor = colors.primary[600];
    textColor = "black";
    typeText = "Cần nạp";
    disabled = true;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => navigation.navigate("DailyMenu")}
      style={{ height: 125, flex: 1 }}
    >
      <Center height={125} flex={1} bgColor={bgColor} borderRadius={16}>
        <Text fontWeight={500} fontSize={30} color={textColor}>
          {value}
        </Text>
        <Text fontWeight={400} fontSize={16} color={textColor}>
          {typeText}
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav"> & any;

const date = new Date();
const Profile = (props: Props) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const [foodMenu, setFoodMenu] = useState<ISession>({});
  const [dailySession, setDailySession] = useState<ISession>({});

  const handleSetting = () => {
    navigation.navigate("Setting");
  };

  // Start Calculation
  const totalCaloriesNeeded = Object.keys(foodMenu).reduce(
    (total, curSessionId) => {
      const keyObj = Object.keys(foodMenu[curSessionId]);
      const caloriesEachSession = keyObj.reduce((totalCalories, foodId) => {
        return (
          totalCalories +
          foodMenu[curSessionId][foodId].quantityPicked! *
            Number(foodMenu[curSessionId][foodId].calories)
        );
      }, 0);
      return total + caloriesEachSession;
    },
    0
  );
  const totalCaloriesIn = Object.keys(dailySession).reduce(
    (total, curSessionId) => {
      const foodKey = Object.keys(dailySession[curSessionId]);
      const caloriesEachSession = foodKey.reduce((totalCalories, foodId) => {
        if (dailySession[curSessionId][foodId].status) {
          return (
            totalCalories +
            dailySession[curSessionId][foodId].quantityPicked! *
              Number(dailySession[curSessionId][foodId].calories)
          );
        }
        return totalCalories;
      }, 0);
      return total + caloriesEachSession;
    },
    0
  );
  const bmi =
    user && Number(calculateBMI(Number(user?.height), Number(user.weight)));
  const dayId = date.getDay().toString();
  const currentDate = getCurrentDate();
  // End Calculation

  useEffect(() => {
    const handleGetFoodSession = async () => {
      try {
        dispatch(setLoading());
        const docRef = doc(firebaseDb, "menus", dayId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const objSession = docSnap.data();
          setFoodMenu(objSession);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    handleGetFoodSession();
  }, [isFocused]);

  useEffect(() => {
    const handleDailyMenu = async () => {
      try {
        dispatch(setLoading());
        // Create or if not exist
        const docRef = doc(firebaseDb, "daily", currentDate);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const foodMenuDaily: ISession = foodMenu;
          Object.keys(foodMenuDaily).forEach((sessionId) => {
            const objFood = foodMenuDaily[sessionId];
            Object.keys(objFood).forEach((foodId) => {
              foodMenuDaily[sessionId][foodId].status = false;
            });
          });
          await setDoc(docRef, foodMenuDaily);
        } else {
          const currentDailyMenu: ISession = docSnap.data();
          // // when update menu, daily menu will update new food
          Object.keys(foodMenu).forEach((sessionId) => {
            const objFood = foodMenu[sessionId];
            // update new Session and status food
            if (!currentDailyMenu[sessionId]) {
              currentDailyMenu[sessionId] = objFood;
              Object.keys(currentDailyMenu[sessionId]).forEach((foodId) => {
                currentDailyMenu[sessionId][foodId].status = false;
              });
            }
            Object.keys(objFood).forEach((foodId) => {
              // update new food and its status
              if (!currentDailyMenu[sessionId][foodId]) {
                currentDailyMenu[sessionId][foodId] = {
                  ...objFood[foodId],
                  status: false,
                };
              }
            });
          });
          setDailySession(currentDailyMenu);
          await updateDoc(docRef, currentDailyMenu);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    handleDailyMenu();
  }, [foodMenu]);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader name={user?.fullname} handleSetting={handleSetting} />
      <Box px={4} py={6}>
        <VStack space={4}>
          <Box>
            <Text fontSize={20} fontWeight={500}>
              Hôm nay
            </Text>
          </Box>
          <HStack space={3}>
            <BoxCalories type="take" value={totalCaloriesIn} />
            <BoxCalories type="required" value={totalCaloriesNeeded} />
          </HStack>
          <Box bgColor={"muted.100"} borderRadius={16}>
            <VStack p={6} space={6}>
              <HStack>
                <Box>
                  <Text fontWeight={400} fontSize={16} color={'muted.900'}>
                    BMI
                  </Text>
                  <Text fontWeight={700} fontSize={30} color="primary.600">
                    {bmi}
                  </Text>
                </Box>
                {/* TODO: update BMI Btn */}
              </HStack>
              <Divider bgColor={"#fff"} />
              <HStack justifyContent={"space-between"}>
                <Box flex={1}>
                  <Text fontWeight={400} fontSize={16} color={'muted.900'}>
                    {user?.height} cm
                  </Text>
                  <Text fontWeight={700} fontSize={12} color="text.500">
                    Chiều cao
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text fontWeight={400} fontSize={16} color={'muted.900'}>
                    {user?.weight} kg
                  </Text>
                  <Text fontWeight={700} fontSize={12} color="text.500">
                    {evaluateBMI(bmi || 0)}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({});
