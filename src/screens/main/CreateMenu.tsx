import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Center, Text, VStack } from "native-base";
import Header from "../../components/Header";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import CustomSelect from "../../components/CustomSelect";
import { selectDays, selectSession } from "../../data/utils";

type Props = {} & NativeStackScreenProps<RootStackParams>;

const CreateMenu = (props: Props) => {
  const { navigation } = props;
  const [session, setSession] = useState("");
  const [day, setDay] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate("CreateMenu2", {
      dayId: day,
      sessionId: session,
    });
  };
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader title="Tạo thực đơn mới" handleBtnBack={handleBack} />
      <Center flex={1} px={6}>
        <VStack space={4}>
          <CustomSelect
            value={day}
            setValue={setDay}
            label="Ngày"
            placeholder="Ngày"
            selectData={selectDays}
          />
          <CustomSelect
            value={session}
            setValue={setSession}
            label="Bữa ăn"
            placeholder="Nhập tên"
            selectData={selectSession}
          />
          <Box mt={4}>
            <CustomButton
              btnText="Tiếp tục"
              handleBtn={handleNext}
              disabled={!Boolean(day) || !Boolean(session)}
              active={Boolean(day) && Boolean(session)}
            />
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};

export default CreateMenu;

const styles = StyleSheet.create({});
