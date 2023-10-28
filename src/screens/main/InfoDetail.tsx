import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, ScrollView, Text, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { useAppDispatch } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IExercise, IFood, INews } from "../../type/common";
import Header from "../../components/Header";
import { convertHeaderTitle } from "../../utils/forms";
import { Image } from "expo-image";

type Props = {} & NativeStackScreenProps<RootStackParams, "InfoDetail">;

type IObjInfo = IFood & IExercise & INews;

const InfoDetail = (props: Props) => {
  const { navigation, route } = props;
  const { infoId, infoType } = route.params;
  const [info, setInfo] = useState<IObjInfo>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleGetInfo = async () => {
      try {
        dispatch(setLoading());
        const docRef = doc(firebaseDb, infoType, infoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const objSession: any = docSnap.data();
          setInfo(objSession);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    handleGetInfo();
  }, []);
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        handleBtnBack={() => navigation.goBack()}
        title={convertHeaderTitle(infoType)}
      />
      <ScrollView>
        <VStack px={6} py={4}>
          <Text fontSize={28} fontWeight={500} color={"primary.600"}>
            {info?.name}
          </Text>
          <Box py={2}>
            <Image
              source={{ uri: info?.image }}
              style={{ width: "100%", height: 200, borderRadius: 20 }}
              contentFit="cover"
            />
          </Box>
          <VStack space={4}>
            {info?.content.map((cont, idx) => (
              <VStack space={2} key={`${cont}-${idx}`}>
                <Box>
                  <Text fontSize={18} fontWeight={"bold"} color={"muted.900"}>
                    {cont.title}
                  </Text>
                </Box>
                {cont.image && (
                  <Box alignItems={"center"}>
                    <Image
                      source={{ uri: cont.image }}
                      style={{ width: "100%", height: 150, borderRadius: 10 }}
                      contentFit="cover"
                    />
                  </Box>
                )}
                <Box>
                  <Text fontSize={16} color={"muted.900"}>
                    {cont.content}
                  </Text>
                </Box>
              </VStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default InfoDetail;

const styles = StyleSheet.create({});
