import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_USER,
  SET_SHOW_RESULTS,
  CLEAR_USER,
} from "./types.js";

function quizReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: action.value,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.value,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        showResults: action.value,
      };
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.value,
      };
    case "SET_QUESTION":
      return {
        ...state,
        questions: action.value,
      };
    case "SET_CHALLENGE":
      return {
        ...state,
        challenge: action.value,
      };
    case SET_USER:
      return { ...state, user: action.value };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
        questions: [],
        currentQuestion: 0,
        currentAnswer: "",
        answers: [],
        error: "",
        showResults: false,
        challenge: 0,
      };
    default:
      return state;
  }
}

export default quizReducer;
