import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { RiMenu3Fill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";

const Header = ({ setIsSignInOpen, setIsSignUpOpen }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const navItem = (label, key) => (
    <h3
      onClick={() => setActiveTab(key)}
      className={`cursor-pointer pb-1 transition-all duration-200 
        ${activeTab === key ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-800"}
      `}
    >
      {label}
    </h3>
  );
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-0 mt-3 px-5 md:py-1 w-full md:w-[75%] h-[50px] bg-white flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="logo" className="w-[45px] md:w-[45px] inline" />
          <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-blue-500 to-sky-500">
            HireLens
          </h1>
        </div>
        <div className="hidden md:flex justify-center items-center gap-6">
          <div className="flex gap-6">
            {navItem("Home", "home")}
            {navItem("Features", "features")}
            {navItem("How It Works", "how")}
          </div>
          {!user ? (
            <div className="flex justify-center items-center gap-5">
              <Button
                text="Sign In"
                variant="secondary"
                icon={"login"}
                width={100}
                onclick={() => {
                  setIsSignInOpen(true);
                }}
              />
              <Button
                text="Sign Up"
                variant="primary"
                icon={"signup"}
                width={100}
                onclick={() => {
                  setIsSignUpOpen(true);
                }}
              />
            </div>
          ) : (
            <Button
              text="Sign Out"
              variant="secondary"
              icon={"signup"}
              width={100}
              onclick={logout}
            />
          )}
        </div>
        <div className="md:hidden">
          <RiMenu3Fill
            className="w-[25px] h-[25px] text-gray-800 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
