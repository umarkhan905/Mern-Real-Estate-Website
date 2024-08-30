import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../services/firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  logoutSuccess,
  logoutFailure,
  logoutStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: "",
  });
  const fileRef = useRef();
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/v1/users/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data.data));
      toast.success(data.message);
      setFormData({
        username: data.data.username,
        email: data.data.email,
        avatar: data.data.avatar,
        password: "",
      });
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log("Error in profile page", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/v1/users/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(deleteFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(deleteSuccess());
      toast.success(data.message);
    } catch (error) {
      dispatch(deleteFailure(error.message));
      toast.error(error.message);
      console.log("Error in profile page", error);
    }
  };

  const handleSignOutAccount = async () => {
    try {
      dispatch(logoutStart());
      const res = await fetch("/api/v1/auth/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(logoutFailure(data.message));
        return;
      }

      dispatch(logoutSuccess());
      toast.success(data.message);
    } catch (error) {
      dispatch(logoutFailure(error.message));
      console.log("Error in profile page", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <section className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          name="username"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-700">**{error}</p>}
        <button
          type="submit"
          className="border p-3 rounded-lg bg-slate-700 text-white hover:opacity-90 disabled:opacity-80 uppercase">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      <div className="flex items-center justify-between mt-2 text-red-700">
        <span className="cursor-pointer" onClick={handleDeleteAccount}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOutAccount}>
          Sign Out
        </span>
      </div>
    </section>
  );
};

export default Profile;
