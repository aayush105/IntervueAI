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
import LOGO_ICON_BLACK from "../../assets/logo_black.png";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <div className="flex justify-center">
          <img
            src={LOGO_ICON_BLACK}
            alt="Hero Image"
            className="w-28 sm:w-40"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600">
          Sign up to get started with IntervueAI. Enter your details below to
          create your account.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
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
          disabled={isLoading}
          className="w-full  cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-semibold transition-colors"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
