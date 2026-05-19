import React from "react";

const Features = ({ title, description }) => {
  return (
    <div className="border border-gray-300 rounded-md p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300 width-full md:w-[45%] m-5">
      <h3 className="text-[18px] font-bold text-gray-700">{title}</h3>
      <p className="text-gray-500 mt-2 text-[14px]">{description}</p>
    </div>
  );
};

export default Features;
