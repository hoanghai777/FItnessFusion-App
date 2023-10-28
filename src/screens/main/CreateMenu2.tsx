import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, ScrollView, VStack } from "native-base";
import Header from "../../components/Header";
import FoodMenuCard from "../../components/FoodMenuCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IFood, IFoodSession, ISession } from "../../type/common";
import { useAppDispatch } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";

type Props = {} & NativeStackScreenProps<RootStackParams, "CreateMenu2">;

const CreateMenu2 = (props: Props) => {
  const { navigation, route } = props;
  const { dayId, sessionId } = route.params;
  const dispatch = useAppDispatch();
  const [listAllFood, setListAllFood] = useState<IFood[]>([]);
  const [foodMenu, setFoodMenu] = useState<IFoodSession>({});

  // TODO: Get history menu to apply value to food quantity

  useEffect(() => {
    const handleGetFoodSession = async () => {
      try {
        dispatch(setLoading());
        const docRef = doc(firebaseDb, "menus", dayId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const objSession = docSnap.data();
          const objFood = objSession[sessionId];
          if (objFood) {
            setFoodMenu(objFood);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    handleGetFoodSession();
    const fetchAllFood = async () => {
      try {
        dispatch(setLoading());
        const queryFood = await getDocs(collection(firebaseDb, "foods"));
        const foods: IFood[] = [];
        queryFood.forEach((doc: any) => {
          foods.push({ ...doc.data() });
        });
        setListAllFood(foods);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    fetchAllFood();
  }, []);

  const handleFoodToMenu = (foodInfo: IFood, quantityPicked: number) => {
    setFoodMenu({
      ...foodMenu,
      [foodInfo.id!]: {
        ...foodInfo,
        quantityPicked,
      },
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };
  const handleSearch = () => {};
  const handleDone = async () => {
    try {
      const menuDocRef = doc(firebaseDb, "menus", dayId);
      // check exist before create
      const docRef = doc(firebaseDb, "menus", dayId);
      const docSnap = await getDoc(docRef);
      //NOTE: Remove item that have 0 quantity
      let newListAllFood: IFoodSession = {
        ...foodMenu,
      };
      Object.keys(newListAllFood).forEach((foodId) => {
        if (newListAllFood[foodId].quantityPicked == 0) {
          delete newListAllFood[foodId];
        }
      });
      // Check exist for update or create
      if (docSnap.exists()) {
        // update menu
        await updateDoc(docRef, {
          [sessionId]: newListAllFood,
        });
      } else {
        const menuData: ISession = {
          [sessionId]: newListAllFood,
        };
        await setDoc(menuDocRef, menuData);
      }
      navigation.navigate("TabNav");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Tạo thực đơn mới"
        handleBtnBack={handleBack}
        handleSearch={handleSearch}
        handleDone={handleDone}
      />
      <ScrollView>
        <VStack space={4} py={4} px={6}>
          {listAllFood.map((food) => (
            <Box key={food.id}>
              <FoodMenuCard
                foodInfo={food}
                AddFoodToSession={handleFoodToMenu}
                isEdit={true}
              />
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default CreateMenu2;

const styles = StyleSheet.create({});
