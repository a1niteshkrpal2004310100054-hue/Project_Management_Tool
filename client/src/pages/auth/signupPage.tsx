import SignupForm from "../../components/signupform";

function Signup() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className=" flex w-full max-w-sm flex-col gap-6 rounded-xl p-10 shadow-2xl">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
