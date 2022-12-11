import React, { } from "react";

const TaskAction = ({ description, doneTask, removeTask, id, done }) => {

  return (
    <div className="extendedView">
      <span>{description}</span>
      <div className="options">
        <button onClick={e => doneTask(id)}>{done ? 'Done' : 'Undone'}</button>
        <button>Edit</button>
        <button onClick={e => removeTask(id)}>Remove</button>
      </div>
    </div>
  )
};

export default TaskAction;