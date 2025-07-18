import React, { useContext, useEffect, useRef, useState } from "react";
import { LuDownload, LuFileText, LuTrash2 } from "react-icons/lu";
import AIResponsePreview from "./AIResponsePreview";
import LOGO_ICON_WHITE from "../../../assets/IntervueAI-Seto.png";
import {
  convertMarkdownToHtml,
  getPDFStyles,
} from "../../../utils/convertMarkdownToHtml";
import { UserContext } from "../../../context/userContext";
import { RiCloseFill } from "react-icons/ri";

// PDF Export Modal Component
const PDFExportModal = ({ isOpen, onClose, questions, sessionData }) => {
  const contentRef = useRef(null);
  const { user } = useContext(UserContext);

  const [modalQuestions, setModalQuestions] = useState(questions || []);

  useEffect(() => {
    if (isOpen) {
      setModalQuestions(questions);
    }
  }, [isOpen, questions]);

  // handle delete question from modal
  const handleDeleteQuestion = (questionId) => {
    setModalQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");

    const allQuestionsHTML = questions
      .map(
        (q, index) => `
    <div class="question-container">
      <div class="question-header">
        <div class="question-number">Q${index + 1}</div>
        <h3 class="question-text">${q.question}</h3>
      </div>
      
      <div class="answer-section">
        <div class="answer-header">
          <div class="answer-icon">A</div>
          <span class="answer-label">Answer</span>
        </div>
        <div class="answer-content">
          ${convertMarkdownToHtml(q.answer)}
        </div>
      </div>
      
      ${
        q.note
          ? `
        <div class="note-section">
          <div class="note-header">
            <span class="note-label">📝 Your Note</span>
          </div>
          <p class="note-content">${q.note}</p>
        </div>
      `
          : ""
      }
    </div>
  `
      )
      .join("");

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>IntervueAI - ${user.name} | Interview Q&A - ${
      sessionData.role
    }</title>
        <meta charset="UTF-8">
        ${getPDFStyles()}
      </head>
      <body>
        <!-- Cover Page - Takes full page -->
        <div class="cover-page">
          <div class="cover-content">
            <div class="brand-logo">
              <img src="${LOGO_ICON_WHITE}" alt="IntervueAI Logo" class="logo-image" />
              <span class="logo-text">IntervueAI</span>
            </div>
            
            <h1 class="cover-title">Interview Q&A</h1>
            <p class="cover-subtitle">Professional Interview Preparation</p>
            
            <div class="session-info">
              <h2>Session Details</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Role</div>
                  <div class="info-value">${sessionData?.role}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Experience</div>
                  <div class="info-value">${sessionData?.experience} years</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Total Questions</div>
                  <div class="info-value">${modalQuestions?.length}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Prepared By</div>
                  <div class="info-value">${user.name}</div>
                </div>
                <div class="info-item focus-areas">
                  <div class="info-label">Focus Areas</div>
                  <div class="focus-areas-content">
                    <div class="info-value">${sessionData?.topicsToFocus}</div>
                  </div>
                </div>
              </div>
              
            </div>
            
             <p class="generated-date">Generated on ${new Date().toLocaleDateString(
               "en-US",
               {
                 year: "numeric",
                 month: "long",
                 day: "numeric",
               }
             )}</p>
          </div>
        </div>
        
        <!-- Questions Content - Starts on new page -->
        <div class="questions-content">
          <div class="questions-list">
            ${allQuestionsHTML}
          </div>
        </div>
      </body>
    </html>
  `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LuFileText className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Export Interview Q&A</h2>
                <p className="text-emerald-100 text-sm">
                  {sessionData?.role} • {modalQuestions?.length} Questions
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white hover:text-emerald-200 transition-colors p-2 cursor-pointer"
            >
              <RiCloseFill className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content - All questions without pagination */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {modalQuestions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                No question selected
              </div>
              <p className="text-gray-500 text-sm">
                Add some questions to export as PDF
              </p>
            </div>
          ) : (
            <div ref={contentRef} className="space-y-6">
              {modalQuestions.map((question) => (
                <div
                  key={question._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative group"
                >
                  {/* delete button */}
                  <button
                    className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    onClick={() => handleDeleteQuestion(question._id)}
                    title="Remove from PDF"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>

                  {/* Question */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">Q</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>

                  {/* Answer */}
                  <div className="ml-11 bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">A</span>
                      </div>
                      <span className="text-sm font-medium text-emerald-700">
                        Answer
                      </span>
                    </div>
                    <AIResponsePreview content={question.answer} />
                  </div>

                  {/* Note if exists */}
                  {question.note && (
                    <div className="ml-11 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-amber-700">
                          📝 Your Note
                        </span>
                      </div>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {question.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Simplified without pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Total Questions Info */}
            <div className="text-sm text-gray-600">
              Selected Questions: {modalQuestions?.length}
              {modalQuestions?.length !== questions?.length && (
                <span className="text-amber-600 ml-2">
                  ({questions?.length - modalQuestions?.length} removed)
                </span>
              )}
            </div>

            {/* Export Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl cursor-pointer border border-gray-300 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              >
                <LuDownload className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFExportModal;
