import React, { useState } from 'react';
import ActionMenu from './ActionMenu';

const Task = (props) => {
  const [dropdown, setOpen] = useState(false)
  const toggleDropdown = () => setOpen(!dropdown);

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= props.date && props.done?"outdated":null;
    return (
      <div className={props.done? "taskWrapper": "taskWrapper done"}>
        <span className="textWrapper">
          {props.text} {props.date && <>- <a className={activeDate}>{props.date}</a></>}
        </span>
        <div className="iconWrapper">
          <a className="material-icons" onClick={toggleDropdown}>more_horiz</a>
          {dropdown && <ActionMenu
              id={props.id}
              doneTask={props.doneTask}
              removeTask={props.removeTask}
          />}
        </div>
      </div>
    );
}
 
export default Task;