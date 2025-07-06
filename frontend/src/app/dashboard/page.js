"use client";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "pending",
    priority_score: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  async function getTasks() {
    setLoading(true);
    try {
      const filteredParams = Object.entries(filters)
        .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
        .reduce((acc, [k, v]) => {
          if (k === "category") {
            acc[k] = Number(v); // convert to number
          } else {
            acc[k] = v;
          }
          return acc;
        }, {});        

      const queryParams = new URLSearchParams(filteredParams).toString();
      const response = await fetch(
        `http://localhost:8000/api/tasks?${queryParams}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data)) {
        setTasks(data);
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      return [];
    }
  }

  async function getCategories() {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/categories/`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data)) {
        setCategories(data);
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      return [];
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getTasks();
  }, [filters]);

  const handleQuickAddTask = async (title) => {
    try {
      // Example POST request to add new task
      const res = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask = await res.json();

      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (taskToEdit) => {
    setEditingTask(taskToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    getTasks();

    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (loading)
    return (
      <p className="col-span-full text-center text-gray-600">
        Loading tasks...
      </p>
    );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Task Dashboard</h2>
      <p>Show tasks here with filters and priority badges.</p>
      <TaskList
        tasks={tasks}
        onQuickAddTask={handleQuickAddTask}
        onEditTask={handleEditTask}
        onFilterChange={handleFilterChange}
        filters={filters}
        categories={categories}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={"Edit Task"}
          task={editingTask}
        />
      )}
    </div>
  );
}
