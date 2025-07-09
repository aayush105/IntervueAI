import React, { useEffect, useRef } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";
import { MdEditSquare, MdStickyNote2 } from "react-icons/md";
import Modal from "../Modal";
import NoteForm from "../../pages/InterviewPrep/components/NoteForm";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  note,
  onUpdateNote,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const contentRef = useRef(null);

  const [showNoteModal, setShowNoteModal] = React.useState(false);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-white rounded-2xl mb-6 overflow-hidden py-6 px-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 group hover:border-emerald-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">Q</span>
            </div>

            <h3
              className="text-sm md:text-base font-medium text-gray-800 mr-0 md:mr-20 leading-relaxed cursor-pointer hover:text-gray-900 transition-colors"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              {/* pin button */}
              <button
                className={`flex items-center gap-2 text-xs font-medium cursor-pointer px-3 py-2 mr-2 rounded-lg border transition-all ${
                  isPinned
                    ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                    : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
                  // : "text-indigo-800 bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
                }`}
                // className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className="text-xs" />
                ) : (
                  <LuPin className="text-xs" />
                )}
              </button>

              {/* note button */}
              <button
                className={`flex items-center text-nowrap gap-2 text-xs font-medium cursor-pointer px-3 py-2 mr-2 rounded-lg border transition-all ${
                  note
                    ? "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
                    : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setShowNoteModal(true)}
              >
                {note ? (
                  <MdEditSquare className="text-xs" />
                ) : (
                  <MdStickyNote2 className="text-xs" />
                )}
                <span className="hidden md:block">
                  {note ? "Edit Note" : "Add Note"}
                </span>
              </button>

              {/* learn more button */}
              <button
                className="flex items-center text-nowrap gap-2 text-xs text-teal-700 font-medium bg-teal-50 px-3 py-2 mr-2 cursor-pointer rounded-lg border border-teal-200 hover:bg-teal-100 hover:border-teal-300 transition-all"
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles />
                <span className="hidden md:block">Learn More</span>
              </button>
            </div>

            <button
              className="text-gray-400 hover:text-emerald-600 cursor-pointer p-1 rounded-full hover:bg-emerald-50 transition-all"
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Show note if exists */}
        {note && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MdStickyNote2 className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">
                Your Note
              </span>
            </div>
            <p className="text-sm text-amber-800 leading-relaxed">{note}</p>
          </div>
        )}

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-700 bg-gray-50 px-6 py-4 rounded-xl"
            // className="mt-6 text-gray-700 bg-emerald-50 px-6 py-4 rounded-xl border border-emerald-100"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">A</span>
              </div>
              <span className="text-sm font-medium text-emerald-700">
                Answer
              </span>
            </div>
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>

      {/* note modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        title={note ? "Edit Note" : "Add Note"}
      >
        <NoteForm
          currentNote={note}
          onSave={onUpdateNote}
          onClose={() => setShowNoteModal(false)}
          question={question}
        />
      </Modal>
    </>
  );
};

export default QuestionCard;
