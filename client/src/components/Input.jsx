const Input = ({ type, placeholder, className, value, onChange, name }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded-md p-2 mb-3 w-full ${className || ""}`}
    />
  );
};

export default Input;
