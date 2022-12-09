import React from "react";
// import "./Task.css";

const Task = ({ title, description, date, color, done, id, editTask }) => {

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= date && done ? "outdated" : null;

  return (
    <div className={done ? "taskWrapper" : "taskWrapper done"} onClick={editTask.bind(this, id)}>
      <div className="textWrapper">
        <div className="primaryView">
          <span>{title}</span>
          {/* {date && (
          <> */}
          <span className={activeDate}>{date}</span>

          {/* </>
        )} */}
        </div>
        <div className="extendedView">
          <span>{description}</span>
        </div>
        <div className="taskColor" style={{ 'backgroundColor': color }}></div>
      </div>
    </div >
  );
};

export default Task;