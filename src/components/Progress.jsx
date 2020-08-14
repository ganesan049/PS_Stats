import React from "react";

const Progress = (props) => {
  if (props.total > 1) {
    return (
      <div>
        Question {props.current} of {props.total}
      </div>
    );
  } else return <div>Question</div>;
};

export default Progress;
