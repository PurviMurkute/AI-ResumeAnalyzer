import React from "react";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

const SignIn = ({ isSignInOpen, setIsSignInOpen, setIsSignUpOpen }) => {
  return (
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
          <Button text={"Sign In"} variant={"primary"} width={"flex-1"} />
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
  );
};

export default SignIn;
