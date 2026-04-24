import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { MdStart } from "react-icons/md";

const Button = ({ text, textSize, variant, width, onclick, icon }) => {
  const VARIANTS = {
    primary:
      "bg-blue-500 hover:scale-95 text-white font-bold border border-blue-500 py-2 px-4 rounded-md",
    secondary:
      "bg-black hover:scale-95 text-white font-bold border border-black py-2 px-4 rounded-md",
    tertiary:
      "bg-white hover:scale-95 text-blue-500 font-bold border border-blue-500 py-2 px-4 rounded-md",
  };

  const ICONS = {
    login: <IoMdLogIn className="text-xl" />,
    signup: <HiMiniArrowRightStartOnRectangle className="text-xl" />,
    start: <MdStart className="text-2xl font-extrabold" />,
  };

  return (
    <button
      className={` ${VARIANTS[variant]} ${width || "w-auto"} ${textSize || "text-sm"} flex justify-center items-center gap-2`}
      onClick={onclick}
    >
      {text} {icon && ICONS[icon]}
    </button>
  );
};

export default Button;
