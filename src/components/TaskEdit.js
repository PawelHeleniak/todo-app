import React, { useState } from "react";

const TaskEdit = ({ openEdit, oldTitle, oldDescription, oldDate, oldColor, editTask, id }) => {
  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [dateTask, setDate] = useState(oldDate);
  const [dateCheck, setCheck] = useState(true);
  const [colorTask, setColorTask] = useState(oldColor);

  const test = () => {
    editTask(id, title, description, dateTask, colorTask)
    openEdit()
  }

  return (
    <div className="taskWrapper edit">
      <div className="textWrapper">
        <div className="primaryView">
          <span><input type="text" onChange={e => setTitle(e.target.value)} value={title} /></span>
          <span>
            <input type="color" onChange={(e) => setColorTask(e.target.value)} value={colorTask} />
            <input type="checkbox" onChange={(e) => setCheck(e.target.value)} value={dateCheck} />
            <input type="date" onChange={(e) => setDate(e.target.value)} value={dateTask} />
          </span>
        </div>
        <div className="extendedView">
          <span><input type="text" onChange={e => setDescription(e.target.value)} value={description} /></span>
          <div className="options">
            <button onClick={e => test()}>Accept</button>
            <button onClick={e => openEdit()}>Cancel</button>
          </div>
        </div>
        <div className="taskColor" style={{ 'backgroundColor': oldColor }}></div>
      </div>
    </div >
  );
};

export default TaskEdit;