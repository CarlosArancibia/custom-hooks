import { useEffect, useReducer } from "react";
import { todoReducer } from "../src/08-use-reducer/todo-reducer";

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: "Play the guitar",
  //   done: false,
  // },
];

const init = () => {
  return JSON.parse(localStorage.getItem("todos") ?? []);
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    console.log({ todo });

    const action = {
      type: "[TODO] add todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (todoId) => {
    dispatch({
      type: "[TODO] delete todo",
      payload: todoId,
    });
  };

  const handleToggleTodo = (todoId) => {
    dispatch({
      type: "[TODO] toggle todo",
      payload: todoId,
    });
  };

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingsTodo: todos.filter((todo) => todo.done === false).length,
  };
};
