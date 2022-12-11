import React, { useEffect, useState } from "react";
import TaskAction from "./TaskAction";

const Task = ({ title, description, date, color, done, id, editTask, doneTask, removeTask }) => {
  const [open, setOpen] = useState(true);

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= date ? "outdated" : null;

  //Check whether the button has been clicked
  const checkClick = (e) => {
    let buttonsList = document.querySelectorAll('.extendedView .options button')
    let buttons = [...buttonsList];
    let check = buttons.map(button => e.target === button)

    if (!check.includes(true)) {
      setOpen(!open)
    }
  }
  return (
    <div className={done ? "taskWrapper" : "taskWrapper done"} onClick={checkClick}>
      {/* <div className={done ? "taskWrapper" : "taskWrapper done"} onClick={e => setOpen(!open)}> */}
      <div className="textWrapper">
        <div className="primaryView">
          <span>{title}</span>
          <span className={activeDate}>{date}</span>
        </div>
        {open ? <TaskAction description={description} doneTask={doneTask} id={id} done={done} removeTask={removeTask} /> : ''}
        <div className="taskColor" style={{ 'backgroundColor': color }}></div>
      </div>
    </div >
  );
};

export default Task;