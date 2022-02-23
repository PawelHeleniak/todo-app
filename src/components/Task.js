import React, { useEffect, useState, useRef } from "react";
import ActionMenu from "./ActionMenu";
import "./Task.css";
const Task = (props) => {
  const [dropdown, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!dropdown);

  const todayDate = new Date().toISOString().slice(0, 10);
  const activeDate = todayDate >= props.date && props.done ? "outdated" : null;

  useEffect((e) => {
    const closeDropdown = (e) => {
      if (!e.path[0].classList.contains("active")) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  });

  return (
    <div className={props.done ? "taskWrapper" : "taskWrapper done"}>
      <span className="textWrapper">
        {props.text}{" "}
        {props.date && (
          <>
            - <a className={activeDate}>{props.date}</a>
          </>
        )}
      </span>
      <div className="iconWrapper">
        <a
          className={!dropdown ? "material-icons" : "material-icons active"}
          onClick={toggleDropdown}
        >
          more_horiz
        </a>
        {dropdown && (
          <ActionMenu
            id={props.id}
            doneTask={props.doneTask}
            removeTask={props.removeTask}
            tasks={props.tasks}
            editTask={props.editTask}
          />
        )}
      </div>
    </div>
  );
};

export default Task;