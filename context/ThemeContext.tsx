import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeColors, ThemeMode } from "../types";

const THEME_KEY = "@todo_theme_mode";

export const lightColors: ThemeColors = {
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  text: "#111827",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  primary: "#4F46E5",
  success: "#10B981",
  danger: "#EF4444",
  statusBarStyle: "dark",
};

export const darkColors: ThemeColors = {
  bg: "#111827",
  surface: "#1F2937",
  text: "#F9FAFB",
  textMuted: "#9CA3AF",
  border: "#374151",
  primary: "#818CF8",
  success: "#34D399",
  danger: "#F87171",
  statusBarStyle: "light",
};

type ThemeContextType = {
  mode: ThemeMode;
  isDarkMode: boolean;
  colors: ThemeColors;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((value) => {
      if (value === "light" || value === "dark") {
        setMode(value);
      }
    });
  }, []);

  const toggleTheme = async () => {
    const newMode = mode === "light" ? "dark" : "light";

    setMode(newMode);
    await AsyncStorage.setItem(THEME_KEY, newMode);
  };

  const value = {
    mode,
    isDarkMode: mode === "dark",
    colors: mode === "dark" ? darkColors : lightColors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}