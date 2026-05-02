import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Input = ({
  type,
  placeholder,
  className,
  value,
  onChange,
  isPasswordInput,
  passwordVisible,
  setPasswordVisible,
  textInfo,
}) => {
  return (
    <div
      className={`border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-2 mb-3 w-full relative ${className || ""}`}
    >
      {type === "textarea" ? (
        <textarea
          value={value}
          rows={4}
          onChange={onChange}
          placeholder={placeholder}
          className={`border-0 focus:outline-none w-full`}
        />
      ) : (
        <>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border-0 focus:outline-none w-full`}
        />
        {textInfo && (
          <p className="text-xs text-gray-500 mt-1">
            {textInfo}
          </p>
        )}
        </>
      )}

      {isPasswordInput &&
        (passwordVisible ? (
          <FaEye
            className="absolute right-3 top-1/3 text-gray-600 text-md cursor-pointer"
            onClick={() => {
              setPasswordVisible(false);
            }}
          />
        ) : (
          <FaEyeSlash
            className="absolute right-3 top-1/3 text-gray-600 text-md cursor-pointer"
            onClick={() => {
              setPasswordVisible(true);
            }}
          />
        ))}
    </div>
  );
};

export default Input;
