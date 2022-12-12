import React from "react";
import TaskForm from "./TaskForm";
import Task from './Task';

const App = () => {
  const [tasks, getTasks] = React.useState([]);
  const [sort, getSort] = React.useState("all");

  const handleAddTask = (tasks, title, description, date, color) => {
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
      title: title,
      description: description,
      date: date,
      color: color,
      done: true,
    });

    getTasks(todoList);
  };

  const handleDoneTask = (id) => {
    let todoList = [...tasks];
    todoList.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    getTasks(todoList);
  };

  const handleEditTask = (id, title, description, date, color) => {
    let todoList = [...tasks];
    todoList.map((task) => {
      if (task.id === id) {
        task.title = title
        task.description = description
        task.date = date
        task.color = color
      }
    })
    getTasks(todoList);
  };

  const handleRemoveTask = (id) => {
    let todoList = [...tasks];
    const findTask = todoList.findIndex((task) => task.id === id);
    todoList.splice(findTask, 1);

    getTasks(todoList);
  };

  //changes the current state
  const handleSortTask = (sort) => {
    getSort(sort);
  };

  //filters the list by current state "sort"
  const handleTaskList = () => {
    let todoList = [...tasks];
    let filtered;

    switch (sort) {
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

  const task = handleTaskList().map(task =>
    <Task
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      date={task.date}
      color={task.color}
      done={task.done}
      removeTask={handleRemoveTask}
      doneTask={handleDoneTask}
      editTask={handleEditTask}
      tasks={tasks}
    />)

  return (
    <section>
      <div className="container">
        <div className="wrapperTodo">
          <TaskForm
            tasks={tasks}
            add={handleAddTask}
            sort={handleSortTask}
          />
          <div className="taskListWrapper">
            <div className={task.length === 0 ? "taskList" : "taskList active"}>
              {task}
              <div className="taskCount">
                {!handleTaskList.length ? false : <span>Number of tasks: {handleTaskList().length}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
