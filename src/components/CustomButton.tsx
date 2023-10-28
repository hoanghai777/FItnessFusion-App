import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, IButtonProps, Text } from "native-base";

type Props = {
  btnText: string;
  active?: boolean;
  handleBtn?: any;
  disabled?: boolean
} & IButtonProps;

const CustomButton = (props: Props) => {
  const { btnText, handleBtn, active = true, disabled = false } = props;
  return (
    <TouchableOpacity onPress={handleBtn} disabled={disabled}>
      <Box
        width="100%"
        borderRadius={100}
        bgColor={active ? "primary.600" : "#fff"}
        height={10}
        borderColor={"primary.600"}
        borderWidth={1}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text
          fontWeight={500}
          fontSize={14}
          color={active ? "text.900" : "primary.600"}
        >
          {btnText}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
