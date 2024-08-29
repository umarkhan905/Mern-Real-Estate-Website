import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(loginSuccess(data.data));
      navigate("/");
    } catch (error) {
      console.log("Error in google sign in", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
      continue with google
    </button>
  );
};

export default OAuth;
