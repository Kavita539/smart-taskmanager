"use client";

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onFilterChange,
  onQuickAddTask,
  onEditTask,
  filters,
  categories,
}) => {
  const options = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In progress" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Tasks</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Dropdown
          options={priorityOptions}
          value={filters.priority_score}
          onChange={(val) => onFilterChange("priority_score", val)}
        />

        <Dropdown
          options={options}
          value={filters.status}
          onChange={(val) => onFilterChange("status", val)}
        />

        <Dropdown
          options={categoryOptions}
          value={filters.category}
          onChange={(val) => onFilterChange("category", val)}
        />
      </div>

      {/* Quick Add Task */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Quick add a new task..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              onQuickAddTask(e.target.value.trim());
              e.target.value = "";
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Task Items */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} handleEdit={onEditTask} categories={categories}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No tasks found. Add a new one!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
