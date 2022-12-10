import React from "react";
// import "./TaskHeader.css";

const TaskForm = (props) => {
  let minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 100 + minDate.slice(4, 10)

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dateTask, setDate] = React.useState(minDate);
  const [dateCheck, setCheck] = React.useState(true);
  const [colorTask, setColorTask] = React.useState("#00e0d1");

  const [error, setError] = React.useState('');

  const maxCountTitle = 32;

  //add state to function in App component 
  const handleClick = () => {
    let validation = handleValidation();
    setError(validation)

    if (!validation) {
      props.add(props.tasks, title, description, dateTask, colorTask);
    } else if (validation === 'dateCheck') {
      props.add(props.tasks, title, description, '', colorTask);

    }
  };

  const handleValidation = () => {
    if (title.trim() === "" || title.length > maxCountTitle) {
      return "title"
    }
    if (description.trim() === "") {
      return "description"
    }
    if (!dateCheck) {
      return "dateCheck"
    }

    return null;
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
            maxLength={maxCountTitle}
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
            value={dateTask}
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
            value={colorTask}
            onChange={(e) => setColorTask(e.target.value)}
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
    </div>
  );
};

export default TaskForm;