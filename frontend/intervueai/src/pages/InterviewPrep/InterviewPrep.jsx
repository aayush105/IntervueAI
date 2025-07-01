import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // fetch session data by sessionId
  const fetchSessionDataByID = async () => {
    setErrorMsg("");
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session && response.data.success) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      setErrorMsg(
        error?.response?.data?.message ||
          "An error occurred while fetching session data."
      );
      toast.error(errorMsg);
    }
  };

  // generate concept explanation
  const generateConceptExplanation = async (question) => {};

  // pin question
  const toggleQuestionPinStatus = async (questionId) => {};

  // add more question to a session
  const addMoreQuestions = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDataByID();
    }

    return () => {};
  }, []);

  console.log("sessionData", sessionData);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions.length || "-"}
        description={sessionData?.description || "-"}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData?.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index * 0.1,
                    }}
                    layout // this is the key prop that animate position changes
                    layoutId={`question-${data._id || index}`} // helps framer track the element
                  >
                    <>
                      <QuestionCard
                        question={data.question}
                        answer={data.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
