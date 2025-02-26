import { createStore, createEvent } from "effector";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export const addTask = createEvent<Todo>();
export const removeTask = createEvent<number>();
export const toggleTask = createEvent<number>();

export const $todo = createStore<Todo[]>([])
  .on(addTask, (state, newTodo) => [
    ...state,
    { ...newTodo, isCompleted: false },
  ])
  .on(removeTask, (state, todoId) => state.filter((todo) => todo.id !== todoId))
  .on(toggleTask, (state, todoId) =>
    state.map((todo) =>
      todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
  );
