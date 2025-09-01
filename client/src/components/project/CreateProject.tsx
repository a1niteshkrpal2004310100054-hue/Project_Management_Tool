import { X } from "lucide-react";
import { useState, type SetStateAction } from "react";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
import TeamForm from "./TeamForm";

type CreateProjectProps = {
  onClose: () => void;
};

function CreateProject({ onClose }: CreateProjectProps) {
  const steps = [
    { label: "Project Form", element: ProjectForm },
    { label: "Team Form", element: TeamForm },
    { label: "Task Form", element: TaskForm },
  ];

  const [currentStep, setCurrentStep] = useState<number>(0);

  const gotoStep = (index: SetStateAction<number>) => {
    console.log("gotoStep");
    setCurrentStep(index);
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
      <div className="bg-gray-100 w-[800px] h-[60vh] p-3 rounded shadow-xl/30 relative">
        <button
          type="button"
          className="absolute top-3.5 right-4"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-2">Create</h2>
        <div className="flex flex-1 justify-between items-center mb-4">
          {/* <h2 className="text-xl text-center font-semibold">Create step {step} of 3</h2> */}
          {steps.map((label, index) => (
            <button
              key={index}
              onClick={() => gotoStep(index)}
              className={`flex-1 text-center py-1 border-b-2 transition-colors duration-200 ${
                currentStep === index
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {label.label}
            </button>
          ))}
        </div>
        <div className="flex-2 overflow-hidden">
          {currentStep == 0 && <ProjectForm />}
          {currentStep == 1 && <TeamForm />}
          {currentStep == 2 && <TaskForm />}
        </div>
      </div>
    </section>
  );
}

export default CreateProject;
