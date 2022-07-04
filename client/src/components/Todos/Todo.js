import React from "react";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import { Button, ButtonGroup } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { removeTodo, toggleComplete } from "../../Redux/actions/todoActions";
import moment from "moment";

const Todo = ({ name, author, isComplete, _id, createdAt, setInputData }) => {
  const dispatch = useDispatch();

  const handleUpdateClick = () => {
    setInputData({ name, _id });

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="d-flex flex-column gap-1">
        <h5 style={{ textDecoration: isComplete ? "line-through" : "" }}>
          {name ? name : "default name"}
        </h5>

        <span>created: {author ? author : "Default Name"}</span>

        <small>Added: {moment(createdAt).format("llll")}</small>
      </div>

      <div className="d-flex align-items-center gap-2">
        <ButtonGroup size="small" aria-label="outlined primary button group">
          <Button onClick={() => dispatch(toggleComplete(_id))}>
            <CheckCircle color="red" htmlColor={isComplete && "green"} />
          </Button>

          <Button onClick={handleUpdateClick}>
            <Create color="primary" />
          </Button>

          <Button onClick={() => dispatch(removeTodo(_id))}>
            <Delete color="secondary" />
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
};

export default Todo;
