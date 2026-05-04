import React, { useContext, useState } from "react";
import Header from "../components/Header";
import homeImage from "../assets/homeImg.png";
import Button from "../components/Button";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import UploadResume from "../components/UploadResume";

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center align-middle">
      <Header
        setIsSignInOpen={setIsSignInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <div className="gap-8 md:gap-20 w-[85%] md:w-[70%] mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="max-w-xl mt-22">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700">
            We Analyze Your Resume, You Land Your Dream Job!!!
          </h1>
          <h4 className="text-sm md:text-md mt-6 text-gray-500 font-medium">
            Analyze Your Resume with AI: Get ATS score, keyword insights & job
            match instantly
          </h4>
          <div className="mt-6">
            {!user ? (
              <Button
                text="Get Started"
                variant={"primary"}
                icon={"start"}
                textSize={"text-sm md:text-md"}
                width={"170"}
                onclick={() => {
                  if (!user) {
                    setIsSignUpOpen(true);
                  } else {
                    navigate("/dashboard");
                  }
                }}
              />
            ) : (
              <div className="flex justify-items-start items-center gap-4">

              <Button
                text="Upload Resume"
                variant="primary"
                icon="upload"
                textSize={"text-sm md:text-md"}
                onclick={() => {
                  setIsUploadModalOpen(true);
                }}
              />
              <Button
                text="Go to Dashboard"
                variant={"secondary"}
                icon={"start"}
                textSize={"text-sm md:text-md"}
                onclick={() => {
                    navigate("/dashboard");
                }}
              />
              </div>
            )}
          </div>
        </div>
        <div className=" bg-blue-50 rounded-full shadow p-6 md:mt-10">
          <img
            src={homeImage}
            alt="home"
            className="w-[250px] md:w-[360px] bg-blue-100 rounded-full shadow"
          />
        </div>
      </div>
      <SignIn
        isSignInOpen={isSignInOpen}
        setIsSignInOpen={setIsSignInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <SignUp
        isSignUpOpen={isSignUpOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        setIsSignInOpen={setIsSignInOpen}
      />
      <UploadResume
        isUploadModalOpen={isUploadModalOpen}
        setIsUploadModalOpen={setIsUploadModalOpen}
      />
    </div>
  );
};

export default Home;
