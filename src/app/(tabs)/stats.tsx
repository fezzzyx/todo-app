import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../../../convex/_generated/api";
import { useTheme } from "../../../context/ThemeContext";

export default function StatsScreen() {
  const { colors } = useTheme();

  const stats = useQuery(api.todos.getStats);

  if (stats === undefined) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.bg },
        ]}
      >
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        </View>
      </SafeAreaView>
    );
  }

  const cards = [
    {
      title: "Всього",
      value: stats.total,
      icon: "list-outline" as const,
      color: colors.primary,
    },
    {
      title: "Активні",
      value: stats.active,
      icon: "time-outline" as const,
      color: "#F59E0B",
    },
    {
      title: "Виконані",
      value: stats.completed,
      icon: "checkmark-circle-outline" as const,
      color: colors.success,
    },
    {
      title: "Прогрес",
      value: `${stats.percentage}%`,
      icon: "trending-up-outline" as const,
      color: "#8B5CF6",
    },
  ];

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
          Статистика
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textMuted },
          ]}
        >
          Аналітика завдань у реальному часі
        </Text>

        <View style={styles.grid}>
          {cards.map((card) => (
            <View
              key={card.title}
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.icon,
                  {
                    backgroundColor: `${card.color}20`,
                  },
                ]}
              >
                <Ionicons
                  name={card.icon}
                  size={26}
                  color={card.color}
                />
              </View>

              <Text
                style={[
                  styles.value,
                  { color: colors.text },
                ]}
              >
                {card.value}
              </Text>

              <Text
                style={[
                  styles.label,
                  { color: colors.textMuted },
                ]}
              >
                {card.title}
              </Text>
            </View>
          ))}
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    width: "48%",
    minHeight: 170,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  value: {
    fontSize: 30,
    fontWeight: "800",
  },

  label: {
    fontSize: 14,
    marginTop: 5,
  },
});