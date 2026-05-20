import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { MdStart } from "react-icons/md";
import { IoCloudUpload } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Button = ({
  text,
  textSize,
  variant = "primary",
  width,
  onclick,
  icon,
  loading,
}) => {
  const VARIANTS = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-500 shadow-md shadow-cyan-100 hover:shadow-lg hover:shadow-cyan-200 hover:-translate-y-[1px]",

    secondary:
      "bg-gray-900 text-white border border-gray-900 hover:bg-black hover:-translate-y-[1px]",

    tertiary:
      "bg-white text-gray-800 border border-gray-200 hover:border-cyan-200 hover:text-cyan-600 hover:bg-cyan-50",
  };

  const ICONS = {
    login: <IoMdLogIn className="text-[18px]" />,
    signup: <HiMiniArrowRightStartOnRectangle className="text-[18px]" />,
    start: <MdStart className="text-[18px]" />,
    upload: <IoCloudUpload className="text-[18px]" />,
    google: <FcGoogle className="text-[18px]" />,
  };

  return (
    <button
      disabled={loading}
      onClick={onclick}
      className={`
        ${VARIANTS[variant]}
        ${width || "w-auto"}
        px-5 py-2.5 rounded-xl
        font-semibold
        transition-all duration-300
        cursor-pointer
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      <div
        className={`${textSize || "text-sm"} flex items-center justify-center gap-2`}
      >
        {loading ? (
          <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
        ) : (
          <>
            <span>{text}</span>
            {icon && ICONS[icon]}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;