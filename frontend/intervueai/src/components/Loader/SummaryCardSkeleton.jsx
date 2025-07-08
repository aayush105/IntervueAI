import React from "react";

const SummaryCardSkeleton = () => {
  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-3 animate-pulse">
      <div className="rounded-lg p-6 bg-emerald-50 relative">
        <div className="pr-16">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-white rounded-xl" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>

          <div className="flex gap-2 mt-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full mt-1" />
            <div className="h-3 bg-gray-300 rounded w-3/4" />
          </div>
        </div>

        <div className="absolute top-4 right-4 w-16 h-6 bg-red-100 rounded-lg" />
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-20 h-5 bg-gray-200 rounded-full" />
            <div className="w-20 h-5 bg-gray-200 rounded-full" />
          </div>
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
};

export default SummaryCardSkeleton;
