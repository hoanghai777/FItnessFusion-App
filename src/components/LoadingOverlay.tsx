import { StyleSheet } from "react-native";
import React from "react";
import { Center, HStack, Heading, Spinner } from "native-base";
import { RootState, useAppSelector } from "../store";

const LoadingOverlay = () => {
  const loading = useAppSelector((state: RootState) => state.loading.isLoading);

  return (
    loading && (
      <Center style={styles.container}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color={"primary.600"} />
          <Heading color={"primary.600"} fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    )
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.15)",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
