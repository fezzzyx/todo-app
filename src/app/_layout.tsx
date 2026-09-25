import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ConvexProvider,
  ConvexReactClient,
} from "convex/react";

import {
  ThemeProvider,
  useTheme,
} from "../../context/ThemeContext";

const convexUrl =
  process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "EXPO_PUBLIC_CONVEX_URL is not configured"
  );
}

const convex = new ConvexReactClient(convexUrl);

function RootNavigator() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </ConvexProvider>
    </SafeAreaProvider>
  );
}