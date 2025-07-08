import React from "react";

const QuestionCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl mb-6 overflow-hidden py-6 px-6 shadow-lg border border-emerald-100 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 bg-gray-300 rounded-full flex-shrink-0" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />

        <div className="flex items-center gap-2">
          <div className="h-7 w-16 bg-gray-200 rounded-lg" />
          <div className="h-7 w-20 bg-gray-200 rounded-lg" />
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Answer Section */}
      {/* <div className="mt-6 bg-gray-50 px-6 py-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="h-3 w-20 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-11/12 bg-gray-200 rounded" />
          <div className="h-3 w-10/12 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
      </div> */}
    </div>
  );
};

export default QuestionCardSkeleton;
