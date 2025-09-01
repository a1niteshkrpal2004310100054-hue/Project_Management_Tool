import { useForm, type SubmitHandler } from "react-hook-form";

interface TeamForm {
  name: string;
  description: string;
}
export default function TeamForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TeamForm>();

  const onSubmit: SubmitHandler<TeamForm> = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full h-full flex-col gap-4"
    >
      <div className="flex flex-1 flex-col">
        <label htmlFor="name">
          Project Name:
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full border rounded px-2 py-1"
            {...register("name", { required: "Name is required " })}
          />
        </label>
        <label htmlFor="description">
          Project Description:
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
          <input
            id="description"
            type="text"
            placeholder="Desc"
            className="w-full border rounded px-2 py-1"
            {...register("description", {
              required: "Description is required",
            })}
          />
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
