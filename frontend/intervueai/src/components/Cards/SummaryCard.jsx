import React from "react";
import { LuBookOpen, LuClock, LuTarget, LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-emerald-100 rounded-2xl p-3 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 relative group hover:scale-[1.02]"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-6 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="pr-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-lg font-bold text-emerald-600">
                {getInitials(role)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{role}</h2>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-700">
            <LuTarget className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="font-medium break-words leading-relaxed">
              {topicsToFocus}
            </span>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-100 hover:border-red-200 hover:bg-red-100 cursor-pointer absolute top-4 right-4 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 className="w-3 h-3" />
          Delete
        </button>
      </div>

      <div className="px-6 pb-6">
        {/* Improved responsive layout */}
        <div className="flex flex-col md:flex-row md:items-center sm:justify-between gap-3 mt-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-full flex items-center gap-1">
              <LuClock className="w-3 h-3" />
              {experience} {experience === 1 ? "year" : "years"}
            </div>

            <div className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 border border-blue-200 rounded-full flex items-center gap-1">
              <LuBookOpen className="w-3 h-3" />
              {questions} Q&A
            </div>
          </div>

          <div className="text-xs text-gray-500 font-medium flex items-center gap-1 flex-shrink-0">
            <LuClock className="w-3 h-3" />
            {lastUpdated}
          </div>
        </div>

        {description && description.trim() !== "" && (
          <p className="text-sm text-gray-600 font-medium line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
