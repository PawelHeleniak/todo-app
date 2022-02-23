import React from "react";
import "./App.css";
import TaskList from "./TaskList";
import TaskHeader from "./TaskHeader";
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
        if(task.date !== undefined){
          console.log(task.date);
          getDateModal(task.date);
          getCheckModal(true);
        }else{
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
          if(check){
            task.date = date;
          }else{
            task.date = undefined;
          }
        }
      });
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <div className="wrapperTasklist">
        <TaskHeader 
         tasks={tasks} 
         add={addTask} 
         sort={handleSortTask} 
        />
        <TaskList
          tasks={tasks}
          remove={removeTask}
          done={handleDoneTask}
          sort={handleTaskList()}
          edit={handleOpenModal}
        />
      </div>
      {editModal && (
        <Modal
          editBtn={handleBtnModal}
          edit={handleOpenModal()}
          date={dateModal}
          text={textModal}
          dateCheck={checkDateModal}
          id={idModal}
        />
      )}
    </div>
  );
};

export default App;
