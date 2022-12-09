import React from "react";
// import "./App.css";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Modal from "./Modal";

const App = () => {
  const [tasks, getTasks] = React.useState([]);
  const [sort, getSort] = React.useState("all");
  const [editModal, getModal] = React.useState(false);

  const [textModal, getTextModal] = React.useState("");
  const [dateModal, getDateModal] = React.useState("");
  const [checkDateModal, getCheckModal] = React.useState(false);
  const [idModal, getIdModal] = React.useState("");

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

  const handleOpenModal = (id) => {
    if (editModal !== true) {
      getModal(true);
    }
    let minDate = new Date().toISOString().slice(0, 10);

    let todoList = [...tasks];
    todoList.filter((task) => {
      if (task.id === id) {
        getTextModal(task.text);
        getIdModal(task.id);
        if (task.date !== undefined) {
          getDateModal(task.date);
          getCheckModal(true);
        } else {
          getDateModal(minDate);
          getCheckModal(false);
        }
      }
    });
  };

  const handleBtnModal = (option, id, text, date, check, e) => {
    getModal(false);
    if (option === "accept") {
      let todoList = [...tasks];
      todoList.filter((task) => {
        if (task.id === id) {
          task.text = text;
          if (check) {
            task.date = date;
          } else {
            task.date = undefined;
          }
        }
      });
    } else if (option === "done") {
      handleDoneTask(id)
    } else if (option === "remove") {
      removeTask(id)
    } else {
      return null;
    }
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
              edit={handleOpenModal}
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
