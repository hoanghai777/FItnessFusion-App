import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Alert, Box, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import PickGender from "../../components/PickGender";
import { EGender } from "../../type/user";
import { useAppDispatch } from "../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams, RootStackParams } from "../../navigations/config";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { fillProfileSchema, onInputChange } from "../../utils/forms";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { setUser } from "../../store/user.reducer";

type Props = {} & NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "PostAuth"
>;

type IProfileForm = {
  fullname: string;
  height: number;
  gender: EGender;
  weight: number;
  age: number;
};

const PostAuth = (props: Props) => {
  const { navigation, route } = props;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IProfileForm>({
    fullname: "",
    height: 0,
    age: 0,
    weight: 0,
    gender: EGender.M,
  });

  const handleSignUp = async () => {
    const { password, phone } = route.params!;
    dispatch(setLoading());
    try {
      await fillProfileSchema.validate(formData);
      const newDoc = doc(firebaseDb, "users", phone);
      const docData = {
        phone,
        password,
        ...formData,
      };
      await setDoc(newDoc, docData);
      dispatch(setUser(docData));
      navigation.navigate("TabNav");
    } catch (err) {
      Alert("Lỗi hệ thống");
    } finally {
      dispatch(removeLoading());
    }
  };
  return (
    <Box flex={1} bgColor={"#fff"} px={6}>
      <VStack>
        <Text fontSize={16} fontWeight={400} color={'muted.400'}>
          Chào mừng bạn đến với
        </Text>
        <Text fontSize={30} fontWeight={500} color={'muted.900'}>
          Sporty App
        </Text>
      </VStack>
      <VStack flex={1} space={4} mt={8}>
        <InputLabel
          label="Tên"
          placeholder="Nhập tên"
          value={formData.fullname}
          onChangeText={onInputChange<IProfileForm>(
            "fullname",
            setFormData,
            formData
          )}
        />
        <InputLabel
          label="Chiều cao"
          placeholder="Nhập chiều cao"
          value={formData.height.toString()}
          onChangeText={onInputChange<IProfileForm>(
            "height",
            setFormData,
            formData
          )}
        />
        <InputLabel
          label="Cân nặng"
          placeholder="Nhập cân nặng"
          value={formData.weight.toString()}
          onChangeText={onInputChange<IProfileForm>(
            "weight",
            setFormData,
            formData
          )}
        />
        <InputLabel
          label="Độ tuổi"
          placeholder="Nhập độ tuổi"
          value={formData.age.toString()}
          onChangeText={onInputChange<IProfileForm>(
            "age",
            setFormData,
            formData
          )}
        />
        <PickGender
          gender={formData.gender}
          setGender={onInputChange<IProfileForm>(
            "gender",
            setFormData,
            formData
          )}
        />
      </VStack>
      <Box mb={6}>
        <CustomButton btnText="Tiếp tục" handleBtn={handleSignUp} />
      </Box>
    </Box>
  );
};

export default PostAuth;

const styles = StyleSheet.create({});
