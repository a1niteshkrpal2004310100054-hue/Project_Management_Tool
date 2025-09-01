import { useForm, type SubmitHandler } from "react-hook-form";

interface TaskForm {
  name: string;
  description: string;
  assignedTo: string;
}

export default function TaskForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TaskForm>();

  const onSubmit: SubmitHandler<TaskForm> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <div className="flex flex-col flex-1 gap-2">
        {/* Input fields */}
        <label>
          Task Name:
          <input
            {...register("name", { required: "Task Name is required" })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </label>

        <label>
          Task Description:
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </label>

        <label>
          Assigned To:
          <input
            type="text"
            {...register("assignedTo", {
              required: "Assignee is required",
            })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.assignedTo && (
            <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
          )}
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-1 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
