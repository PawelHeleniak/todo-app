import React from 'react';
import "./ActionMenu.css"

const ActionMenu = (props) => {
  console.log(props);
    return (
      <span className="moreAction">
        <a className="material-icons" onClick={props.removeTask.bind(this, props.tasks, props.id)}>clear</a>
        <a className="material-icons" onClick={props.doneTask.bind(this, props.tasks, props.id)}>done</a>
       </span>
    );
}
export default ActionMenu;