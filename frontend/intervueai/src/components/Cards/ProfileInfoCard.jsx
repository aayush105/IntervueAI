import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  //   console.log("ProfileInfoCard user:", user);

  return (
    <div className="flex items-center bg-white shadow-md px-1.5 sm:px-3 py-1 sm:py-2 rounded-full border border-gray-200 gap-1.5 sm:gap-3 w-fit hover:shadow-lg transition-all">
      <img
        src={user.profileImageUrl}
        alt={user.name}
        className="w-7 sm:w-8 h-7 sm:h-8 rounded-full object-cover border"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-avatar.png";
        }}
      />

      <span className="text-sm sm:text-base font-bold text-gray-800 whitespace-nowrap">
        {user.name}
      </span>

      <button
        onClick={handleLogout}
        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-all"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileInfoCard;
