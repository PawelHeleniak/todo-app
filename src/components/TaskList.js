import React, { useState } from "react";
import TaskEdit from "./TaskEdit";
import Task from "./Task";

const TaskList = ({ title, description, date, color, done, id, doneTask, editTask, removeTask }) => {
  const [edit, setEdit] = useState(false);

  return (
    !edit ?
      <Task
        doneTask={doneTask}
        openEdit={e => setEdit(!edit)}
        removeTask={removeTask}
        title={title}
        description={description}
        date={date}
        color={color}
        done={done}
        id={id}
      />
      :

      <TaskEdit
        oldColor={color}
        openEdit={e => setEdit(!edit)}
        editTask={editTask}
        oldTitle={title}
        oldDescription={description}
        oldDate={date}
        id={id}
      />
  );
};

export default TaskList;