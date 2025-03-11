import React, { useState } from "react";

const Todo = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

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
      setTasks([...FilterList, obj]);
      setUpdateItem(null);
    } else {
      obj = {
        title: value,
        status: TODO,
        id: Date.now(),
      };
      setTasks([...tasks, obj]);
    }
    setValue("");
  };

  const handleDragStart = (e, task) => {
    setDragTask(task);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) => {
      if (task.id === dragTask.id) {
        task.status = status;
      }
      return task;
    });
    setTasks(updatedTasks);
    setDragTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Task Manager
        </h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={value}
            onChange={handlChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task here"
          />
          <button
            onClick={addItem}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            {updateItem ? "Update" : "Add"}
          </button>
        </div>

        <div className="flex justify-around">
          <div
            className="w-1/3 p-4 bg-gray-200 rounded-md"
            onDrop={(e) => handleDrop(e, TODO)}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Todo</h2>
            {tasks
              .filter((task) => task.status === TODO)
              .map((task) => (
                <div
                  key={task.id}
                  onDragStart={(e) => handleDragStart(e, task)}
                  draggable
                  className="bg-white shadow-sm rounded-md p-3 mb-2 hover:shadow-md transition duration-200"
                >
                  <p className="text-gray-800">{task.title}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => editTask(task)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div
            className="w-1/3 p-4 bg-gray-200 rounded-md"
            onDrop={(e) => handleDrop(e, DOING)}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Doing</h2>
            {tasks
              .filter((task) => task.status === DOING)
              .map((task) => (
                <div
                  key={task.id}
                  onDragStart={(e) => handleDragStart(e, task)}
                  draggable
                  className="bg-white shadow-sm rounded-md p-3 mb-2 hover:shadow-md transition duration-200"
                >
                  <p className="text-gray-800">{task.title}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => editTask(task)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div
            className="w-1/3 p-4 bg-gray-200 rounded-md"
            onDrop={(e) => handleDrop(e, DONE)}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Done</h2>
            {tasks
              .filter((task) => task.status === DONE)
              .map((task) => (
                <div
                  key={task.id}
                  onDragStart={(e) => handleDragStart(e, task)}
                  draggable
                  className="bg-white shadow-sm rounded-md p-3 mb-2 hover:shadow-md transition duration-200"
                >
                  <p className="text-gray-800">{task.title}</p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => editTask(task)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
