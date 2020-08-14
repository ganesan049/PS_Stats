import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { UserContext } from "../App";
import { addRow } from "./GoogleSheetData";
import { useHistory } from "react-router-dom";

const UploadQuiz = () => {
  const history = useHistory();
  const [submit, setsubmit] = useState(false);
  const userState = useContext(UserContext);
  const {
    questions,
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error,
  } = userState.state;
  let sumAnswer = 0;
  answers.map((answer) => {
    let question;
    questions.forEach((currentQuestion) => {
      console.log(currentQuestion.id, answer.questionId);
      if (currentQuestion.id === answer.questionId) {
        question = currentQuestion;
      }
    });
    if (question.correct_answer.trim().toUpperCase() === answer.answer.trim().toUpperCase()) {
      sumAnswer += 1;
    }
  });
  let obj = [
    userState.state.user.name.toUpperCase(),
    userState.state.user.teamName.toUpperCase(),
    sumAnswer,
    userState.state.challenge,
  ];
  useEffect(() => {
    addRow(3, obj);
    setsubmit(true);
    setTimeout(() => {
      history.push("/");
    }, 1500);
  }, []);
  return (
    <>
      <div>Submission successfull...</div>
    </>
  );
};

export default UploadQuiz;
