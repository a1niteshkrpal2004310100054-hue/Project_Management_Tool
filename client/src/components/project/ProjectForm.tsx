import { useForm, type SubmitHandler } from "react-hook-form";

interface ProjectForm {
  name: string;
  description: string;
}
export default function ProjectForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProjectForm>();

  const onSubmit: SubmitHandler<ProjectForm> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col h-full space-y-1"
    >
      <div className="w-[600px] mx-auto space-y-1">
        <label htmlFor="name">
          Project Name:
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full border rounded px-2 py-1"
            {...register("name", { required: "Project Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Project name is required</p>
          )}
        </label>

        <label htmlFor="description">
          Project Description:{" "}
          <input
            id="description"
            type="text"
            placeholder="Desc"
            className="w-full border rounded px-2 py-1"
            {...register("description", {
              required: "Project description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              Project description is required
            </p>
          )}
        </label>
      </div>

      <div className="flex justify-end items-end">
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
