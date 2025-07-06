// Represents a single task in the list.

const TaskItem = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4">
      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
        {task.dueDate && (
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
      </div>
      {/* Add an edit button or link here */}
      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
    </div>
  );
};

export default TaskItem;