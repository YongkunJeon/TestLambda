import { createStore } from "redux";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VAL": {
      return {
        ...state,
        currentMessage: action.payload
      };
    }
    case "SET_TIME": {
      return {
        ...state,
        time: action.payload
      };
    }
    case "SET_CUSTOM": {
      return {
        ...state,
        custom: action.payload
      };
    }
    // Handle other actions here
    default:
      return state;
  }
};

const store = createStore(reducer, {
  currentMessage: { message: "loading", custom: "loading" }
});
export default store;
