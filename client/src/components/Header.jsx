import logo from "../assets/logo.png";
import Button from "./Button";

const Header = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="fixed top-0 mt-3 px-5 md:py-1 w-[75%] h-[50px] bg-white flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <img src={logo} alt="logo" className="w-[45px] md:w-[45px] inline" />
        <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-blue-500 to-sky-500">
          HireLens
        </h1>
      </div>
      <div className="flex justify-center items-center gap-6">
        <h3>Home</h3>
        <h3>Features</h3>
        <h3>How It Works</h3>
        <Button text="Sign In" variant="secondary" width={100} />
        <Button text="Sign Up" variant="primary" width={100}/>
      </div>
    </div>
    </div>
  );
};

export default Header;
