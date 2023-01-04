import React, { useState } from "react";

const Task = ({ openEdit, doneTask, setEdit, removeTask, title, description, date, color, done, id }) => {
  const [open, setOpen] = useState(true);

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= date ? "outdated" : null;

  //Check whether the button has been clicked
  const checkClick = (e) => {
    let buttonsList = document.querySelectorAll('.extendedView .options button')
    let buttons = [...buttonsList];
    let check = buttons.map(button => e.target === button)

    if (!check.includes(true))
      setOpen(!open)
  }

  return (
    <div className={done ? "taskWrapper" : "taskWrapper done"} onClick={checkClick}>
      <div className="textWrapper">
        <div className="primaryView">
          <span>{title}</span>
          <span className={activeDate}>{date}</span>
        </div>
        {open ?
          <div className="extendedView">
            <span>{description}</span>
            <div className="options">
              <button onClick={e => doneTask(id)}>{done ? 'Done' : 'Undone'}</button>
              <button onClick={e => openEdit()}>Edit</button>
              <button onClick={e => removeTask(id)}>Remove</button>
            </div>
          </div>
          : ''}
        <div className="taskColor" style={{ 'backgroundColor': color }}></div>
      </div>
    </div >
  );
};

export default Task;
