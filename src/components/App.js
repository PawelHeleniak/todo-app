import React from "react";
import "./App.css";
import TaskList from "./TaskList";
import TaskHeader from "./TaskHeader";

const App = () => {
  const [tasks, getTasks] = React.useState([]);
  const [sort, getSort] = React.useState("all");

  const removeTask = (id) => {
    let todoList = [...tasks];
    const findTask = todoList.findIndex((task) => task.id === id);
    todoList.splice(findTask, 1);

    getTasks(todoList);
  };

  const handleDoneTask = (tasks, id) => {
    let todoList = [...tasks];
    todoList.map((task) => {
      if (task.id === id) {
        task.done = false;
      }
    });
    getTasks(todoList);
  };

  const addTask = (tasks, text, date) => {
    let todoList = [...tasks];
    let findIndex = todoList.map((task) => task.id);
    let maxIndex = Math.max.apply(null, findIndex);

    if (maxIndex >= 0) {
      maxIndex = maxIndex + 1;
    } else {
      maxIndex = 0;
    }

    todoList.push({
      id: maxIndex,
      text: text,
      date: date,
      done: true,
    });

    getTasks(todoList);
  };

  const handleSortTask = (sort) => {
    getSort(sort);
  };

  const handleTaskList = () => {
    let todoList = [...tasks];
    let filtered;
    let taskSort = sort;

    if (!taskSort) {
      sort = "all";
    }

    switch (taskSort) {
      case "Done":
        filtered = todoList.filter((task) => !task.done);
        break;
      case "Progress":
        filtered = todoList.filter((task) => task.done);
        break;
      default:
        filtered = todoList;
        break;
    }
    return filtered;
  };

  return (
    <div className="container">
      <div className="wrapperTasklist">
        <TaskHeader tasks={tasks} add={addTask} sort={handleSortTask} />
        <TaskList
          tasks={tasks}
          remove={removeTask}
          done={handleDoneTask}
          sort={handleTaskList()}
        />
      </div>
    </div>
  );
};

export default App;