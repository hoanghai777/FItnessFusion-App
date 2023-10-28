import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Text, VStack, useTheme } from "native-base";
import { Image } from "expo-image";
import { ArrowCircleRight2 } from "iconsax-react-native";
import { IExercise, IFood, INews } from "../type/common";

type Props = {
  info: IFood & IExercise & INews;
  handleBtnNext?: any;
};

const HomeCard = (props: Props) => {
  const { colors } = useTheme();
  const { info, handleBtnNext } = props;

  return (
    <TouchableOpacity onPress={handleBtnNext}>
      <Box>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Image
            source={{ uri: info.image }}
            style={{ width: 96, height: 96, borderRadius: 16 }}
          />
          <VStack mx={4} flex={1}>
            <Box>
              <Text fontWeight={400} fontSize={16} color={"#000"}>
                {info.name}
              </Text>
            </Box>
            {info.calories && (
              <Text fontWeight={400} fontSize={14} color="text.500">
                {info.quantity}g - {info.calories} Calo
              </Text>
            )}
            {info.time && (
              <Text fontWeight={400} fontSize={14} color="text.500">
                {info.time} phút
              </Text>
            )}
          </VStack>
          <TouchableOpacity onPress={handleBtnNext}>
            <ArrowCircleRight2 size="32" color={colors.muted[500]} />
          </TouchableOpacity>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
