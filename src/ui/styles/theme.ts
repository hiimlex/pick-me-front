import theme from "styled-theming";

export const mainColorTheme = theme("theme", {
  light: "#2A0051",
  dark: "#9B51e0",
});

export const secondaryColorTheme = theme("theme", {
  light: "#9B51e0",
  dark: "#F2C94C",
});

export const mainTextColor = theme("theme", {
  light: "#333333",
  dark: "#ffffff",
});

export const backgroundColorTheme = theme("theme", {
  light: "#ffffff",
  dark: "#333333",
});

export const colorsTheme = theme.variants("theme", "color", {
  boldText: {
    light: "#333333",
    dark: "#ffffff",
  },
  semiText: {
    light: "#4f4f4f",
    dark: "#E0E0E0",
  },
  text: {
    light: "#828282",
    dark: "#E0E0E0",
  },
});
