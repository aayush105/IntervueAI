import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import LOGO_ICON_WHITE from "../../assets/IntervueAI-Seto.png";

const Navbar = () => {
  return (
    <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
          <img
            src={LOGO_ICON_WHITE}
            alt="Hero Image"
            className="w-24 sm:w-32"
          />
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
