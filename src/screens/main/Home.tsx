import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import HomeCard from "../../components/HomeCard";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { collection, getDocs } from "firebase/firestore";
import { IInfo } from "../../type/common";
import { firebaseDb } from "../../firebase";
import { convertHeaderTitle, convertTitle } from "../../utils/forms";
import { RootStackParams } from "../../navigations/config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { createFood } from "../../data/mockup";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav"> & any;

const Home = (props: Props) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const [list, setList] = useState<IInfo>([]);
  const [category, setCategory] = useState("foods");
  const btnArr = ["foods", "exercises", "news"];
  const fetchAllFood = async (category: string) => {
    // TODO: Define type for info
    try {
      dispatch(setLoading());
      const queryFood = await getDocs(collection(firebaseDb, category));
      const infos: IInfo = [];
      queryFood.forEach((doc: any) => {
        infos.push({ ...doc.data() });
      });
      setList(infos);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(removeLoading());
    }
  };

  const handleBtn = async (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    fetchAllFood(category);
  }, [category]);


  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader name={user?.fullname} />
      <VStack flex={1} px={6} pt={8} pb={4}>
        <HStack space={6}>
          {btnArr.map((cate) => (
            <Box flex={1} key={cate}>
              <CustomButton
                btnText={convertTitle(cate)}
                handleBtn={() => handleBtn(cate)}
                active={cate == category}
              />
            </Box>
          ))}
        </HStack>
        <Box my={4}>
          <Text fontWeight={400} fontSize={16} color={'muted.900'}>
            {convertHeaderTitle(category)}
          </Text>
        </Box>
        {/* List */}

        <ScrollView>
          <VStack flex={1} space={4}>
            {list.map((inf) => (
              <Box key={inf.id}>
                <HomeCard
                  info={inf}
                  handleBtnNext={() => {
                    props.navigation.navigate("InfoDetail", {
                      infoId: inf.id!,
                      infoType: category,
                    });
                  }}
                />
              </Box>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
