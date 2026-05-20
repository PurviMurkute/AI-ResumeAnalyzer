import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { RiMenu3Fill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-scroll";

const Header = ({ setIsSignInOpen, setIsSignUpOpen }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/dashboard";

  const navItem = (label, key) => (
    <h3
      onClick={() => setActiveTab(key)}
      className={`relative cursor-pointer text-[15px] font-medium transition-all duration-300
      ${
        activeTab === key
          ? "text-cyan-600"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-cyan-500 transition-all duration-300
        ${activeTab === key ? "w-full" : "w-0"}`}
      ></span>
    </h3>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4">
      <div className="w-full md:w-[75%] h-[50px]">
        <div className="backdrop-blur-xl bg-white/80 border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl px-5 md:px-7 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="logo" className="w-[32px] md:w-[38px]" />

            <div>
              <h1 className="text-[24px] font-black tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                HireLens
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {!isDashboard ? (
              <div className="flex items-center gap-8">
                <Link to="home" smooth duration={200}>
                  {navItem("Home", "home")}
                </Link>

                <Link to="features" smooth duration={200}>
                  {navItem("Features", "features")}
                </Link>

                <Link to="how-it-works" smooth duration={200}>
                  {navItem("How It Works", "how")}
                </Link>
              </div>
            ) : (
              <Button
                text="Upload Resume"
                variant="tertiary"
                icon="upload"
                onclick={() => {
                  navigate("/");
                }}
              />
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button
                  text="Sign In"
                  variant="tertiary"
                  icon="login"
                  onclick={() => {
                    setIsSignInOpen(true);
                  }}
                />

                <Button
                  text="Get Started"
                  variant="primary"
                  icon="signup"
                  onclick={() => {
                    setIsSignUpOpen(true);
                  }}
                />
              </>
            ) : (
              <Button
                text="Sign Out"
                variant="secondary"
                icon="signup"
                onclick={logout}
              />
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-11 w-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center"
            >
              <RiMenu3Fill className="text-[22px] text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
