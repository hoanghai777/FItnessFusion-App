import { StyleSheet } from "react-native";
import React from "react";
import { Box, Select, Text } from "native-base";
type Props = {
  label: string;
  value: string;
  setValue: any;
  placeholder: string;
  selectData: Array<{
    label: string;
    value: string;
  }>;
};

const CustomSelect = (props: Props) => {
  const { label, value, setValue, placeholder, selectData } = props;
  return (
    <Box width="100%">
      <Text mb={1} color={"muted.700"}>
        {label}
      </Text>
      <Select
        minW={"100%"}
        height={10}
        color="muted.700"
        fontSize={16}
        borderRadius={100}
        borderColor={"muted.700"}
        selectedValue={value}
        placeholder={placeholder}
        _selectedItem={{
          bg: "teal.600",
        }}
        mt={1}
        onValueChange={(itemValue) => setValue(itemValue)}
      >
        {selectData.map((data, idx) => (
          <Select.Item
            label={data.label}
            value={data.value}
            key={`${data.value}-${idx}`}
          />
        ))}
      </Select>
    </Box>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({});
