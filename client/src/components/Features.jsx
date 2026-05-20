import React from "react";

const FeatureCard = ({ title, description, index }) => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-7 w-full md:w-[40%] m-2 md:m-3 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="absolute -top-24 -right-24 h-44 w-44 rounded-full bg-cyan-100 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

      <div className="relative z-10 flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
            <span className="text-lg">✨</span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              Feature {index + 1}
            </p>

            <div className="mt-1 h-[3px] w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          </div>
        </div>

        <div className="opacity-0 translate-x-3 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <span className="text-lg text-gray-700">↗</span>
          </div>
        </div>
      </div>

      <h3 className="relative z-10 text-xl font-bold leading-snug text-gray-700 transition-colors duration-300 group-hover:text-cyan-700">
        {title}
      </h3>

      <p className="relative z-10 mt-5 text-[15px] leading-7 text-gray-600">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default FeatureCard;
