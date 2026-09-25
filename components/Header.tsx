import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

type Props = {
  totalCount: number;
  completedCount: number;
};

export default function Header({
  totalCount,
  completedCount,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Мої завдання
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textMuted },
          ]}
        >
          Організуйте свій день
        </Text>
      </View>

      <View
        style={[
          styles.counter,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text style={styles.counterText}>
          {completedCount}/{totalCount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 15,
    marginTop: 4,
  },

  counter: {
    minWidth: 58,
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});