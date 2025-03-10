import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState("");

  const handlChange = (e) => {
    setValue(e.target.value);
  };

  const addItem = () => {
    const obj = {
      title: value,
      status: TODO,
      id: Date.now(),
    };
    setTasks((prevTask) => [...prevTask, obj]);
    setValue("");
  };
  console.log("tasks....", tasks);

  const handleDrage = (e, task) => {
    // console.log("task....", task);
    setDragTask(task);
  };

  const handleDND = (status) => {
    let copyText = [...tasks];
    copyText = copyText.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyText);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    console.log("Doing.......", status);
    if (status === TODO) {
      handleDND(TODO);
    } else if (status === DOING) {
      handleDND(DOING);
    } else if (status === DONE) {
      handleDND(DONE);
    }
  };

  const OnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="App">
        <h1>Task Manager</h1>
        <input type="text" value={value} onChange={handlChange} />
        <button onClick={addItem}>ADD</button>
        <div className="board">
          <div
            className="todo"
            onDrop={handleOnDrop}
            onDragOver={OnDragOver}
            data-status={TODO}
          >
            <h1 className="todo-col">Todo</h1>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === TODO && (
                    <div
                      key={task.id}
                      onDrag={(e) => handleDrage(e, task)}
                      draggable
                    >
                      {task.title}
                    </div>
                  )
              )}
          </div>

          <div
            data-status={DOING}
            onDrop={handleOnDrop}
            onDragOver={OnDragOver}
            className="doing"
          >
            <h1 className="doing-col">doing</h1>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === DOING && (
                    <div key={task.id} draggable>
                      {task.title}
                    </div>
                  )
              )}
          </div>
          <div
            className="done"
            onDrop={handleOnDrop}
            onDragOver={OnDragOver}
            data-status={DONE}
          >
            <h1 className="done-col">Done</h1>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === DONE && (
                    <div key={task.id} draggable>
                      {task.title}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
