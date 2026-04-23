import React from "react";

const Button = ({ text, variant, width, onclick }) => {
  const VARIANTS = {
    primary:
      "bg-blue-500 hover:scale-95 text-white font-bold border border-blue-500 py-2 px-4 rounded-md",
    secondary:
      "bg-white hover:scale-95 text-blue-500 font-bold border border-blue-500 py-2 px-4 rounded-md",
  };
  return (
    <div>
      <button className={` ${VARIANTS[variant]} ${width && `w-[${width}px]`} text-sm`} onClick={onclick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
