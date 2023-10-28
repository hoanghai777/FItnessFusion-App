import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, HStack, Icon, Input, Text, useTheme } from "native-base";
import { Add, ArrowLeft2, SearchNormal, Setting2 } from "iconsax-react-native";
import { RootState, useAppSelector } from "../store";

const HomeHeader = ({ name = "Jack 5M", handleSetting = null }: any) => {
  const { colors } = useTheme();

  return (
    <Box bgColor={"#fff"} px={4} py={2} borderBottomWidth={1} borderColor={'coolGray.200'}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={16} fontWeight={500} color={'coolGray.800'}>
          Hi, {name}
        </Text>
        {handleSetting && (
          <Box>
            <TouchableOpacity onPress={handleSetting}>
              <Setting2 size="24" color={colors.muted[800]} />
            </TouchableOpacity>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

const SearchingBar = () => {
  const { colors } = useTheme();
  return (
    <Box mb={2}>
      <Input
        backgroundColor={"white"}
        borderRadius={100}
        px={1.5}
        py={3}
        placeholder="Tìm kiếm"
        placeholderTextColor={colors.muted[400]}
        InputLeftElement={
          <TouchableOpacity>
            <Icon
              as={<SearchNormal size="16" color={colors.muted[400]} />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </TouchableOpacity>
        }
      />
    </Box>
  );
};

type Props = {
  handleBtnBack?: any;
  handleAdd?: any;
  handleDone?: any;
  handleSearch?: any;
  title: string;
};

const BasicHeader = (props: Props) => {
  // set when have user
  const user = useAppSelector((state: RootState) => state.user.user);
  const {
    title,
    handleBtnBack = null,
    handleAdd = null,
    handleDone = null,
    handleSearch = null,
  } = props;
  const { colors } = useTheme();
  return (
    <Box bgColor={"#fff"} px={4} py={2} borderBottomWidth={1} borderColor={'coolGray.200'}>
      <HStack alignItems={"center"} justifyContent={"space-between"} mb={2}>
        {handleBtnBack ? (
          <TouchableOpacity onPress={handleBtnBack}>
            <ArrowLeft2 size="32" color={colors.muted[800]} />
          </TouchableOpacity>
        ) : (
          <Box size={8} />
        )}
        <Text fontSize={16} fontWeight={500} color={"coolGray.800"}>
          {title}
        </Text>

        {handleAdd && (
          <TouchableOpacity onPress={handleAdd}>
            <Add size="32" color={colors.muted[800]} />
          </TouchableOpacity>
        )}
        {handleDone && (
          <TouchableOpacity onPress={handleDone}>
            <Text fontSize={16} fontWeight={500} color={'coolGray.800'}>
              Xong
            </Text>
          </TouchableOpacity>
        )}
        {!handleAdd && !handleDone && <Box size={8} />}
      </HStack>
      {handleSearch && <SearchingBar />}
    </Box>
  );
};

export default {
  BasicHeader,
  HomeHeader,
};

const styles = StyleSheet.create({});
