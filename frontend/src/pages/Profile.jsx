import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser?.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full self-center cursor-pointer"
        />
        <input
          type="text"
          name="username"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="Username"
          value={currentUser?.username || ""}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          value={currentUser?.email || ""}
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
          Update
        </button>
      </form>

      <div className="flex items-center justify-between mt-2 text-red-700">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </section>
  );
};

export default Profile;
