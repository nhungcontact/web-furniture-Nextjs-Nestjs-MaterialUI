/* eslint-disable max-lines */
import { PaletteMode } from "@mui/material";
// import { ThemeColor } from "@/types/shared";
import breakpoints from "./breakpoint";
import Shadows from "./shadows";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      main: string;
      tableHeaderBg: string;
      //   primaryGradient: string
    };
  }
  interface PaletteOptions {
    customColors?: {
      main?: string;
      tableHeaderBg?: string;
      //   primaryGradient?: string
    };
  }
}
//   let themeColor: ThemeColor;
// export const primaryGradient = () => {
//   if (themeColor === 'primary') {
//     return '#C6A7FE'
//   } else if (themeColor === 'secondary') {
//     return '#9C9FA4'
//   } else if (themeColor === 'success') {
//     return '#93DD5C'
//   } else if (themeColor === 'error') {
//     return '#FF8C90'
//   } else if (themeColor === 'warning') {
//     return '#FFCF5C'
//   } else {
//     return '#6ACDFF'
//   }
// }
export const primary = {
  50: "#F2EBFF",
  100: "#E5D7FF",
  200: "#CAAEFE",
  300: "#B086FE",
  400: "#9155FD",
  500: "#7B35FD",
  600: "#610DFD",
  700: "#4F02DE",
  800: "#4102B6",
};
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    customColors: {
      ...(mode === "light"
        ? {
            main: "58, 53, 65",
            tableHeaderBg: "#F9FAFC",
          }
        : {
            main: "231, 227, 252",
            tableHeaderBg: "#3D3759",
          }),
      //   primaryGradient: primaryGradient(),
    },
    common: {
      black: "#000",
      white: "#FFF",
    },
    primary: {
      light: "#9E69FD",
      main: primary[400],
      dark: "#804BDF",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#9C9FA4",
      main: "#8A8D93",
      dark: "#777B82",
      contrastText: "#FFF",
    },
    success: {
      light: "#6AD01F",
      main: "#56CA00",
      dark: "#4CB200",
      contrastText: "#FFF",
    },
    error: {
      light: "#FF6166",
      main: "#FF4C51",
      dark: "#E04347",
      contrastText: "#FFF",
    },
    warning: {
      light: "#FFCA64",
      main: "#FFB400",
      dark: "#E09E00",
      contrastText: "#FFF",
    },
    info: {
      light: "#32BAFF",
      main: "#16B1FF",
      dark: "#139CE0",
      contrastText: "#FFF",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#D5D5D5",
      A200: "#AAAAAA",
      A400: "#616161",
      A700: "#303030",
    },
    mode,
    ...(mode === "light"
      ? {
          // light
          text: {
            // primary: `rgba(58, 53, 65, 0.87)`,
            primary: `#000000`,
            // secondary: `rgba(58, 53, 65, 0.68)`,
            secodary: `#000000`,
            disabled: `rgba(58, 53, 65, 0.38)`,
          },
          divider: `rgba(58, 53, 65, 0.12)`,
          background: {
            paper: "#FFF",
            default: "#F4F5FA",
          },
          action: {
            active: `rgba(58, 53, 65, 0.54)`,
            hover: `rgba(58, 53, 65, 0.04)`,
            selected: `rgba(58, 53, 65, 0.08)`,
            disabled: `rgba(58, 53, 65, 0.3)`,
            disabledBackground: `rgba(58, 53, 65, 0.18)`,
            focus: `rgba(58, 53, 65, 0.12)`,
          },
        }
      : {
          // dark
          text: {
            primary: `rgba(231, 227, 252, 0.87)`,
            secondary: `rgba(231, 227, 252, 0.68)`,
            disabled: `rgba(231, 227, 252, 0.38)`,
          },
          divider: `rgba(231, 227, 252, 0.12)`,
          background: {
            paper: "#312D4B",
            default: "#28243D",
          },
          action: {
            active: `rgba(231, 227, 252, 0.54)`,
            hover: `rgba(231, 227, 252, 0.04)`,
            selected: `rgba(231, 227, 252, 0.08)`,
            disabled: `rgba(231, 227, 252, 0.3)`,
            disabledBackground: `rgba(231, 227, 252, 0.18)`,
            focus: `rgba(231, 227, 252, 0.12)`,
          },
        }),
  },
  breakpoints: breakpoints(),
  shape: {
    borderRadius: 7,
  },
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
  shadow: Shadows(mode),
  typography: {
    fontFamily: [
      "Inter",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
