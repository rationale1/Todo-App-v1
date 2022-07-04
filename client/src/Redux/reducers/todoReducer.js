const initState = {
  todos: [],
  error: null,
  loading: null,
};

const todoReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "TODO_FETCH_REQUEST":
    case "TODO_CREATE_REQUEST":
    case "TODO_DELETE_REQUEST":
    case "TODO_UPDATE_REQUEST":
    case "TOGGLE_COMPLETE_REQUEST":
      return { ...state, loading: true };

    case "TODO_FETCH_SUCCESS":
      return { ...state, loading: false, todos: payload };

    case "TODO_CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: [payload, ...state.todos],
      };

    case "TODO_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo._id !== payload),
      };

    case "TODO_UPDATE_SUCCESS":
    case "TOGGLE_COMPLETE_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo._id === payload._id ? payload : todo,
        ),
      };

    case "TODO_FETCH_FAIL":
    case "TODO_CREATE_FAIL":
    case "TODO_DELETE_FAIL":
    case "TODO_UPDATE_FAIL":
    case "TOGGLE_COMPLETE_FAIL":
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export default todoReducer;
