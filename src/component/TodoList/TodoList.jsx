import React from "react";
import Todo from "./Todo";

const TodoList = (props) => {
  const { data } = props;
  return (
    <div className="container-2">
      <div className="grocery-container">
        {data.map((todo, index) => (
          <Todo todo={todo} index={index} key={index} {...props} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
