import { useContext, useState } from "react";
import { deleteRequest, updateRequest } from "../api/apiCalls";
import EachTodo from "../components/EachTodo";
import ResponseContext from "../context/ResponseContext";

const TodoList = ({ todos, token }) => {
  const {
    toggleError,
    storeError,
    toggleLoading,
    isLoading,
    storeSuccess,
    toggleSuccess,
  } = useContext(ResponseContext);
  const [isEditingId, setIsEditingId] = useState("");
  const handleUpdate = async (id, title, description, status) => {
    if (!id) {
      toggleError(true);
      storeError("Invalid id");
    }
    if (!title || !description || !status) {
      toggleError(true);
      storeError("Invalid input");
    }
    const todoData = {
      id,
      title,
      description,
      status,
    };
    toggleLoading(true);
    const res = await updateRequest({
      path: "todos/update",
      reqBody: todoData,
      setError: storeError,
      setIsError: toggleError,
      token,
    });
    if (res?.status) {
      toggleError(false);
      toggleSuccess(true);
      storeSuccess("Todo updated successfully");
      setIsEditingId("");
    } else {
      toggleError(true);
      toggleSuccess(false);
      storeError(res?.message);
    }
    setIsEditingId("");
    toggleLoading(false);
  };

  const handleDelete = async (id) => {
    if (!id) {
      toggleError(true);
      storeError("Invalid id");
    }
    toggleLoading(true);
    const res = await deleteRequest({
      path: "todos/delete",
      reqBody: {
        id,
      },
      setError: storeError,
      setIsError: toggleError,
      token,
    });
    if (res?.status) {
      toggleSuccess(true);
      storeSuccess(res?.message);
    } else {
      toggleError(true);
      toggleSuccess(false);
      storeError(res?.message);
    }
    toggleLoading(false);
  };

  return (
    <div className="todolist-container">
      {todos.map((todo) => (
        <EachTodo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          status={todo.status}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoading={isLoading}
          setIsEditing={setIsEditingId}
          isEditing={isEditingId}
        />
      ))}
    </div>
  );
};

export default TodoList;
