import React, { useContext } from "react";
import { UserContext } from "../App";
import Answer from "./Answer";

const Answers = () => {
  const { state,dispatch } = useContext(UserContext);
  console.log(state)
  const { currentAnswer, currentQuestion, questions } = state;
  const question = questions[currentQuestion];
    return(
      <div>
      <Answer
        letter="A"
        answer={question.answer_a}
        dispatch={dispatch}
        selected={currentAnswer === "A"}
      />
      <Answer
        letter="B"
        answer={question.answer_b}
        dispatch={dispatch}
        selected={currentAnswer === "B"}
      />
      <Answer
        letter="C"
        answer={question.answer_c}
        dispatch={dispatch}
        selected={currentAnswer === "C"}
      />
      <Answer
        letter="D"
        answer={question.answer_d}
        dispatch={dispatch}
        selected={currentAnswer === "D"}
      />
    </div>
    )
};

export default Answers;
