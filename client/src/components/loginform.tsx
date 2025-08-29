import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/api";

interface Input {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    // console.log(data);
    try {
      const res = await api.post(`/user/login`, data);
      console.log(res.data);
      localStorage.setItem("authToken", res.data.accesToken);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
                {/* <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>
            <button type="submit" className="w-full bg-blue-400 rounded">
              Login
            </button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
