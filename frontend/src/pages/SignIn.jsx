import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        dispatch(loginFailure(data.message));
        return;
      }

      dispatch(loginSuccess(data.data));
      navigate("/");
      toast.success(data.message || "User login successfully");
    } catch (error) {
      console.log("Error in signup", error);
      dispatch(loginFailure("Something went wrong while connecting to server"));
    }
  };
  return (
    <section className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        {error && <p className="text-red-500">**{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="border p-3 rounded-lg bg-slate-700 text-white hover:opacity-90 disabled:opacity-80 uppercase">
          {loading ? "loading..." : "sign in"}
        </button>
      </form>
      <div className="flex items-center gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign up
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
