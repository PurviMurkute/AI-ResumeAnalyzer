import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useRegister } from "../api/auth.mutations";

const SignUp = ({ isSignUpOpen, setIsSignUpOpen, setIsSignInOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const register = useRegister(setIsSignUpOpen);

  const handleSignUp = () => {
    const userData = {
      username: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    register.mutate(userData);
  };

  return (
    <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="border border-blue-300 rounded-md px-5 py-6 md:py-7 flex flex-col"
      >
        <Input
          type={"text"}
          placeholder={"Full Name"}
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
          }}
        />
        <Input
          type={"email"}
          placeholder={"Email"}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <Input
          type={`${passwordVisible ? "text" : "password"}`}
          placeholder={"Password"}
          value={formData.password}
          isPasswordInput={true}
          passwordVisible={passwordVisible}
          setPasswordVisible={setPasswordVisible}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
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
            onclick={handleSignUp}
          />
        </div>
        <div className="flex items-center w-[90%] mx-auto my-2">
          <div className="h-[0.5px] flex-1 bg-gray-500" />
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="h-[0.5px] flex-1 bg-gray-500" />
        </div>
        <Button
          text={"Sign in with Google"}
          variant={"secondary"}
          icon={"google"}
          onclick={() => {
            window.open(
              `${import.meta.env.VITE_SERVER_URL}/auth/google`,
              "_self",
            );
          }}
        />
      </form>
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
  );
};

export default SignUp;
