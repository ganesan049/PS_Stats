import React from "react";
import { SET_CURRENT_ANSWER, SET_ERROR } from "../reducers/types";
import {Button} from 'react-bootstrap'
const Answer = (props) => {
  let classes = ["answer"];
  const handleClick = (e) => {
    e.preventDefault();
    props.dispatch({
      type: SET_CURRENT_ANSWER,
      value: e.target.value,
    });
    props.dispatch({
      type: SET_ERROR,
      value: "",
    });
  };
  if (props.selected) {
    classes.push("selected");
  }
  return (
    <div>
      <button
        value={props.letter}
        className={classes.join(' ')}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {props.answer}
      </button>
    </div>
  );
};

export default Answer;
