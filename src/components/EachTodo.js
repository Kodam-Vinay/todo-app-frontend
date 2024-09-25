import { useState } from "react";
import { Oval } from "react-loader-spinner";

const EachTodo = ({
  id,
  title,
  description,
  status,
  onUpdate,
  onDelete,
  isLoading,
  isEditing,
  setIsEditing,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);

  const handleUpdate = () => {
    onUpdate(id, editedTitle, editedDescription, editedStatus);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="todo-item">
      {isEditing === id ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Update title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Update description"
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="oval-loading"
              />
            ) : (
              "Save"
            )}
          </button>
          <button onClick={() => setIsEditing("")} disabled={isLoading}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="view-mode">
          <h3 className="todo-title">{title}</h3>
          <p className="todo-description">{description}</p>
          <span
            className={`todo-status ${
              status === "completed" ? "completed" : "pending"
            }`}
          >
            {status === "completed" ? "Completed" : "Pending"}
          </span>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(id)}>Edit</button>
            <button onClick={handleDelete}>
              {" "}
              {isLoading ? (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EachTodo;
