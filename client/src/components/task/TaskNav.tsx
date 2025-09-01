const TaskNav = () => {
  return (
    <div className="w-full bg-gray-100 rounded-xl p-3 flex justify-between items-center">
      <div>Tasks</div>
      <div>
        <button className="bg-blue-500 text-white px-2 rounded py-0.5">
          Create task
        </button>
      </div>
    </div>
  );
};

export default TaskNav;
