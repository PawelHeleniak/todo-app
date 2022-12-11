import React from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Modal from "./Modal";

const App = () => {
  const [tasks, getTasks] = React.useState([]);
  const [sort, getSort] = React.useState("all");
  const [editModal, getModal] = React.useState(false);

  const removeTask = (id) => {
    let todoList = [...tasks];
    const findTask = todoList.findIndex((task) => task.id === id);
    todoList.splice(findTask, 1);

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

  const addTask = (tasks, title, description, date, color) => {

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

  const handleSortTask = (sort) => {
    getSort(sort);
  };

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

  return (
    <section>
      <div className="container">
        <div className="wrapperTodo">
          {/* <div className="actionAddTask"> */}
          <TaskForm
            tasks={tasks}
            add={addTask}
            sort={handleSortTask}
          />
          {/* </div> */}
          <div className="taskListWrapper">
            <TaskList
              tasks={tasks}
              sort={handleTaskList()}
              doneTask={handleDoneTask}
              removeTask={removeTask}
            />
          </div>
        </div>
        {/* {editModal && (
          <Modal
            editBtn={handleBtnModal}
            edit={handleOpenModal()}
            date={dateModal}
            text={textModal}
            dateCheck={checkDateModal}
            id={idModal}
            tasks={tasks}
          />
        )} */}
      </div>
    </section>
  );
};

export default App;
