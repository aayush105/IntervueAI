import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import ErrorMessage from "../../components/ErrorMessage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // hanlde login form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    setError("");

    // signup API call
    try {
      // upload image if present
      if (profilePic) {
        const imageUploadResponse = await uploadImage(profilePic);

        profileImageUrl = imageUploadResponse.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl: profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data); // update user context with the signed-up user data
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(
          error.response.data.message || "Sign up failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600">
          Sign up to get started with IntervueAI. Enter your details below to
          create your account.
        </p>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="space-y-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            type="fullName"
            placeholder="Enter full name"
            label="Full Name"
            icon={FaUser}
          />

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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            Sign Up
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 cursor-pointer hover:text-blue-500 font-semibold"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
