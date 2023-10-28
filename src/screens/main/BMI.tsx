import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Text, VStack } from "native-base";
import Header from "../../components/Header";
import InputLabel from "../../components/InputLabel";
import PickGender from "../../components/PickGender";


type Props = {};

const BMI = (props: Props) => {
  const [gender, setGender] = useState("M");
  const handleBtnBack = () => {};
  const handleDone = () => {};

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Cập nhật BMI"
        handleBtnBack={handleBtnBack}
        handleDone={handleDone}
      />
      <Box px={6} py={4}>
        <VStack space={4}>
          <InputLabel label="Calo ngày" placeholder="3000" />
          <InputLabel label="Chiều cao" placeholder="180" />
          <InputLabel label="Cân nặng" placeholder="52" />
          <InputLabel label="Tuổi" placeholder="18" />
          <PickGender gender={gender} setGender={setGender} />
        </VStack>
      </Box>
    </Box>
  );
};

export default BMI;

const styles = StyleSheet.create({});
