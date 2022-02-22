import React from "react";
import "./TaskHeader.css";

const TaskHeader = (props) => {
  let minDate = new Date().toISOString().slice(0, 10);

  const [textTask, setText] = React.useState("");
  const [dateTask, setDate] = React.useState(minDate);
  const [dateCheck, setCheck] = React.useState(true);

  const [errors, setError] = React.useState(false);

  const handleClick = () => {
    let validation = handleValidation();

    if (!validation.text) {
      if (!validation.check) {
        props.add(props.tasks, textTask, dateTask);
      } else {
        props.add(props.tasks, textTask, null);
      }

      setText("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleValidation = () => {
    let text = false;
    let check = false;

    if (textTask.trim() === "") {
      text = true;
    }
    if (!dateCheck) {
      check = true;
    }
    return { text, check };
  };

  const handleSort = (e) => {
    let sort = e.target.value;
    props.sort(sort);
  };

  return (
    <div className="taskHeader">
      <h2>Task list</h2>
      <div className="inputWrapper">
        <input
          type="text"
          name="addTask"
          placeholder="Add new task"
          className={errors ? "validateError" : null}
          id="newTask"
          value={textTask}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <input
          type="date"
          id="finishDate"
          value={dateTask}
          disabled={!dateCheck ? true : false}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={dateCheck}
          onChange={(e) => setCheck(e.target.checked)}
        />
      </div>
      <div className="option">
        <button onClick={handleClick}>Add task</button>
        <select onChange={handleSort}>
          <option>All</option>
          <option>Done</option>
          <option>Progress</option>
        </select>
      </div>
    </div>
  );
};

export default TaskHeader;