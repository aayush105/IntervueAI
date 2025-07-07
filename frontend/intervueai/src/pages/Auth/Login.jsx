import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import ErrorMessage from "../../components/ErrorMessage";
import LOGO_ICON_BLACK from "../../assets/logo_black.png";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // hanlde login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    setError("");
    setIsLoading(true);

    // login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data); // update user context with the logged-in user data
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* {isLoading && <LoaderOverlay />} */}

      <div className="text-center mb-6">
        <div className="flex justify-center">
          <img
            src={LOGO_ICON_BLACK}
            alt="Hero Image"
            className="w-28 sm:w-40"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">
          Sign in to your account to continue to IntervueAI.
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="Enter your email"
          label="Email Address"
          icon={FaEnvelope}
          disabled={isLoading}
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Enter your password"
          label="Password"
          icon={FaLock}
          disabled={isLoading}
        />

        {error && <ErrorMessage error={error} />}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full  cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-semibold transition-colors"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
