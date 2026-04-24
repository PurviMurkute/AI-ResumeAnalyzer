import React from "react";

const Input = ({ type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 ${className}`}
    />
  );
};

export default Input;
