import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const newColorTheme = {
  primary: {
    600: "#FEA135",
  },
  muted: {
    400: "#A3A3A3",
    700: "#404040",
    900: "#171717",
  },
  text: {
    400: "#A3A3A3",
    600: "#525252",
    900: "#171717",
  },
  error: {
    600: "#DC2626",
  },
};

const appTheme = extendTheme({
  colors: newColorTheme,
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto_100Thin",
        italic: "Roboto_100Thin_Italic",
      },
      300: {
        normal: "Roboto_300Light",
        italic: "Roboto_300Light_Italic",
      },
      400: {
        normal: "Roboto_400Regular",
        italic: "Roboto_400Regular_Italic",
      },
      500: {
        normal: "Roboto_500Medium",
        italic: "Roboto_500Medium_Italic",
      },
      700: {
        normal: "Roboto_700Bold",
        italic: "Roboto_700Bold_Italic",
      },
      900: {
        normal: "Roboto_900Black",
        italic: "Roboto_900Black_Italic",
      },
    },
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
  components: {
    Text: {
      baseStyle: {
        color: "#fff",
      },
    },
  },
});

export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
