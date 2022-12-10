import React from 'react';
import Task from './Task';
// import './TaskList.css'

const TaskList = (props) => {
  const task = props.sort.map(task =>
    <Task
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      date={task.date}
      color={task.color}
      done={task.done}
      removeTask={props.remove}
      doneTask={props.done}
      tasks={props.tasks}
      editTask={props.edit}
    />)
  console.log(task.length === 0);

  return (
    <>
      <div className={task.length === 0 ? "taskList" : "taskList active"}>
        {task}
        <div className="taskCount">
          {!props.sort.length ? false : <span>Number of tasks: {props.sort.length}</span>}
        </div>
      </div>
    </>
  );
}

export default TaskList;