import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-md shadow transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
