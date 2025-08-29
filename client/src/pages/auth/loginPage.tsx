import LoginForm from "../../components/loginform";

function Login() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className=" flex w-full max-w-sm flex-col gap-6 rounded-xl p-10 shadow-2xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
