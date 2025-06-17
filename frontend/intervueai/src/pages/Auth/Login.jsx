import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { validateEmail } from "../../utils/helper";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

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

    // login API call
    try {
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
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

        {/* <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Forgot password?
          </button>
        </div> */}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="button"
          // disabled={isLoading}
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {/* {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )} */}
          Sign In
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
