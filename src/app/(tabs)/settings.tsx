import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../../../convex/_generated/api";
import { useTheme } from "../../../context/ThemeContext";

export default function SettingsScreen() {
  const {
    colors,
    isDarkMode,
    toggleTheme,
  } = useTheme();

  const clearCompleted = useMutation(
    api.todos.clearCompleted
  );

  const clearAll = useMutation(api.todos.clearAll);

  const handleClearCompleted = () => {
    Alert.alert(
      "Очистити виконані?",
      "Всі виконані завдання буде видалено.",
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            const result = await clearCompleted();

            Alert.alert(
              "Успішно",
              `Видалено ${result.deletedCount} завдань`
            );
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Видалити всі завдання?",
      "Цю дію неможливо скасувати.",
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Видалити все",
          style: "destructive",
          onPress: async () => {
            const result = await clearAll();

            Alert.alert(
              "Успішно",
              `Видалено ${result.deletedCount} завдань`
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: colors.bg },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Налаштування
        </Text>

        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textMuted },
            ]}
          >
            ОФОРМЛЕННЯ
          </Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor:
                      `${colors.primary}20`,
                  },
                ]}
              >
                <Ionicons
                  name={
                    isDarkMode ? "moon" : "sunny"
                  }
                  size={22}
                  color={colors.primary}
                />
              </View>

              <View>
                <Text
                  style={[
                    styles.rowTitle,
                    { color: colors.text },
                  ]}
                >
                  {isDarkMode
                    ? "Темна тема"
                    : "Світла тема"}
                </Text>

                <Text
                  style={[
                    styles.rowSubtitle,
                    { color: colors.textMuted },
                  ]}
                >
                  Змінити оформлення
                </Text>
              </View>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: colors.border,
                true: colors.primary,
              }}
            />
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textMuted },
            ]}
          >
            КЕРУВАННЯ ЗАВДАННЯМИ
          </Text>

          <Pressable
            onPress={handleClearCompleted}
            style={[
              styles.action,
              {
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="checkmark-done-outline"
              size={23}
              color={colors.success}
            />

            <Text
              style={[
                styles.actionText,
                { color: colors.text },
              ]}
            >
              Очистити виконані
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClearAll}
            style={styles.action}
          >
            <Ionicons
              name="trash-outline"
              size={23}
              color={colors.danger}
            />

            <Text
              style={[
                styles.actionText,
                { color: colors.danger },
              ]}
            >
              Видалити всі завдання
            </Text>
          </Pressable>
        </View>

        <View style={styles.about}>
          <Text
            style={[
              styles.aboutTitle,
              { color: colors.text },
            ]}
          >
            Todo App
          </Text>

          <Text
            style={[
              styles.aboutText,
              { color: colors.textMuted },
            ]}
          >
            Версія 3.0.0 • Convex Cloud
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 24,
  },

  section: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    padding: 16,
    paddingBottom: 8,
  },

  row: {
    minHeight: 76,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  rowSubtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  action: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "500",
  },

  about: {
    alignItems: "center",
    marginTop: 20,
  },

  aboutTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  aboutText: {
    marginTop: 4,
    fontSize: 13,
  },
});