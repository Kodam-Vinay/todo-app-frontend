import React, { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import ResponseContext from "../context/ResponseContext";
import { Oval } from "react-loader-spinner";
import { postRequest } from "../api/apiCalls";
import { POST_REQUEST_TYPES } from "../utils/constants";

const AddTodoPopup = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setShowAddTodoPopup } = useContext(TodoContext);
  const {
    isLoading,
    toggleLoading,
    storeError,
    toggleError,
    storeSuccess,
    toggleSuccess,
  } = useContext(ResponseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toggleError(true);
      storeError("Please fill all fields");
    }
    toggleLoading(true);
    const res = await postRequest({
      path: "todos/create",
      reqBody: {
        title,
        description,
      },
      setError: storeError,
      setIsError: toggleError,
      token,
      reqType: POST_REQUEST_TYPES.create,
    });
    if (res?.status) {
      toggleSuccess(true);
      toggleError(false);
      storeSuccess(res?.message);
      setShowAddTodoPopup(false);
    } else {
      toggleError(true);
      toggleSuccess(false);
      storeError(res?.message);
    }
    toggleLoading(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Add New Todo</h3>
          <button
            type="button close-button"
            onClick={() => setShowAddTodoPopup(false)}
          >
            ❌
          </button>
        </div>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="Enter your todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Enter your Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="popup-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                />
              ) : (
                "Add Todo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoPopup;
