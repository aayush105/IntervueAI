import React from "react";
import { LuSparkles, LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[85px] right-0 z-40 h-[calc(100dvh-85px)] transition-transform bg-white w-full md:w-[40vw] shadow-2xl border-l border-emerald-100 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-label-right"
    >
      <div className="sticky top-0 bg-white z-50 px-6 pt-6 pb-4 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <LuSparkles className="w-4 h-4 text-white" />
            </div>
            <h5
              id="drawer-label-right"
              className="text-lg font-semibold text-gray-900"
            >
              {title || "AI Explanation"}
            </h5>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <LuX className="text-lg" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="text-sm pt-2">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
