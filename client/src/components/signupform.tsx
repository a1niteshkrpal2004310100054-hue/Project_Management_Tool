import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../libs/api";
import { useNavigate } from "react-router";

interface Input {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const res = await api.post("/user/register", data);
      console.log(res.data);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="username"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-400">name is required</span>
            )}
          </div>
          <div className="grid gap-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400">email is required</span>
            )}
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400">password is required</span>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-400 rounded">
            SignUp
          </button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
