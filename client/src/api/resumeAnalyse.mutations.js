import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAnalyseResume = () => {
  return useMutation({
    mutationFn: async ({ file, jobDescription }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/resume/analyze`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        },
      );

      return response.data;
    },

    onSuccess: (response) => {
      toast.success(response.message || "Resume analysis successful");
    },

    onError: (error) => {
      console.error(
        "Resume analysis failed:",
        error.response?.data?.errors || error.message,
      );
      alert(error.response?.data?.message || "Resume analysis failed");
    },
  });
};
