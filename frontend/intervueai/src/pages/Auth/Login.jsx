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
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl relative">
      {isLoading && <LoaderOverlay />}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">
          Sign in to your account to continue to IntervueAI.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="Enter your email"
          label="Email Address"
          icon={FaEnvelope}
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Enter your password"
          label="Password"
          icon={FaLock}
        />

        {error && <ErrorMessage error={error} />}

        <button
          type="button"
          disabled={isLoading}
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )}
          {/* Sign In */}
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 cursor-pointer hover:text-blue-500 font-semibold"
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
