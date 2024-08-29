import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <section className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
        />
        <button
          type="submit"
          className="border p-3 rounded-lg bg-slate-700 text-white hover:opacity-90 disabled:opacity-80 uppercase">
          sign up
        </button>
      </form>
      <div className="flex items-center gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/sign-in" className="text-blue-700">
          Sign in
        </Link>
      </div>
    </section>
  );
};
export default SignUp;
