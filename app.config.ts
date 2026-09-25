import { ConfigContext, ExpoConfig } from "expo/config";

const PROJECT_SLUG = "todo-app";

// TODO: заміни на значення, яке дасть eas project:init
const EAS_PROJECT_ID = "68b0ec60-b66f-4f7e-899d-19b3e08609cb";

// TODO: заміни на свій Expo username
const OWNER = "ilyfez";

const APP_NAME = "Todo App";
const BASE_PACKAGE = `com.${OWNER}.todoapp`;
const BASE_SCHEME = "todoapp";

const ICON = "./assets/images/icon.png";
const ANDROID_FOREGROUND =
  "./assets/images/android-icon-foreground.png";
const ANDROID_BACKGROUND =
  "./assets/images/android-icon-background.png";
const ANDROID_MONOCHROME =
  "./assets/images/android-icon-monochrome.png";

type Environment =
  | "development"
  | "preview"
  | "production";

export default ({ config }: ConfigContext): ExpoConfig => {
  const environment =
    (process.env.APP_ENV as Environment) || "development";

  console.log(
    "Building Todo App for environment:",
    environment
  );

  console.log(
    "Convex URL:",
    process.env.EXPO_PUBLIC_CONVEX_URL
  );

  const dynamicConfig = getDynamicConfig(environment);

  return {
    ...config,

    name: dynamicConfig.name,
    slug: PROJECT_SLUG,
    owner: OWNER,

    version: "1.0.0",

    orientation: "portrait",

    icon: dynamicConfig.icon,

    scheme: dynamicConfig.scheme,

    userInterfaceStyle: "automatic",

    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: dynamicConfig.bundleIdentifier,
      buildNumber: "1",
    },

    android: {
      package: dynamicConfig.packageName,
      versionCode: 1,

      predictiveBackGestureEnabled: false,

      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage:
          dynamicConfig.adaptiveIconForeground,
        backgroundImage:
          dynamicConfig.adaptiveIconBackground,
        monochromeImage:
          dynamicConfig.adaptiveIconMonochrome,
      },
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",

      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },

    runtimeVersion: {
      policy: "appVersion",
    },

    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },

      router: {},
    },
  };
};

function getDynamicConfig(environment: Environment) {
  switch (environment) {
    case "development":
      return {
        name: `${APP_NAME} Dev`,

        bundleIdentifier:
          `${BASE_PACKAGE}.dev`,

        packageName:
          `${BASE_PACKAGE}.dev`,

        scheme:
          `${BASE_SCHEME}-dev`,

        icon:
          "./assets/images/icons/icon-dev.png",

        adaptiveIconForeground:
          "./assets/images/icons/" +
          "android-icon-foreground-dev.png",

        adaptiveIconBackground:
          ANDROID_BACKGROUND,

        adaptiveIconMonochrome:
          ANDROID_MONOCHROME,
      };

    case "preview":
      return {
        name: `${APP_NAME} Preview`,

        bundleIdentifier:
          `${BASE_PACKAGE}.preview`,

        packageName:
          `${BASE_PACKAGE}.preview`,

        scheme:
          `${BASE_SCHEME}-preview`,

        icon:
          "./assets/images/icons/icon-preview.png",

        adaptiveIconForeground:
          "./assets/images/icons/" +
          "android-icon-foreground-preview.png",

        adaptiveIconBackground:
          ANDROID_BACKGROUND,

        adaptiveIconMonochrome:
          ANDROID_MONOCHROME,
      };

    case "production":
    default:
      return {
        name: APP_NAME,

        bundleIdentifier: BASE_PACKAGE,

        packageName: BASE_PACKAGE,

        scheme: BASE_SCHEME,

        icon: ICON,

        adaptiveIconForeground:
          ANDROID_FOREGROUND,

        adaptiveIconBackground:
          ANDROID_BACKGROUND,

        adaptiveIconMonochrome:
          ANDROID_MONOCHROME,
      };
  }
}
