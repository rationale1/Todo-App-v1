import React, { useEffect } from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../../Redux/actions/todoActions";

const ListTodos = ({ setInputData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const { todos } = useSelector(state => state.todo);

  return (
    <div
      className="mt-4 card shadow bg-white rounded"
      style={{ width: "30rem" }}>
      <div className="card-header bg-dark text-center">
        <h5 style={{ color: "#fff" }}> Todos</h5>
      </div>

      <ul className="list-group list-group-flush">
        {todos.length ? (
          todos.map(todo => (
            <Todo key={todo?.id} {...todo} setInputData={setInputData} />
          ))
        ) : (
          <div className="card-body p-4 text-center">
            <h3>Todos Empty</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListTodos;
