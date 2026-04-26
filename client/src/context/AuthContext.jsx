import { createContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userFromLS = JSON.parse(localStorage.getItem("User"));
    const token = localStorage.getItem("JWT");
    return userFromLS && token ? userFromLS : null;
  });

  const login = (userData, token) => {
    toast.success("Sign In Successful");
    localStorage.setItem("User", JSON.stringify(userData));
    localStorage.setItem("JWT", token);
    setUser(userData);
  };

  const logout = () => {
    toast.success("Sign Out Successful");
    localStorage.removeItem("User");
    localStorage.removeItem("JWT");
    setTimeout(() => {
      setUser(null);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
