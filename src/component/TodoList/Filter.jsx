import React, { memo } from "react";
const Footer = memo((props) => {
  const { newTodosComplete, status, setFilterStatus } = props;
  return (
    <footer>
      <div className="container-2">
        <div className="row">
          <p className="numtodo">
            <strong>{newTodosComplete().length} </strong>
            <span>{newTodosComplete().length > 1 ? "todos" : "todo"}</span>
            <span> left </span>
          </p>
          <ul className="filter-container">
            <li>
              <button
                onClick={() => setFilterStatus("all")}
                className={
                  status === "all" ? "filter-btn selected " : "filter-btn"
                }
              >
                all
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilterStatus("active")}
                className={
                  status === "active" ? "filter-btn selected " : "filter-btn"
                }
              >
                active
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilterStatus("completed")}
                className={
                  status === "completed" ? "filter-btn selected" : "filter-btn"
                }
              >
                completed
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
