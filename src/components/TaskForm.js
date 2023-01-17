import React, { useState } from "react"
import Select from 'react-select'

const options = [
  { label: 'All', value: 0 },
  { label: 'Done', value: 1 },
  { label: 'Progress', value: 2 },
]
const TaskForm = (props) => {
  const { add, maxCountTitle, sort, firstSort } = props

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
    let result = add(values)

    if (result || result !== 'dateCheck')
      setError(result);

    if (!result || result === 'dateCheck') {
      setTitle("")
      setDescription("")
      setDate(minDate)
      setCheck(true)
      setColorTask("#00e0d1")
    }
  };

  //React-select style
  const baseStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'var(--primaryColor)',
      border: 0,
      cursor: 'pointer',
      maxWidth: '110px',
    }),
    option: (styles, state) => ({ ...styles, cursor: 'pointer', backgroundColor: state.isSelected ? "var(--primaryDarkColor)" : 'inherit', '&:hover': { backgroundColor: state.isSelected ? 'var(--primaryDarkColor)' : 'var(--primaryHoverColor)' } }),
    placeholder: (styles) => ({ ...styles, color: 'var(--bgColor);', }),

  }

  return (
    <div className="taskForm">
      <div className="taskTitle">
        <h2>Task list</h2>
      </div>
      <div className="inputForm">
        <div className="inputWrapper primary">
          <div className="inputBox">
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
          </div>
          <div className="inputBox">
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

        </div>
        <div className="inputWrapper additions">
          <div className="inputBox">
            <input
              type="date"
              id="finishDate"
              value={date}
              disabled={!dateCheck ? true : false}
              min={minDate}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
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
        <div className="options">
          <button onClick={handleAdd}>Add task</button>
          <Select options={options} onChange={e => sort(e)} className='react-select' styles={baseStyles} placeholder={options[firstSort].label} />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;