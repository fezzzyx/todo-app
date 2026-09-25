import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";

import { useTheme } from "../context/ThemeContext";

type Props = {
  onAdd: (text: string) => Promise<void>;
};

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const { colors } = useTheme();

  const handleAdd = async () => {
    const trimmed = text.trim();

    if (!trimmed) return;

    await onAdd(trimmed);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Нове завдання..."
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />

      <Pressable
        onPress={handleAdd}
        style={[
          styles.button,
          { backgroundColor: colors.primary },
        ]}
      >
        <Ionicons
          name="add"
          size={26}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  button: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});