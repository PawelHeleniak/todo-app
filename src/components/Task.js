import React from "react";
// import "./Task.css";

const Task = ({ date, done, text, id, editTask }) => {

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= date && done ? "outdated" : null;

  return (
    <div className={done ? "taskWrapper" : "taskWrapper done"} onClick={editTask.bind(this, id)}>
      <span className="textWrapper">
        <span>{text}</span>
        {date && (
          <>
            <span className={activeDate}>{date}</span>
          </>
        )}
      </span>
    </div>
  );
};

export default Task;