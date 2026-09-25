import { useMutation, useQuery } from "convex/react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "../../../convex/_generated/api";
import Header from "../../../components/Header";
import TodoForm from "../../../components/TodoForm";
import TodoList from "../../../components/TodoList";
import { useTheme } from "../../../context/ThemeContext";

export default function TodosScreen() {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const completedCount =
    todos?.filter((todo) => todo.isCompleted).length ?? 0;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: colors.bg },
      ]}
    >
      <Header
        totalCount={todos?.length ?? 0}
        completedCount={completedCount}
      />

      <TodoForm
        onAdd={async (text) => {
          await createTodo({ text });
        }}
      />

      {todos === undefined ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text
            style={[
              styles.loadingText,
              { color: colors.textMuted },
            ]}
          >
            Синхронізація з Convex...
          </Text>
        </View>
      ) : (
        <TodoList
          todos={todos}
          onToggle={async (id) => {
            await toggleTodo({
              id: id as any,
            });
          }}
          onDelete={async (id) => {
            await deleteTodo({
              id: id as any,
            });
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
});