import axios from "axios";
import { toast } from "react-toastify";

const url = `http://localhost:5000/api/todos`;

const errorMessage = error => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// Set token in the Headers
const config = getState => {
  const {
    auth: { userInfo },
  } = getState();

  return {
    headers: {
      "Content-Type": "Application/json" || "multipart/form-data",
      authorization: `Bearer ${userInfo.token}`,
    },
  };
};

export const fetchTodos = () => async (dispatch, getState) => {
  dispatch({ type: "TODO_FETCH_REQUEST" });

  try {
    const { data } = await axios.get(url, config(getState));

    dispatch({ type: "TODO_FETCH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TODO_FETCH_FAIL", payload: errorMessage(error) });
  }
};

export const createTodo = todo => async (dispatch, getState) => {
  dispatch({ type: "TODO_CREATE_REQUEST" });

  try {
    const { data } = await axios.post(url, todo, config(getState));

    dispatch({ type: "TODO_CREATE_SUCCESS", payload: data });

    toast.success("Todo Added Successfully");
  } catch (error) {
    dispatch({ type: "TODO_CREATE_FAIL", payload: errorMessage(error) });
    toast.error(error.response?.data.message);
  }
};

export const removeTodo = id => async (dispatch, getState) => {
  dispatch({ type: "TODO_DELETE_REQUEST" });
  try {
    await axios.delete(`${url}/${id}`, config(getState));

    dispatch({ type: "TODO_DELETE_SUCCESS", payload: id });

    toast.success("Todo Deleted Successfully");
  } catch (error) {
    dispatch({ type: "TODO_DELETE_FAIL", payload: errorMessage(error) });
    toast.error(error.response?.data.message);
  }
};

export const updateTodo = (id, updatedTodo) => async (dispatch, getState) => {
  dispatch({ type: "TODO_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `${url}/${id}`,
      updatedTodo,
      config(getState),
    );

    dispatch({ type: "TODO_UPDATE_SUCCESS", payload: data, id });

    toast.success("Todo Updated Successfully");
  } catch (error) {
    dispatch({ type: "TODO_UPDATE_FAIL", payload: errorMessage(error) });

    toast.error(error.response?.data.message);
  }
};

export const toggleComplete = id => async (dispatch, getState) => {
  dispatch({ type: "TOGGLE_COMPLETE_REQUEST" });

  try {
    const { data } = await axios.patch(`${url}/${id}`, {}, config(getState));

    dispatch({ type: "TOGGLE_COMPLETE_SUCCESS", payload: data });

    toast.success("Toggle isComplete");
  } catch (error) {
    dispatch({ type: "TOGGLE_COMPLETE_FAIL", payload: errorMessage(error) });

    toast.error(error.response?.data.message);
  }
};
