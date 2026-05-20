import React, { useContext, useState } from "react";
import Header from "../components/Header";
import homeImage from "../assets/homeImg.png";
import Button from "../components/Button";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import UploadResume from "../components/UploadResume";
import featuresConfig from "../config/featuresConfig";
import FeatureCard from "../components/Features";
import Footer from "../components/Footer";
import workflowConfig from "../config/workflowConfig";
import WorkflowCard from "../components/WorkflowCard";

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Header
        setIsSignInOpen={setIsSignInOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <div
        className="bg-white min-h-screen flex flex-col justify-center items-center align-middle"
        name="home"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* LEFT CONTENT */}
            <div className="mt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-100 bg-cyan-50 mb-7">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>

                <p className="text-sm font-semibold text-cyan-700 tracking-wide">
                  AI Resume Analyzer
                </p>
              </div>
              <h1 className="text-3xl md:text-[44px] font-extrabold text-gray-700">
                Improve Your Resume With{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Analysis
              </h1>

              <p className="mt-4 text-gray-600 text-[16px] leading-8 max-w-lg">
                Get ATS score, keyword insights, skill-gap detection, and
                actionable AI suggestions to make your resume stronger and
                increase interview chances.
              </p>

              <div className="mt-4">
                {!user ? (
                  <Button
                    text="Get Started"
                    variant={"primary"}
                    icon={"start"}
                    textSize={"text-sm md:text-md"}
                    width={"180"}
                    onclick={() => {
                      if (!user) {
                        setIsSignUpOpen(true);
                      } else {
                        navigate("/dashboard");
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-wrap items-center gap-4">
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
                      text="Dashboard"
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

              <div className="mt-10 flex items-center gap-8 flex-wrap">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">95%</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Faster Resume Review
                  </p>
                </div>

                <div className="h-10 w-[1px] bg-gray-200"></div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Instant</h3>
                  <p className="text-sm text-gray-500 mt-1">AI Feedback</p>
                </div>

                <div className="h-10 w-[1px] bg-gray-200"></div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Smart</h3>
                  <p className="text-sm text-gray-500 mt-1">Resume Insights</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className=" bg-blue-50 rounded-full shadow p-6 md:mt-10">
                <img
                  src={homeImage}
                  alt="home"
                  className="w-[250px] md:w-[370px] bg-blue-100 rounded-full shadow"
                />
              </div>
            </div>
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
      <div className="mb-10" name="features">
        <div className="text-center mb-8">
          <p className="text-cyan-600 font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Powerful Features
          </p>

          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            Everything You Need To Create a{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Job-Winning Resume
            </span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg leading-8">
            AI tool designed to optimize resumes, improve ATS performance, and
            increase interview opportunities.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center mx-4 md:mx-20">
          {featuresConfig.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>

      <section className="py-8" name="how-it-works">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-cyan-600 font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Simple Workflow
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              How HireLens Helps You Build a{" "}
              <span className="text-cyan-600">Better Resume</span>
            </h2>

            <p className="mt-6 text-gray-600 text-md md:text-lg leading-8">
              Upload your resume, let AI analyze it, and receive instant
              ATS-focused insights and improvements in just a few steps.
            </p>
          </div>

          <div className="space-y-8">
            {workflowConfig.map((item, index) => (
              <WorkflowCard
                key={index}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
