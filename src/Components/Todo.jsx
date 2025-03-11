import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  const handlChange = (e) => {
    setValue(e.target.value);
  };

  const addItem = () => {
    let obj;
    if (updateItem) {
      obj = {
        title: value,
        id: updateItem.id,
        status: updateItem.status,
      };
      const copyTask = [...tasks];
      const FilterList = copyTask.filter((item) => item.id !== updateItem.id);
      setTasks((prevTask) => [...FilterList, obj]);
      setUpdateItem("");
    } else {
      obj = {
        title: value,
        status: TODO,
        id: Date.now(),
      };
      setTasks((prevTask) => [...prevTask, obj]);
    }
    setValue("");
  };

  console.log("tasks....", tasks);

  const handleDrage = (e, task) => {
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
    setDragTask("");
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
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

  const DeleteTask = (item) => {
    let copyTexts = [...tasks];
    copyTexts = copyTexts.filter((task) => task.id !== item.id);
    setTasks(copyTexts);
  };

  const EditTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div>
      <div className="App">
        <h1>Task Manager</h1>
        <input type="text" value={value} onChange={handlChange} />
        <button onClick={addItem}>{updateItem ? "Update" : "ADD"}</button>
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
                      <div>
                        <button onClick={() => EditTask(task)}>Edit</button>

                        <button onClick={() => DeleteTask(task)}>Delete</button>
                      </div>
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
            <h1 className="doing-col">Doing</h1>
            {tasks.length > 0 &&
              tasks.map(
                (task) =>
                  task.status === DOING && (
                    <div
                      key={task.id}
                      onDrag={(e) => handleDrage(e, task)}
                      draggable
                    >
                      {task.title}
                      <div>
                        <span onClick={() => EditTask(task)} className="btn">
                          Edit
                        </span>
                        <span onClick={() => DeleteTask(task)} className="btn">
                          Delete
                        </span>
                      </div>
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
                    <div
                      key={task.id}
                      onDrag={(e) => handleDrage(e, task)}
                      draggable
                    >
                      {task.title}
                      <div>
                        <span onClick={() => EditTask(task)} className="btn">
                          Edit
                        </span>
                        <span onClick={() => DeleteTask(task)} className="btn">
                          Delete
                        </span>
                      </div>
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
