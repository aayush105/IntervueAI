import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero_img.png";
import LOGO_ICON_BLACK from "../assets/logo_black.png";
import LOGO_ICON_WHITE from "../assets/logo_white.png";
import LOGO_ICON_2 from "../assets/logo.png";
import LOGO_ICON_1 from "../assets/IntervueAi_1.png";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { APP_FEATURES } from "../utils/data";
import Modal from "../components/Modal";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import {
  RiBrainFill,
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiSparklingFill,
  RiTwitterFill,
} from "react-icons/ri";

const LandingPage = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* hero section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
        {/* animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-500/25 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10">
          {/* header */}
          <header className="container mx-auto px-6 pt-8 pb-4">
            <div className="flex justify-between items-center">
              {/* <div className="text-xl text-black font-bold">IntervueAI</div> */}
              <img
                src={LOGO_ICON_WHITE}
                alt="Hero Image"
                className="w-32 sm:w-52"
              />

              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="bg-white/10 cursor-pointer backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:bg-white/20 transition-all font-medium"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </header>

          {/* hero content */}
          <div className="container mx-auto px-6 pt-20 pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-50/30 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <RiSparklingFill className="w-4 h-4" />
                Powered by Advanced AI
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Master Your Next
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Get AI-generated, role-specific interview questions with
                detailed explanations. Practice smarter, not harder, and land
                your dream job with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCTA}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Practicing Free
                </button>
                <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hero image section */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* feature section */}
      <div className="bg-emerald-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview
              preparation tailored to your career goals and experience level.
            </p>
          </div>

          {/* features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {APP_FEATURES.slice(0, 3).map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {APP_FEATURES.slice(3).map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their
            dream jobs with our AI-powered interview preparation platform.
          </p>
          <button
            onClick={handleCTA}
            className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started for Free
          </button>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-emerald-50 border-t border-emerald-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Brand */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <img
                  src={LOGO_ICON_BLACK}
                  alt="Hero Image"
                  className="w-28 sm:w-40"
                />
              </div>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Empowering professionals worldwide with AI-powered interview
                preparation. Practice smarter, perform better, and land your
                dream job.
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                <a
                  href="https://github.com/aayush105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all"
                >
                  <RiGithubFill className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aayushrestha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all"
                >
                  <RiLinkedinFill className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </a>
                <a
                  href="https://x.com/aayushrestha5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all"
                >
                  <RiTwitterFill className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </a>
                <a
                  href="mailto:sthaaayush105@gmail.com"
                  className="group w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all"
                >
                  <RiMailFill className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-emerald-200 pt-4 w-full">
              <p className="text-gray-500 text-sm">
                © 2025 IntervueAI — Developed by{" "}
                <a
                  href="https://github.com/aayush105"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aayush Shrestha
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
