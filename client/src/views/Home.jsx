import React from "react";
import Header from "../components/Header";
import homeImage from "../assets/homeImg.png";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center align-middle">
      <Header />
      <div className="gap-10 w-[80%] mx-auto flex flex-col md:flex-row justify-center items-center align-middle">
        <div className="w-['30%'] mt-20">
          <h1 className="text-4xl font-bold text-gray-600">
            We Analyze Your Resume, You Land Your Dream Job!!!
          </h1>
          <h4 className="text-lg mt-5 text-gray-600 font-medium">
            Analyze Your Resume with AI
          </h4>
          <h3 className="text-md mt-4 text-gray-500 font-medium">
            Get ATS score, keyword insights & job match instantly
          </h3>
          <div className="mt-6">
            <Button text="Get Started" variant={'primary'} width={'170'} />
          </div>
        </div>
        <div className="w-['50%'] mt-10 bg-blue-50 rounded-full shadow p-3">
          <img
            src={homeImage}
            alt="home"
            className="w-[400px] md:w-[500px] bg-blue-100 rounded-full shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
