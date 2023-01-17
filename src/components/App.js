import React from "react";
import TaskForm from "./TaskForm";
import TaskList from './TaskList';

const App = () => {
  const [tasks, getTasks] = React.useState([]);
  const [sort, getSort] = React.useState(0);

  const handleAddTask = ({ id, title, description, date, color, dateCheck }) => {
    let todoList = [...tasks];
    let result = validation(id, title, description, date, color, dateCheck)

    let findIndex = todoList.map((task) => task.id);
    let maxIndex = Math.max.apply(null, findIndex);

    if (maxIndex >= 0) {
      maxIndex = maxIndex + 1;
    } else {
      maxIndex = 0;
    }

    if (result === null || result === "dateCheck")
      todoList.push({
        id: maxIndex,
        title: title,
        description: description,
        date: result === "dateCheck" ? '' : date,
        color: color,
        done: true,
      });
    getTasks(todoList);

    if (result)
      return result
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

  const handleEditTask = ({ id, title, description, date, color, dateCheck }) => {
    let todoList = [...tasks];
    let result = validation(id, title, description, date, color, dateCheck)

    if (result === null || result === "dateCheck")
      todoList.map((task) => {
        if (task.id === id) {
          task.title = title
          task.description = description
          task.date = result === "dateCheck" ? '' : date
          task.color = color
          task.dateCheck = dateCheck
        }
      })
    getTasks(todoList);

    if (result)
      return result
  };

  const handleRemoveTask = (id) => {
    let todoList = [...tasks];
    const findTask = todoList.findIndex((task) => task.id === id);
    todoList.splice(findTask, 1);

    getTasks(todoList);
  };

  /// Validation START
  const maxCountTitle = 32;

  //add state to function in App component 
  const validation = (id, title, description, date, color, dateCheck) => {
    if (title === '' || title.length > maxCountTitle) {
      return "title"
    }
    if (description.trim() === "") {
      return "description"
    }
    if (!dateCheck) {
      return "dateCheck"
    }

    return null;
  };
  /// Validation END

  //changes the current state
  const handleSortTask = (sort) => {
    getSort(sort.value);
  };

  //filters the list by current state "sort"
  const handleTaskList = () => {
    let todoList = [...tasks];
    let filtered;

    switch (sort) {
      case 0:
        filtered = todoList;
        break;
      case 1:
        filtered = todoList.filter((task) => !task.done);
        break;
      case 2:
        filtered = todoList.filter((task) => task.done);
        break;
    }
    return filtered;
  };

  const task = handleTaskList().map(task =>
    <TaskList
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
      maxCountTitle={maxCountTitle}
    />)

  return (
    <section>
      <div className="container">
        <div className="wrapperTodo">
          <TaskForm
            add={handleAddTask}
            sort={handleSortTask}
            maxCountTitle={maxCountTitle}
            firstSort={sort}
          />
          <div className="taskListWrapper">
            <div className={task.length === 0 ? "taskList" : "taskList active"}>
              {task}
              <div className="taskCount">
                {!task.length ? false : <span>Number of tasks: {task.length}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
