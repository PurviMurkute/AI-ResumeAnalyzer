import React, { useState } from "react";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { useLogin } from "../api/auth.mutations";

const SignIn = ({ isSignInOpen, setIsSignInOpen, setIsSignUpOpen }) => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnClose = () => {
    setIsSignInOpen(false);
    setSignInFormData({
      email: "",
      password: "",
    });
  };

  const login = useLogin(setIsSignInOpen, setSignInFormData);

  const handleSignIn = () => {
    const userData = {
      email: signInFormData.email,
      password: signInFormData.password,
    };
    login.mutate(userData);
  };

  const [passVisible, setPassVisible] = useState(false);
  return (
    <Modal isOpen={isSignInOpen} onClose={handleOnClose}>
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="border border-blue-300 rounded-md px-5 py-6 md:py-7 flex flex-col gap-4"
      >
        <Input
          type={"email"}
          placeholder={"Email"}
          value={signInFormData.email}
          onChange={(e) => {
            setSignInFormData({ ...signInFormData, email: e.target.value });
          }}
        />
        <Input
          type={`${passVisible ? "text" : "password"}`}
          placeholder={"Password"}
          isPasswordInput={true}
          passwordVisible={passVisible}
          setPasswordVisible={setPassVisible}
          value={signInFormData.password}
          onChange={(e) => {
            setSignInFormData({ ...signInFormData, password: e.target.value });
          }}
        />
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
            onclick={handleSignIn}
          />
        </div>
      </form>
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
