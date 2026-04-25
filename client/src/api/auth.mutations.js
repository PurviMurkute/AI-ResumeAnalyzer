import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useRegister = () => {
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
    },

    onError: (error) => {
      console.error("Sign up failed:", error.response?.data?.errors || error.message);
      alert(error.response?.data?.message || "Sign up failed");
    },
  });
};