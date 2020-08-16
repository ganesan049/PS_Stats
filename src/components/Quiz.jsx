import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { appendSpreadsheet } from "./GoogleSheetData";
import Answers from "./Answers";
import Question from "./Question";
import UploadQuiz from "./UploadQuiz";
import { Button, Spinner } from "react-bootstrap";
import { UserContext } from "../App";
import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
} from "../reducers/types";
import Progress from "./Progress";
export const QuizContext = createContext();
const QuizCreate = (props) => {
  const userState = useContext(UserContext);
  let challenge = props.questions[0].challenge;
  if (userState.state.questions.length === 0) {
    userState.dispatch({ type: "SET_QUESTION", value: props.questions });
    userState.dispatch({ type: "SET_CHALLENGE", value: challenge });
  }
  const {
    questions,
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error,
  } = userState.state;
  if (questions.length > 0) {
    console.log(userState.state);
    const question = questions[currentQuestion];
    const challengeDisplay = () => {
      return <div>challenge {questions[0].challenge} </div>;
    };
    const renderError = () => {
      if (!error) {
        return;
      }
      return <div className="error">{error}</div>;
    };
    const next = (e) => {
      const answer = { questionId: question.id, answer: currentAnswer };
      if (!currentAnswer) {
        userState.dispatch({
          type: SET_ERROR,
          value: "Please Select a option",
        });
        return;
      }
      answers.push(answer);
      userState.dispatch({ type: SET_ANSWERS, value: answers });
      userState.dispatch({ type: SET_CURRENT_ANSWER, value: "" });
      if (currentQuestion + 1 < questions.length) {
        userState.dispatch({
          type: SET_CURRENT_QUESTION,
          value: currentQuestion + 1,
        });
        return;
      }
      userState.dispatch({ type: SET_SHOW_RESULTS, value: true });
    };
    if (showResults) {
      return (
        <div className="container results">
          <UploadQuiz />
        </div>
      );
    } else {
      return (
        <div className="container">
          {challengeDisplay()}
          <Progress total={questions.length} current={currentQuestion + 1} />
          <Question />
          {renderError()}
          <Answers />
          <button className="btn btn-primary" onClick={(e) => next(e)}>
            Confirm and Continue
          </button>
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

const Quiz = () => {
  const [data, setdata] = useState(null);
  const [check, setcheck] = useState(null);
  const makeCheck = (array) => {
    let makeObj = (data) => {
      return {
        player_name: data[0],
        challenge: data[3],
      };
    };
    let final = [];
    array.forEach((data) => {
      final.push(makeObj(data));
    });
    return final;
  };
  let makeDataFull = (array) => {
    let makeObj = (data, id) => {
      return {
        id,
        question: data[0],
        answer_a: data[1],
        answer_b: data[2],
        answer_c: data[3],
        answer_d: data[4],
        correct_answer: data[5],
        challenge: data[6],
      };
    };
    let final = [];
    array.forEach((data, i) => {
      final.push(makeObj(data, i + 1));
    });
    return final;
  };
  let checkData = () => {
    let challenge = data[0].challenge;
    let temp = 0;
    check.forEach((e) => {
      if (
        e.player_name.toUpperCase() ===
        localStorage.getItem("user").toUpperCase()
      ) {
        if (Number(e.challenge) === Number(challenge)) {
          temp += 1;
        }
      }
    });
    if (temp === 0) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    async function fetchMyAPI() {
      appendSpreadsheet(2).then((value) => {
        setdata(makeDataFull(value));
      });
      appendSpreadsheet(3).then((value) => {
        setcheck(makeCheck(value));
      });
    }
    fetchMyAPI();
  }, []);
  let display = () => {
    if (data && check) {
      if (data.length > 0) {
        let temp = checkData();
        if (temp) {
          return <QuizCreate questions={data} />;
        } else {
          return <div>Already Attempted</div>;
        }
      } else {
        return <div>no questions available now...</div>;
      }
    }
    return (
      <div>
        {" "}
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  };
  return <div>{display()}</div>;
};

export default Quiz;
