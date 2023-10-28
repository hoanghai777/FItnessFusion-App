import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Alert, Box, Center, Checkbox, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams, RootStackParams } from "../../navigations/config";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user.reducer";
import { IUserProfile } from "../../type/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

type Props = {} & NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "Login"
>;

const Login = (props: Props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("0914724869");
  const [password, setPassword] = useState("12345678");

  const onForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogIn = async () => {
    dispatch(setLoading());
    try {
      const docRef = doc(firebaseDb, "users", phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password !== password) {
          Alert("Sai mật khẩu");
        } else {
          const userProfile = {
            ...data,
          };
          await AsyncStorage.setItem("phone", phone);
          dispatch(setUser(userProfile as IUserProfile));
        }
      } else {
        // docSnap.data() will be undefined in this case
        Alert("Số điện thoại chưa đăng ký");
      }
    } catch (err) {
      console.error(err);
      Alert("Lỗi hệ thống hoặc mạng");
    } finally {
      dispatch(removeLoading());
    }
  };

  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"#fff"}
      px={6}
    >
      <VStack flex={1} justifyContent={"center"} space={4}>
        <Center>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 150, height: 150 }}
            contentFit="contain"
          />
        </Center>
        <InputLabel
          value={phone}
          onChangeText={setPhone}
          label="Số điện thoại"
          placeholder="Nhập số điện thoại/Email"
        />
        <InputLabel
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          showIcon={true}
          secureTextEntry={true}
        />
        <HStack justifyContent={"space-between"} mb={6}>
          <HStack space={2}>
            <Checkbox
              value="test"
              accessibilityLabel="This is a dummy checkbox"
              borderRadius={100}
              backgroundColor={"transparent"}
            />
            <Text fontWeight={400} fontSize={12} color={"text.600"}>
              Ghi nhớ đăng nhập
            </Text>
          </HStack>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text
              fontSize={12}
              color={"text.600"}
              textDecorationLine={"underline"}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box>
          <CustomButton btnText={"Đăng nhập"} handleBtn={handleLogIn} />
        </Box>
      </VStack>
      <HStack mb={16} space={1}>
        <Text fontWeight={400} color={"muted.600"}>
          Bạn chưa có tài khoản?
        </Text>
        <TouchableOpacity onPress={onSignUp}>
          <Text
            fontWeight={500}
            fontSize={12}
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Đăng ký
          </Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
