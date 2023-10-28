import { StyleSheet } from "react-native";
import React from "react";
import { Box, Center, HStack, Text, VStack, useTheme } from "native-base";
import FoodMenuCard from "./FoodMenuCard";
import { ISession } from "../type/common";
import { convertSessionToName } from "../utils/forms";

type Props = {
  listSession: ISession;
  isUpdateDaily?: boolean;
};

const MenuDayCard = (props: Props) => {
  const { listSession, isUpdateDaily } = props;

  const sessionKey = Object.keys(listSession);

  return (
    <VStack space={4}>
      {sessionKey.map((session, idx) => {
        const foodKey = Object.keys(listSession[session]);
        const objectFood = listSession[session];
        return (
          foodKey.length > 0 && (
            <Box key={`${session}-${idx}`}>
              <HStack justifyContent={"space-between"} mb={1}>
                <Box>
                  <Text fontWeight={400} fontSize={16} color='muted.900'>
                    {convertSessionToName(session)}
                  </Text>
                </Box>
              </HStack>
              <VStack space={2}>
                {foodKey.map((food) => (
                  <Box key={food}>
                    <FoodMenuCard
                      foodInfo={objectFood[food]}
                      sessionId={session}
                      isUpdateDaily={isUpdateDaily}
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          )
        );
      })}
      {/* Show info when not having menu */}
      {sessionKey.length == 0 && (
        <Center mt={8}>
          <Text fontSize={20} fontWeight={500}>
            Chưa xây dựng thực đơn
          </Text>
        </Center>
      )}
    </VStack>
  );
};

export default MenuDayCard;

const styles = StyleSheet.create({});
