import React, { useState } from "react";
import Header from "../components/Header";
import homeImage from "../assets/homeImg.png";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
            <Button
              text="Get Started"
              variant={"primary"}
              icon={"start"}
              textSize={"text-sm md:text-md"}
              width={"170"}
              onclick={()=>{setIsSignUpOpen(true)}}
            />
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
      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <div className="border border-blue-300 rounded-md px-5 py-6 md:py-7 flex flex-col gap-4">
          <Input type={"email"} placeholder={"Email"} />
          <Input type={"password"} placeholder={"Password"} />
          <div className="flex justify-center gap-3 items-center w-full mt-2">
            <Button
              text={"Cancel"}
              variant={"tertiary"}
              width={"flex-1"}
              onclick={() => setIsSignInOpen(false)}
            />
            <Button
              text={"Sign In"}
              variant={"primary"}
              width={"flex-1"}
            />
          </div>
        </div>
        <div className="text-gray-600 text-sm mt-3">
          Don't have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsSignInOpen(false);
              setIsSignUpOpen(true);
            }}
          >
            Sign Up
          </button>
        </div>
      </Modal>
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Sign Up</h2>
        <div className="border border-blue-300 rounded-md px-5 py-6 md:py-7 flex flex-col gap-4">
          <Input type={"text"} placeholder={"Full Name"} />
          <Input type={"email"} placeholder={"Email"} />
          <Input type={"password"} placeholder={"Password"} />
          <div className="flex justify-center gap-3 items-center w-full mt-2">
            <Button
              text={"Cancel"}
              variant={"tertiary"}
              width={"flex-1"}
              onclick={() => setIsSignUpOpen(false)}
            />
            <Button
              text={"Sign Up"}
              variant={"primary"}
              width={"flex-1"}
            />
          </div>
        </div>
        <div className="text-gray-600 text-sm mt-3">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsSignInOpen(true);
              setIsSignUpOpen(false);
            }}
          >
            Sign In
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
