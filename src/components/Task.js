import React from 'react';

const Task = (props) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= props.date && props.done?"outdated":null;
    return (
      <div className={props.done? null: "done"}>
        <span className="textWrapper">
          {props.text} {props.date && <>- <a className={activeDate}>{props.date}</a></>}
        </span>
        <span className="iconWrapper">
          <a className="material-icons" onClick={props.removeTask.bind(this, props.id)}>clear</a>
          <a className="material-icons" onClick={props.doneTask.bind(this, props.id)}>done</a>
        </span>
      </div>
    );
}
 
export default Task;