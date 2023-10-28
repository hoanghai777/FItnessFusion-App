import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Center, HStack, Text } from "native-base";
import { EGender } from "../type/user";

type PickGenderProps = {
  gender: any;
  setGender: any;
};

const PickGender = ({ gender, setGender }: PickGenderProps) => {
  const genderArr = [
    {
      gen: "M",
      name: "Nam",
    },
    {
      gen: "F",
      name: "Nữ",
    },
  ];
  return (
    <Box width="100%">
      <Text mb={1} color={"text.400"}>
        Giới tính
      </Text>
      <HStack
        justifyContent={"space-between"}
        borderWidth={1}
        borderColor={"muted.700"}
        borderRadius={100}
      >
        {genderArr.map((elm) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setGender(elm.gen)}
            key={elm.gen}
          >
            <Center
              bgColor={elm.gen == gender ? "primary.600" : "transparent"}
              height={10}
              borderRadius={100}
            >
              <Text color={elm.gen == gender ? "text.900" : "text.600"}>
                {elm.name}
              </Text>
            </Center>
          </TouchableOpacity>
        ))}
      </HStack>
    </Box>
  );
};

export default PickGender;

const styles = StyleSheet.create({});
