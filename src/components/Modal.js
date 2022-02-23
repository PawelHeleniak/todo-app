import React, { useState } from 'react';
import "./Modal.css";

const Modal = props => {
  const [textValue, setText] = useState("")
  const [dateValue, setDate] = useState("")
  const [idTask, setId] = useState("")

  useState(e=>{
    setDate(props.date)
    setText(props.text)
    setId(props.id)
  })
  
  return ( 
    <div className="popup">
      <div className='editModal'>
        <h2>Edit task</h2>
        <div className='inputWrapper'>
          <input type="text" value={textValue} onChange={e => setText(e.target.value)}/>
        </div>
        <div className="inputWrapper">
          <input type="date" value={dateValue} onChange={e => setDate(e.target.value)}/>
        </div>
        <div className='btnWrapper'>
          <button onClick={props.editBtn.bind(this, "accept", idTask,textValue,dateValue)}>Accept</button>
          <button onClick={props.editBtn.bind(this, "cancel", idTask)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
 
export default Modal;