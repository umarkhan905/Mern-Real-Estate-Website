import { Routes, Route } from "react-router-dom";
import {
  About,
  CreateListing,
  Home,
  Listing,
  Profile,
  Search,
  SignIn,
  SignUp,
  UpdateListing,
} from "./pages";
import { Header, PrivateRoute } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-listing/:id"
          element={
            <PrivateRoute>
              <UpdateListing />
            </PrivateRoute>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <PrivateRoute>
              <Listing />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
