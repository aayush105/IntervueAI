import React from "react";

const SkeletonLine = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded",
}) => (
  <div
    className={`bg-gray-300 animate-pulse ${width} ${height} ${rounded}`}
  ></div>
);

const SkeletonLoading = () => {
  return (
    <div className="h-screen overflow-y-auto p-6 space-y-6 bg-white">
      {/* Repeat blocks */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          {/* Title */}
          <SkeletonLine width="w-2/5" height="h-5" />

          {/* Paragraph lines */}
          <SkeletonLine />
          <SkeletonLine width="w-11/12" />
          <SkeletonLine width="w-4/5" />

          {/* Optional indented block */}
          {i % 2 === 1 && (
            <div className="bg-gray-200 p-4 rounded-md space-y-2">
              <SkeletonLine width="w-5/6" />
              <SkeletonLine width="w-3/4" />
              <SkeletonLine width="w-1/2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
