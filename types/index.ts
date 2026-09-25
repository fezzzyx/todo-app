export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type ThemeColors = {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  danger: string;
  statusBarStyle: "light" | "dark";
};

export type ThemeMode = "light" | "dark";