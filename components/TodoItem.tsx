import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";

type Props = {
  id: string;
  text: string;
  isCompleted: boolean;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TodoItem({
  id,
  text,
  isCompleted,
  onToggle,
  onDelete,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Pressable
        onPress={() => onToggle(id)}
        style={styles.check}
      >
        <Ionicons
          name={
            isCompleted
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={28}
          color={
            isCompleted
              ? colors.success
              : colors.textMuted
          }
        />
      </Pressable>

      <Text
        style={[
          styles.text,
          { color: colors.text },
          isCompleted && {
            color: colors.textMuted,
            textDecorationLine: "line-through",
          },
        ]}
      >
        {text}
      </Text>

      <Pressable
        onPress={() => onDelete(id)}
        style={styles.delete}
      >
        <Ionicons
          name="trash-outline"
          size={21}
          color={colors.danger}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  check: {
    marginRight: 10,
  },  

  text: {
    flex: 1,
    fontSize: 16,
  },

  delete: {
    padding: 8,
    marginLeft: 6,
  },
});