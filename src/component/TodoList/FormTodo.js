import React, { useContext, useState, useEffect } from "react";
import queryString from "query-string";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import Header from "./Header";
import Footer from "./Filter";
import TodoList from "./TodoList";
import "./TodoList.css";

const FormTodo = () => {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const url = "https://todo-mvc-api-typeorm.herokuapp.com/api/todos";
  axios.defaults.headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${authCtx.token}`,
  };
  const filterByStatus = (todos = [], status = "") => {
    switch (status) {
      case "active":
        return todos.filter((todo) => todo.status === "active");
      case "completed":
        return todos.filter((todo) => todo.status === "completed");
      default:
        return todos;
    }
  };
  const switchComplete = async (id, content, status) => {
    let newStatus = "";
    if (status === "completed") {
      newStatus = "active";
    } else {
      newStatus = "completed";
    }
    const param = {
      status: newStatus,
      content: content,
    };
    try {
      const response = await axios.put(url + "/" + id, param);
      console.log(response.data);
      const newData = [...data];
      newData.map((todo) => {
        if (id === todo.id) {
          todo.status = newStatus;
        }
      });
      setData(newData);
    } catch (error) {
      console.log("Failed to fetch ", error);
    }
  };
  const handleDeleteTodos = async (id) => {
    axios.delete(url + "/" + id).catch((err) => {
      console.log(err);
    });
    setData(data.filter((todo) => todo.id !== id));
  };
  const handleEditTodos = async (editValue, id) => {
    const param = {
      status: "active",
      content: editValue,
    };
    try {
      const response = await axios.put(url + "/" + id, param);
      console.log(response.data);
      const newData = [...data];
      newData.map((todo) => {
        if (id === todo.id) {
          todo.content = editValue;
        }
      });
      setData(newData);
    } catch (error) {
      console.log("Failed to fetch ", error);
    }
  };
  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post(url, todo);
      setData([...data, response.data]);
    } catch (error) {
      console.log("Failed to fetch ", error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [page]);
  const getTodos = async () => {
    try {
      // const params = {_page:1,_limit:5};
      const response = await axios.get(url, {
        params: { page: page, limit: 10 },
        paramsSerializer: (params) => queryString.stringify(params),
      });
      setData([...data, ...response.data.items]);
    } catch (error) {
      console.log("Failed to fetch ", error);
    }
  };
  const newTodosComplete = () => {
    const newData = [...data];
    return newData.filter((todo) => todo.status === "active");
  };
  const setFilterStatus = (newstatus) => {
    setStatus(newstatus);
  };
  const scrollToEnd = () => {
    setPage(page + 1);
  };
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };
  return (
    <section className="section-center">
      <Header
        handleAddTodo={handleAddTodo}
        // filterByContent={filterByContent}
      />
      <Footer
        status={status}
        setFilterStatus={setFilterStatus}
        newTodosComplete={newTodosComplete}
      />
      <TodoList
        data={filterByStatus(data, status)}
        handleEditTodos={handleEditTodos}
        handleDeleteTodos={handleDeleteTodos}
        switchComplete={switchComplete}
      />
    </section>
  );
};

export default FormTodo;
