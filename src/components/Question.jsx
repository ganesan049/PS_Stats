import React, { useContext } from "react";
import { UserContext } from "../App";

const Question = () => {
  const { state } = useContext(UserContext);
  const { currentQuestion, questions } = state;
  const question = questions[currentQuestion];
    return <h1>{question.question}</h1>;
};

export default Question;
