import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Box, Center, Text, VStack } from "native-base";
import Header from "../../components/Header";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";

type Props = {};

const PhoneScreen = (props: Props) => {
  const handleBtnBack = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box flex={1} bgColor={"#fff"}>
        <Header.BasicHeader
          title="Quên mật khẩu"
          handleBtnBack={handleBtnBack}
        />
        <VStack flex={1} px={6} pb={6} pt={2} justifyContent={"space-between"}>
          <Box>
            <Center mb={20}>
              <Text color="text.400">
                Nhập số điện thoại để khôi phục mật khẩu
              </Text>
            </Center>
            <InputLabel
              label="Số điện thoại"
              placeholder="Nhập số điện thoại/Email"
            />
          </Box>
          <Box px={6}>
            <CustomButton btnText="Đặt lại mật khẩu" />
          </Box>
        </VStack>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({});
