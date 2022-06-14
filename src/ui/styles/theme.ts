import theme from "styled-theming";

export const mainColorTheme = theme("theme", {
  light: "#2A0051",
  dark: "#9B51e0",
});

export const secondaryColorTheme = theme("theme", {
  light: "#BB6BD9",
  dark: "#F2C94C",
});

export const inputBackgroundColor = theme("theme", {
  light: "#e1e1e1",
  dark: "#222",
});

export const mainTextColor = theme("theme", {
  light: "#333333",
  dark: "#ffffff",
});

export const secondaryTextColor = theme("theme", {
  light: "#4F4F4F",
  dark: "#E0E0E0",
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
  error: {
    light: "#ff5565",
    dark: "#ff5565",
  },
});

export type ColorsType = "boldText" | "semiText" | "text" | "error";

export const notifierTypes = theme.variants("theme", "type", {
  success: {
    light: "#2F0B51",
    dark: "#9B51e0",
  },
  error: {
    light: "#ff5565",
    dark: "#ff5565",
  },
  warning: {
    light: "#ffc000",
    dark: "#ffc000",
  },
});

export type NotifierType = "success" | "error" | "warning";
