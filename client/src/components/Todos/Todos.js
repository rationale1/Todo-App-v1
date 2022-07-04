import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

const Todos = () => {
  const [inputData, setInputData] = useState({ name: "" });
  const { error, loading } = useSelector(state => state.todo);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : null}

      <AddTodo inputData={inputData} setInputData={setInputData} />

      <ListTodos setInputData={setInputData} />
    </div>
  );
};

export default Todos;
