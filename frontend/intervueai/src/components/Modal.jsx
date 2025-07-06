import React from "react";
import { RiCloseFill } from "react-icons/ri";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm p-4">
      {/* modal content */}
      <div className="relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full border border-gray-100">
        {/* modal header */}
        {!hideHeader && title && (
          <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
        )}

        <button
          type="button"
          className="absolute cursor-pointer top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all z-10 group"
          onClick={onClose}
        >
          <RiCloseFill className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* modal body (scrollable) */}
        <div className="flex-1 overflow-y-auto max-h-[90vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
