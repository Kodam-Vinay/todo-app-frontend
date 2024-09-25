import { createContext } from "react";

const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  showAddTodoPopup: false,
  setShowAddTodoPopup: () => {},
});
export default TodoContext;
