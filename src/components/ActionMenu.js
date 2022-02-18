import React from 'react';
import "./ActionMenu.css"

const ActionMenu = (props) => {
    return (
      <span className="moreAction">
        <a className="material-icons" onClick={props.removeTask.bind(this, props.id)}>clear</a>
        <a className="material-icons" onClick={props.doneTask.bind(this, props.id)}>done</a>
       </span>
    );
}
export default ActionMenu;