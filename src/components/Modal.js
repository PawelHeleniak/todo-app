import React, { useState } from 'react';
import "./Modal.css";

const Modal = props => {
  let minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) *1 + 100 + minDate.slice(4, 10)

  const [textValue, setText] = useState("")
  const [dateValue, setDate] = useState(minDate)
  const [dateCheckValue, setCheck] = useState("")
  const [idTask, setId] = useState("")

  const [errors, setError] = React.useState(false);

  useState(e=>{
    setDate(props.date)
    setText(props.text)
    setCheck(props.dateCheck)
    setId(props.id)
  })

  const handleClick = (option, id) => {
    let validation = handleValidation();
    if (!validation.text) {
      if (!validation.check) {
        props.editBtn(option, idTask,textValue,dateValue,dateCheckValue);
      } else {
        props.editBtn(option, idTask);
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

    if (textValue.trim() === "") {
      text = true;
    }
    if (!dateValue) {
      check = true;
    }
    return { text, check };
  };

  return (
    <>
    <div className="wrapperModal">
      <div className='editModal'>
        <h2>Edit task</h2>
        <div className='inputWrapper'>
          <input 
            type="text" 
            value={textValue} 
            onChange={e => setText(e.target.value)}
            className={errors ? "validateError":null}
          />
        </div>
        <div className="inputWrapper">
          <input 
            type="date" 
            value={dateValue} 
            disabled={!dateCheckValue ? true : false}
            onChange={e => setDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
          <input
            type="checkbox"
            checked={dateCheckValue}
            onChange={(e) => setCheck(e.target.checked)}
          />
        </div>
        <div className="statusWrapper">
          <button onClick={handleClick.bind(this, "done")}>Done</button>
          <button onClick={handleClick.bind(this, "remove")}>Remove</button>
        </div>
        <div className='btnWrapper'>
          <button onClick={handleClick.bind(this, "accept")}>Accept</button>
          <button onClick={handleClick.bind(this, "cancel")}>Cancel</button>
        </div>
      </div>
    </div>
    <div className="mobilePopup"></div>
    </>
  );
}
 
export default Modal;