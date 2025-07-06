'use client';

import { useEffect, useRef, useState } from 'react';

const Modal = ({ isOpen, onClose, title, task = {} }) => {
  const modalRef = useRef(null);

  // Local form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    category: '',
  });

  // Populate form when editing a task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.deadline ? task.deadline.slice(0, 10) : '',
        priority:
          task.priority_score >= 2
            ? 'high'
            : task.priority_score === 1
            ? 'medium'
            : 'low',
        category: task.category?.name || '',
      });
    }
  }, [task]);

  // Escape key to close
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priority_score =
      formData.priority === 'high'
        ? 2
        : formData.priority === 'medium'
        ? 1
        : 0;

    const payload = {
      title: formData.title,
      description: formData.description,
      deadline: formData.dueDate || null,
      priority_score,
      category: formData.category,
      status: task.status || 'pending',
    };

    const method =  'PUT';
    const url =  `http://localhost:8000/api/tasks/${task.id}/`

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save task');
      const updatedTask = await res.json();
      onClose(); // close modal
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="dueDate" className="block font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
