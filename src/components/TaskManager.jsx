import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Load tasks from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // ✅ Save tasks to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  // ✅ Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Toggle complete status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🔍 Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // 🔄 Clear all tasks
  const clearAll = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
          />
          <Button type="submit">Add</Button>
          <Button variant="secondary" type="button" onClick={clearAll}>
            Clear All
          </Button>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 && (
            <p className="text-gray-500">No tasks found</p>
          )}

          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="flex justify-between items-center p-3"
            >
              <div
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
