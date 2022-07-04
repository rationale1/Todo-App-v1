import React from "react";
import { Send } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { createTodo, updateTodo } from "../../Redux/actions/todoActions";

const AddTodo = ({ inputData, setInputData }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (inputData._id) {
      dispatch(updateTodo(inputData._id, inputData));
    } else {
      dispatch(createTodo(inputData));
    }

    setInputData({ name: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card border-0"
      style={{ width: "30rem", height: "2.5rem" }}>
      <div className="d-flex align-items-center justify-content-between">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Enter Todo"
            name="name"
            className="form-control"
            value={inputData.name}
            onChange={e =>
              setInputData(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>

        <div className="ml-3">
          <button type="submit" className="btn btn-primary">
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;

// 17
