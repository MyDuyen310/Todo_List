import React, { useState, memo } from "react";
const Header = memo((props) => {
  const { handleAddTodo } = props;
  const [todo, setTodo] = useState("");
  // const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setTodo({
      [e.target.name]: e.target.value,
    });
    console.log(todo);
  };
  const addTodo = (e) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    handleAddTodo(todo);
    setTodo("");
  };
  return (
    <div className="grocery-header">
      <form className="grocery-form">
        <div className="grocery-form-inner">
          <div className="grocery-form-header text-center">
            <h3>todo list</h3>
            {/* <div className="search">
              <input
                type="text"
                name="txtsearch"
                placeholder="Search here"
                // onChange={(e) => {
                //   setKeyword(e.target.value.toLowerCase());
                //   console.log(keyword);
                // }}
              />
              <button className="btn-search">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div> */}
          </div>
          <div className="form-control">
            <input
              type="text"
              name="content"
              className="grocery"
              placeholder="e.g : sleep"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-submit" onClick={addTodo}>
              add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export default Header;
