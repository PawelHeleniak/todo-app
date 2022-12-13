import React, { useState } from "react";

const TaskEdit = ({ openEdit, oldTitle, oldDescription, oldDate, oldColor, editTask, id, maxCountTitle }) => {
  let minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 100 + minDate.slice(4, 10)

  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [date, setDate] = useState(oldDate);
  const [dateCheck, setCheck] = useState(true);
  const [color, setColorTask] = useState(oldColor);

  const [error, setError] = useState('');


  const handleEdit = () => {
    let values = { id, title, description, date, color, dateCheck }
    let result = editTask(values)

    if (!result || result === 'dateCheck') {
      //close edit form
      openEdit();
    } else {
      //set where is error
      setError(result);
    }
  }

  return (
    <div className="taskWrapper edit">
      <div className="textWrapper">
        <div className="primaryView">
          <span>
            <input type="text"
              maxLength={maxCountTitle}
              className={error === "title" ? "validateError" : null}
              onChange={e => setTitle(e.target.value)}
              value={title} />
          </span>
          <span>
            <input type="color" onChange={(e) => setColorTask(e.target.value)} value={color} />
            <input type="checkbox" onChange={(e) => setCheck(!dateCheck)} checked={dateCheck} />
            <input type="date"
              min={minDate}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              disabled={!dateCheck ? true : false} />
          </span>
        </div>
        <div className="extendedView">
          <span><input type="text" className={error === "description" ? "validateError" : null} onChange={e => setDescription(e.target.value)} value={description} /></span>
          <div className="options">
            <button onClick={e => handleEdit()}>Accept</button>
            <button onClick={e => openEdit()}>Cancel</button>
          </div>
        </div>
        <div className="taskColor" style={{ 'backgroundColor': oldColor }}></div>
      </div>
    </div >
  );
};

export default TaskEdit;