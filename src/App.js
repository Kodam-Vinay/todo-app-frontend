import { useEffect, useState } from "react";
import TodoContext from "./context/TodoContext";
import AppRoutes from "./Routes/AppRoutes";
import AddTodoPopup from "./components/AddTodoPopup";
import ResponseContext from "./context/ResponseContext";
import { Toaster } from "react-hot-toast";
import { storeToastError, storeToastSuccess } from "./utils/constants";

function App() {
  const [todos, setTodos] = useState([]);
  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isError) {
      storeToastError({ errorMessage: error });
    }
    if (isSuccess) {
      storeToastSuccess({ successMessage: successMessage });
    }
  }, [isError, isSuccess, error, successMessage]);

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsError(false);
        setIsSuccess(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess]);

  return (
    <ResponseContext.Provider
      value={{
        error,
        isError,
        isLoading,
        isSuccess,
        successMessage,
        storeSuccess: setSuccessMessage,
        storeError: setError,
        toggleError: setIsError,
        toggleLoading: setIsLoading,
        toggleSuccess: setIsSuccess,
      }}
    >
      <TodoContext.Provider
        value={{
          todos,
          setTodos,
          showAddTodoPopup,
          setShowAddTodoPopup,
        }}
      >
        <div className="app-container">
          <Toaster />
          {showAddTodoPopup && <AddTodoPopup />}
          <AppRoutes />
        </div>
      </TodoContext.Provider>
    </ResponseContext.Provider>
  );
}

export default App;
