/* eslint-disable max-lines */
import { createTheme } from "@mui/material";
// import "@fontsource/Open Sans"; // Defaults to weight 400
import "@fontsource/open-sans"; // Defaults to weight 400
declare module "@mui/material/styles" {
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    outline_gradient: true;
    outline_chip: true;
  }
}
declare module "@mui/material/FormControl" {
  interface FormControlPropsColorOverrides {
    neutral: true;
  }
}
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    neutral: true;
  }
  interface TextFieldPropsVariantOverrides {
    neutral: true;
  }
}
// yellow
export const secondary = {
  50: "#FEF9EB",
  100: "#FCB9B1",
  200: "#F9D876",
  300: "#F7C83B",
  400: "#E7B10A",
  500: "#B08607",
  600: "#C49508",
  700: "#3B2D02",
  800: "#140F01",
};
// green
export const primary = {
  50: "#F2F7F6",
  100: "#E5F0ED",
  200: "#5B9A88",
  300: "#447466",
  400: "#2B4A41",
  500: "#264039",
  600: "#1E332D",
  700: "#0F1A17",
  800: "#080D0B",
};
export const neutral = {
  50: "#FFFFFF",
  100: "#F1F2F3",
  200: "#B6BABE",
  300: "#80878E",
  400: "#4F5459",
  500: "#272A2C",
  600: "#1F2123",
};
export const success = {
  50: "#E2F7DE",
  100: "#C5EFBE",
  200: "#A8E69D",
  300: "#8BDE7D",
  400: "#6ED65C",
  500: "#58AB4A",
  600: "#428037",
  700: "#2C5625",
  800: "#162B12",
};
export const informative = {
  50: "#D1EDFA",
  100: "#A4DBF5",
  200: "#76C9EF",
  300: "#49B7EA",
  400: "#1BA5E5",
  500: "#1684B7",
  600: "#106389",
  700: "#0B425C",
  800: "#05212E",
};

export const warning = {
  50: "#FFF8CC",
  100: "#FFF199",
  200: "#FFEA66",
  300: "#FFE333",
  400: "#FFDC00",
  500: "#CCB000",
  600: "#998400",
  700: "#665800",
  800: "#332C00",
};

export const danger = {
  50: "#FFDEDD",
  100: "#FFBDBB",
  200: "#FF9B98",
  300: "#FF7A76",
  400: "#FF5954",
  500: "#CC4743",
  600: "#993532",
  700: "#662422",
  800: "#331211",
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: primary[400],
      light: primary[300],
      dark: primary[500],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: secondary[400],
      light: secondary[200],
      dark: secondary[500],
      contrastText: "#FFFFFF",
    },
    neutral: {
      main: neutral[400],
      light: neutral[200],
      dark: neutral[600],
    },
    success: {
      main: success[400],
      light: success[200],
      dark: success[600],
    },
    info: {
      main: informative[400],
      light: informative[200],
      dark: informative[600],
    },
    warning: {
      main: warning[400],
      light: warning[200],
      dark: informative[600],
    },
    error: {
      main: danger[400],
      light: danger[200],
      dark: danger[600],
    },
  },
  typography: {
    caption: {
      fontSize: 13,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "18px",
      fontFamily: "Open Sans",
    },
    subtitle1: {
      fontSize: 13,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "18px",
      fontFamily: "Open Sans",
    },
    body1: {
      fontSize: 16,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "24px",
      fontFamily: "Open Sans",
    },
    body2: {
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Open Sans",
    },
    h5: {
      fontSize: 18,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "31px",
      fontFamily: "Open Sans",
    },
    h4: {
      fontSize: 20,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "31px",
      fontFamily: "Open Sans",
    },
    h3: {
      fontSize: 24,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "46px",
      fontFamily: "Open Sans",
    },
    h2: {
      fontSize: 32,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "60px",
      fontFamily: "Open Sans",
    },
    h1: {
      fontSize: 36,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "90px",
      fontFamily: "Open Sans",
    },
    button: {
      fontSize: 13,
      textTransform: "none",
    },
  },
  //   components: {
  //     MuiButton: {
  //       variants: [
  //         {
  //           props: {
  //             variant: "gradient",
  //             color: "primary",
  //           },
  //           style: {
  //             background: "linear-gradient(90deg, #F24B26 0%, #FFAE35 121.43%)",
  //             color: `${neutral[50]}`,
  //             borderRadius: "2px",
  //           },
  //         },
  //         {
  //           props: {
  //             variant: "outline_gradient",
  //             color: "primary",
  //           },
  //           style: {
  //             color: `${neutral[50]}`,
  //             border: "2px solid",
  //             borderImage: "linear-gradient(90deg, #F24B26 0%, #FFAE35 121.43%) 1",
  //             borderRadius: "2px",
  //           },
  //         },
  //         {
  //           props: {
  //             variant: "outline_chip",
  //             color: "primary",
  //           },
  //           style: {
  //             color: `${neutral[50]}`,
  //             border: `1px solid`,
  //             borderRadius: "2px",
  //           },
  //         },
  //       ],
  //     },
  //   },
});
