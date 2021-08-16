import React, { memo, useState } from "react";

const Todo = memo((props) => {
  const { todo, index, handleEditTodos, handleDeleteTodos, switchComplete } =
    props;
  const [editValue, setEditValue] = useState(todo.content);
  const [onEdit, setOnEdit] = useState(false);
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];
  const handleOnEdit = () => {
    setOnEdit(true);
  };
  const handleSave = (id) => {
    setOnEdit(false);
    if (editValue) {
      handleEditTodos(editValue, id);
    } else {
      setEditValue(todo.name);
    }
  };
  if (onEdit) {
    return (
      <div
        className={
          todo.status === "completed" ? " todo-card active" : "todo-card"
        }
        style={{ borderColor: colors[index % 5].primaryColor }}
      >
        <div
          className="date"
          style={{ backgroundColor: colors[index % 5].secondaryColor }}
        >
          {todo.created_at}
        </div>
        <div>
          <input
            type="text"
            id="editValue"
            value={editValue}
            name="editValue"
            autoFocus
            onChange={(e) => setEditValue(e.target.value.toLowerCase())}
          />
          <div className="btn-container">
            <input
              type="checkbox"
              name="completed"
              id={todo.id}
              onChange={() =>
                switchComplete(todo.id, todo.content, todo.status)
              }
              className="toggle"
              checked={todo.status === "completed" ? true : false}
            />
            <button
              onClick={() => handleSave(todo.id)}
              className="btn save-btn"
              style={{ color: colors[index % 5].primaryColor }}
            >
              <i className="far fa-save"></i>
            </button>
            <button
              onClick={() => handleDeleteTodos(todo.id)}
              className="btn delete-btn"
              style={{ color: colors[index % 5].primaryColor }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          todo.status === "completed" ? " todo-card active" : "todo-card"
        }
        style={{ borderColor: colors[index % 5].primaryColor }}
      >
        <div
          className="date"
          style={{ backgroundColor: colors[index % 5].secondaryColor }}
        >
          {todo.created_at}
        </div>
        <div>
          <label htmlFor={todo.id} className="title">
            {todo.content}
          </label>
          <div className="btn-container">
            <input
              type="checkbox"
              name="completed"
              id={todo.id}
              onChange={() =>
                switchComplete(todo.id, todo.content, todo.status)
              }
              className="toggle"
              checked={todo.status === "completed" ? true : false}
            />
            <button
              onClick={handleOnEdit}
              className="btn edit-btn"
              style={{ color: colors[index % 5].primaryColor }}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              onClick={() => handleDeleteTodos(todo.id)}
              className="btn delete-btn"
              style={{ color: colors[index % 5].primaryColor }}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default Todo;
