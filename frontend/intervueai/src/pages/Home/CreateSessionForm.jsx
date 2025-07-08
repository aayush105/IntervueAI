import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { FaBriefcase, FaClock, FaListAlt, FaStickyNote } from "react-icons/fa";
import ErrorMessage from "../../components/ErrorMessage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { RiSparklingFill, RiTimeFill } from "react-icons/ri";
import LOGO_ICON_BLACK from "../../assets/logo_black.png";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    // console.log("formData", formData);

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // call ai api to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 5,
        }
      );

      // should be array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response?.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message || "Failed to create session.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center">
          <img
            src={LOGO_ICON_BLACK}
            alt="Hero Image"
            className="w-28 sm:w-40"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Start New Session
        </h2>
        <p className="text-gray-600">
          Create your personalized AI-powered interview preparation session
        </p>
      </div>

      <form onSubmit={handleCreateSession} className="space-y-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g. Software Engineer, Data Scientist, etc."
          type="text"
          required
          icon={FaBriefcase}
          disabled={isLoading}
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g. 3"
          type="number"
          required
          icon={FaClock}
          disabled={isLoading}
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="e.g. Data Structures, Algorithms, System Design (comma separated)"
          type="text"
          required
          icon={FaListAlt}
          textArea={true}
          disabled={isLoading}
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description (Optional)"
          placeholder="Any specific goals or notes for the interview?"
          type="text"
          icon={FaStickyNote}
          textArea={true}
          rows={4}
          disabled={isLoading}
        />

        {error && <ErrorMessage error={error} />}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating Session...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RiSparklingFill className="w-5 h-5" />
              Create AI Session
            </div>
          )}
        </button>

        {/* info note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-700 text-sm">
            <RiSparklingFill className="w-4 h-4" />
            <span className="font-medium">
              AI will generate 5 personalized questions for you
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;
