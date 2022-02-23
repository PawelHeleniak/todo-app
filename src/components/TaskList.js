import React from 'react';
import Task from './Task';
import './TaskList.css'

const TaskList = (props) => {
  const task = props.sort.map(task=> 
  <Task
    key={task.id}
    id={task.id}
    text={task.text}
    date={task.date}
    done={task.done}
    removeTask={props.remove}
    doneTask={props.done}
    tasks={props.tasks}
    editTask={props.edit}
  />)
  return (
    <>
      <div className="taskList">
        {task}
      </div>
      <div>
        <span>Number of tasks: {props.sort.length}</span>
      </div>
    </>
  );
}
 
export default TaskList;