import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Auth?: NavigatorScreenParams<AuthStackParams>;
  TabNav?: undefined;
  CreateMenu: undefined;
  CreateMenu2: {
    dayId: string;
    sessionId: string;
  };
  BMI: undefined;
  Setting: undefined;
  About: undefined;
  Feedback: undefined;
  DailyMenu: undefined;
  InfoDetail: {
    infoId: string;
    infoType: string;
  };
};
export type BottomTabsParams = {
  Home: undefined;
  Menu: undefined;
  Profile: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  Phone: undefined;
  OTP: undefined;
  ForgotPassword: undefined;
  PostAuth: {
    phone: string;
    password: string;
  };
};
