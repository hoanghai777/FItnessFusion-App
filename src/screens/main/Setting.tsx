import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Switch, Text, VStack, useTheme } from "native-base";
import Header from "../../components/Header";
import {
  Component,
  InfoCircle,
  Notification,
  Profile,
} from "iconsax-react-native";
import CustomButton from "../../components/CustomButton";
import { RootStackParams } from "../../navigations/config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../store";
import { removeUser } from "../../store/user.reducer";

type Props = {} & NativeStackScreenProps<RootStackParams, "Setting">;

type PartProps = {
  type: string;
  handleSwitchBtn?: any;
  handleBtn?: () => void;
};
const SettingPart = (props: PartProps) => {
  const { colors } = useTheme();
  const { type, handleSwitchBtn, handleBtn } = props;
  let IconTag, text;
  if (type == "notice") {
    text = "Thông báo";
    IconTag = <Notification size="28" color={colors.muted[500]} />;
  } else if (type == "profile") {
    text = "Cập nhật chỉ số trao đổi chất (BMI)";
    IconTag = <Profile size="28" color={colors.muted[500]} />;
  } else if (type == "reply") {
    text = "Gửi phản hồi";
    IconTag = <Component size="28" color={colors.muted[500]} />;
  } else if (type == "about") {
    text = "Về chúng tôi";
    IconTag = <InfoCircle size="28" color={colors.muted[500]} />;
  }

  return (
    <TouchableOpacity onPress={handleBtn} disabled={!handleBtn}>
      <HStack justifyContent={"space-between"}>
        <HStack alignItems={"center"}>
          {/* <IconTag /> */}
          {IconTag}
          <Text ml={2} fontWeight={400} fontSize={16} color={'muted.800'}>
            {text}
          </Text>
        </HStack>
        {handleSwitchBtn && <Switch size="sm" />}
      </HStack>
    </TouchableOpacity>
  );
};

const Setting = (props: Props) => {
  const { navigation } = props;
  const handleSetting = () => {};
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(removeUser());
  };
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.HomeHeader handleSetting={handleSetting} />
      <VStack flex={1} px={6} py={8} justifyContent={"space-between"}>
        <VStack space={6}>
          <SettingPart type="notice" />
          <SettingPart
            type="profile"
            handleBtn={() => {
              navigation.goBack();
            }}
          />
          <SettingPart
            type="reply"
            handleBtn={() => {
              navigation.navigate("Feedback");
            }}
          />
          <SettingPart
            type="about"
            handleBtn={() => {
              navigation.navigate("About");
            }}
          />
        </VStack>
        <Box>
          <CustomButton btnText="Đăng xuất" handleBtn={handleLogout} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Setting;

const styles = StyleSheet.create({});
