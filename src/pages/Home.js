import { useContext, useState } from "react";
import "../App.css";
import useGetData from "../hooks/useGetData";
import TodoContext from "../context/TodoContext";
import ResponseContext from "../context/ResponseContext";
import { Oval } from "react-loader-spinner";
import TodoList from "./TodoList";

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const [data, setData] = useState([]);
  const { toggleError, storeError, toggleLoading, isLoading, isSuccess } =
    useContext(ResponseContext);
  const { setShowAddTodoPopup } = useContext(TodoContext);

  useGetData({
    path: "todos/all",
    setError: storeError,
    setIsError: toggleError,
    setLoading: toggleLoading,
    setData,
    token,
    isSuccess,
  });

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <button
        className="button add-todo-button"
        onClick={() => setShowAddTodoPopup(true)}
      >
        Add Todo +
      </button>
      <div className="todo-container">
        {isLoading ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="oval-loading"
          />
        ) : !isLoading && data?.length === 0 ? (
          <div>No todos available</div>
        ) : (
          <TodoList todos={data} token={token} />
        )}
      </div>
    </div>
  );
};

export default Home;
