import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useRegister = (setIsSignUpOpen) => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        userData,
      );
      return response.data;
    },

    onSuccess: (response) => {
      console.log("Sign up successful");
      toast.success(response.message || "Sign up successful");
      setTimeout(() => {
        setIsSignUpOpen(false);
      }, 500);
    },

    onError: (error) => {
      console.error(
        "Sign up failed:",
        error.response?.data?.errors || error.message,
      );
      alert(error.response?.data?.message || "Sign up failed");
    },
  });
};

export const useLogin = (setIsSignInOpen, setSignInFormData) => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        userData,
      );
      return response.data;
    },

    onSuccess: (response) => {
      login(response.data, response.token);
      setSignInFormData({
        email: "",
        password: "",
      });
      setTimeout(() => {
        setIsSignInOpen(false);
      }, 1000);
    },

    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    },
  });
};
