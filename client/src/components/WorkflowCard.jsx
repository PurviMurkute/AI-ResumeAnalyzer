import React from "react";

const WorkflowCard = ({ title, description, index }) => {
  return (
    <div className="relative group">
      {index !== 4 && (
        <div className="hidden md:block absolute left-7 top-20 h-full w-[2px] bg-gradient-to-b from-cyan-200 to-transparent"></div>
      )}

      <div className="flex items-start gap-6">
        <div className="relative z-10 flex-shrink-0">
          <div className="h-14 w-14 rounded-2xl bg-white border border-cyan-100 shadow-md flex items-center justify-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <div className="w-14 h-[3px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-5"></div>

          <h3 className="text-xl font-bold text-gray-700 leading-snug">
            {title}
          </h3>

          <p className="mt-4 text-gray-600 text-[15px] leading-7">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
