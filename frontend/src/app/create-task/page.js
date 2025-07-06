"use client";

import { useState, useEffect } from "react";

const TaskForm = ({ initialTask = {}, onCancel }) => {
  const [task, setTask] = useState({
    title: initialTask.title || "",
    description: initialTask.description || "",
    dueDate: initialTask.dueDate || "",
    priority: initialTask.priority || "medium",
    category: initialTask.category || "",
    status: initialTask.status || "pending",
  });

  const [aiDescriptionSuggestions, setAiDescriptionSuggestions] = useState([]);
  const [aiDeadlineRecommendations, setAiDeadlineRecommendations] = useState([]);

  useEffect(() => {
    const fetchAiSuggestions = setTimeout(() => {
      if (task.title.length > 5) {
        setAiDescriptionSuggestions([
          "Break down into smaller sub-tasks.",
          "Consider necessary resources (people, tools).",
          "What are the dependencies for this task?",
        ]);
        setAiDeadlineRecommendations(["3 days from now", "End of next week"]);
      } else {
        setAiDescriptionSuggestions([]);
        setAiDeadlineRecommendations([]);
      }
    }, 500);

    return () => clearTimeout(fetchAiSuggestions);
  }, [task.title, task.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {
    console.error("Submit failed:", error);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto my-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Task
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          rows="4"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {aiDescriptionSuggestions.length > 0 && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            <p className="font-semibold mb-1">AI Description Suggestions:</p>
            <ul className="list-disc list-inside">
              {aiDescriptionSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {aiDeadlineRecommendations.length > 0 && (
          <div className="mt-2 text-sm text-green-700">
            <span className="font-semibold">AI Recommended:</span>{" "}
            {aiDeadlineRecommendations.join(", ")}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={task.category}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Task
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
