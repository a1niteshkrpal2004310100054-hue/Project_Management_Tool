import { useState } from "react";
import CreateProject from "./CreateProject";
const ProjectNav = () => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  return (
    <div className="w-full bg-gray-100 rounded-xl p-3 flex justify-between items-center">
      <div>Project</div>
      <div>
        <button
          className="bg-blue-500 text-white px-2 rounded py-0.5"
          onClick={() => setModelOpen(true)}
        >
          Create
        </button>
      </div>
      {modelOpen && <CreateProject onClose={() => setModelOpen(false)} />}
    </div>
  );
};

export default ProjectNav;
