import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useRegister } from "../api/auth.mutations";
import { Toaster } from "react-hot-toast";

const SignUp = ({ isSignUpOpen, setIsSignUpOpen, setIsSignInOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const register = useRegister();

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
          name="fullName"
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
          }}
        />
        <Input
          type={"email"}
          placeholder={"Email"}
          value={formData.email}
          name="email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <Input
          type={"password"}
          placeholder={"Password"}
          value={formData.password}
          name="password"
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
      </form>
      <Toaster />
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
