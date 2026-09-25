import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import TodoItem from "./TodoItem";

type Todo = {
  _id: string;
  text: string;
  isCompleted: boolean;
};

type Props = {
  todos: Todo[];
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: Props) {
  const { colors } = useTheme();

  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={[
            styles.empty,
            { color: colors.textMuted },
          ]}
        >
          Поки що немає завдань
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <TodoItem
          id={item._id}
          text={item.text}
          isCompleted={item.isCompleted}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    fontSize: 16,
  },
});