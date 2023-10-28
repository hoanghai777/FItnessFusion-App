import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ProfileCircle,
  Activity,
  Home3 as HomeIcon,
} from "iconsax-react-native";
import { useTheme } from "native-base";
import { BottomTabsParams } from "./config";
import Home from "../screens/main/Home";
import Profile from "../screens/main/Profile";
import Menu from "../screens/main/Menu";
// import { BottomTabsParams } from "./types";

const Tab = createBottomTabNavigator<BottomTabsParams>();

const TabNav = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.muted[300],
        tabBarActiveTintColor: colors.primary[600],
        tabBarShowLabel: false,
        tabBarStyle: {
          bottom: 0,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderColor:colors.coolGray[200],
          paddingTop: 12,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} variant="Bold" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileCircle size={size} color={color} variant="Bold" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({});
