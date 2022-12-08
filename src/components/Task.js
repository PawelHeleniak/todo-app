import React from "react";
// import "./Task.css";

const Task = (props) => {

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= props.date && props.done ? "outdated" : null;

  return (
    <div className={props.done ? "taskWrapper" : "taskWrapper done"} onClick={props.editTask.bind(this, props.id)}>
      <span className="textWrapper">
        {props.text}{" "}
        {props.date && (
          <>
            - <a className={activeDate}>{props.date}</a>
          </>
        )}
      </span>
    </div>
  );
};

export default Task;