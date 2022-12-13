import React, { useState } from "react";

const TaskForm = (props) => {
  let minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 100 + minDate.slice(4, 10)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(minDate);
  const [dateCheck, setCheck] = useState(true);
  const [color, setColorTask] = useState("#00e0d1");

  const [error, setError] = useState('');


  //add state to function in App component 
  const handleAdd = () => {
    let values = { error, title, description, date, color, dateCheck }
    let result = props.add(values)

    if (result || result !== 'dateCheck') {
      setError(result);
    }
  };

  const handleSort = (e) => {
    let sort = e.target.value;
    props.sort(sort);
  };

  return (
    <div className="taskForm">
      <div className="taskTitle">
        <h2>Task list</h2>
      </div>
      <div className="inputWrapper">
        <div className="inputBox primary">
          <input
            type="text"
            name="addTask"
            placeholder="Title"
            className={error === "title" ? "validateError" : null}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={props.maxCountTitle}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className={error === "description" ? "validateError" : null}
            id="newTask"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="inputBox additions">
          <input
            type="date"
            id="finishDate"
            value={date}
            disabled={!dateCheck ? true : false}
            min={minDate}
            max={maxDate}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="checkbox"
            checked={dateCheck}
            onChange={(e) => setCheck(e.target.checked)}
          />
          <input
            type="color"
            name="addTask"
            id="color"
            value={color}
            onChange={(e) => setColorTask(e.target.value)}
          />
        </div>
        <div className="option">
          <button onClick={handleAdd}>Add task</button>
          <select onChange={handleSort}>
            <option>All</option>
            <option>Done</option>
            <option>Progress</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;