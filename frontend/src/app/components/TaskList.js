import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onFilterChange, onQuickAddTask }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Tasks</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          {/* ... more categories */}
        </select>

        <select
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          onChange={(e) => onFilterChange("priority", e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
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
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
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
