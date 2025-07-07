"use client";

import { LuClock, LuTarget, LuBookOpen } from "react-icons/lu";
import { getInitials } from "../../../utils/helper";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 relative overflow-hidden border-b border-emerald-200">
      <div className="container mx-auto px-4 md:px-0">
        <div className="py-8 relative z-10">
          <div className="flex items-start gap-6">
            {/* Role Icon */}
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-600">
                {getInitials(role)}
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-grow min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{role}</h1>
              <div className="flex items-start gap-2 text-gray-700 mb-4">
                <LuTarget className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-base font-medium leading-relaxed">
                  {topicsToFocus}
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-sm font-medium text-emerald-700 bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full flex items-center gap-2">
                  <LuClock className="w-4 h-4" />
                  Experience: {experience} {experience === 1 ? "year" : "years"}
                </div>

                <div className="text-sm font-medium text-blue-700 bg-blue-50 px-4 py-2 border border-blue-200 rounded-full flex items-center gap-2">
                  <LuBookOpen className="w-4 h-4" />
                  {questions} Q&A
                </div>

                <div className="text-sm text-gray-500 font-medium flex items-center gap-2 flex-shrink-0">
                  <LuClock className="w-4 h-4" />
                  Last Updated: {lastUpdated}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-full overflow-hidden opacity-5">
          <div className="absolute top-8 right-8 w-32 h-32 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-teal-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-12 right-32 w-20 h-20 bg-green-300 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
