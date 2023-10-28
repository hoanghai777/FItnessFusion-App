import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import MenuDayCard from "../../components/MenuDayCard";
import { RootStackParams } from "../../navigations/config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { convertDaytoName } from "../../utils/forms";
import { ISession } from "../../type/common";
import { useAppDispatch } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { useIsFocused } from "@react-navigation/native";

type Props = {} & NativeStackScreenProps<RootStackParams>;
const dayGroup = ["0", "1", "2", "3", "4", "5", "6"];
const Menu = (props: Props) => {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [dayId, setDayId] = useState("4");
  const [listSession, setListSession] = useState<ISession>({});

  const handleBtnAdd = () => {
    navigation.navigate("CreateMenu");
  };
  const handleSearch = () => {};

  const handleGetMenu = async () => {
    // Remove everything first
    try {
      dispatch(setLoading());
      const docRef = doc(firebaseDb, "menus", dayId);
      const docSnap = await getDoc(docRef);
      setListSession({});
      if (docSnap.exists()) {
        setListSession(docSnap.data());
      } else {
        setListSession({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(removeLoading());
    }
  };

  useEffect(() => {
    handleGetMenu();
  }, [dayId, isFocused]);

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Thực đơn của riêng bạn"
        handleAdd={handleBtnAdd}
        handleSearch={handleSearch}
      />
      <VStack px={6} pt={8} pb={4} space={4}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={2}>
            {dayGroup.map((valueId, idx) => (
              <Box width={20} key={`${valueId}-${idx}`}>
                <CustomButton
                  btnText={convertDaytoName(valueId)}
                  active={valueId == dayId}
                  handleBtn={() => setDayId(valueId)}
                />
              </Box>
            ))}
          </HStack>
        </ScrollView>
        <ScrollView>
          <VStack flex={1} mt={4}>
            <MenuDayCard listSession={listSession} />
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default Menu;

const styles = StyleSheet.create({});
