import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Intervue_AI from "../../assets/IntervueAI_Logo.jpg";

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
    user && (
      <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full gap-3 hover:bg-white/20 transition-all">
        <img
          src={user?.profileImageUrl || Intervue_AI}
          alt={user?.name}
          className="w-7 sm:w-8 h-7 sm:h-8 rounded-full object-cover border-2 border-white/30"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-avatar.png";
          }}
        />

        <span className="font-medium text-sm sm:text-base text-white whitespace-nowrap">
          {user.name}
        </span>

        <button
          onClick={handleLogout}
          className="text-[11px] sm:text-xs font-medium text-white bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded-full transition-all"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default ProfileInfoCard;
