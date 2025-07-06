// Represents a single task in the list.
const TaskItem = ({ task, handleEdit, categories }) => {
  const getPriority = () => {
    if (task.priority_score >= 2) return "high";
    else if (task.priority_score === 1) return "medium";
    else return "low";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const priority = getPriority();
  const colorClass = getPriorityColor(priority);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4">
      <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <div className="flex-grow" key={category.id}>
            <h3 className="font-semibold text-lg text-gray-900">
              {task.title}
            </h3>
            <p>{task.description || "No description"}</p>
            <p>Priority: {priority}</p>
            <p>Status: {task.status}</p>
            <p>Category: {category.name}</p>
            <p className="text-sm text-gray-500">
              Deadline:{" "}
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString()
                : "No deadline"}
            </p>

            <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
          </div>
        ))}
      {/* Add an edit button or link here */}
      <button
        className="text-blue-600 hover:text-blue-800 text-sm"
        onClick={() => handleEdit(task)}
      >
        Edit
      </button>
    </div>
  );
};

export default TaskItem;
