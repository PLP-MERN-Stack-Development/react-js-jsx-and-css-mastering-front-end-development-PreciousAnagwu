import React, { useState, useEffect } from "react";

export default function Tasks() {
  // === STATES ===
  const [tasks, setTasks] = useState(() => {
    // ✅ Load tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // === SAVE TO LOCAL STORAGE WHENEVER TASKS CHANGE ===
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // === ADD TASK ===
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // === DELETE TASK ===
  const handleDeleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  // === TOGGLE COMPLETE ===
  const handleToggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  // === FILTERED TASKS ===
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // === SEARCH + FILTER ===
  const displayedTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager ✅</h1>

      {/* ADD TASK */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded ${
              filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Pending
          </button>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TASK LIST */}
      <ul className="space-y-2">
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </ul>
    </div>
  );
}
