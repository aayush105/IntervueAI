import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  );
};

export default ErrorMessage;
