import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useAnalyseResume } from "../api/resumeAnalyse.mutations";
import { useNavigate } from "react-router";

const UploadResume = ({ isUploadModalOpen, setIsUploadModalOpen }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const {mutate: analyzeResume, isPending: isAnalyzeLoading} = useAnalyseResume();

  const handleAnalyze = () => {
    analyzeResume({ file, jobDescription });
  };

  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isUploadModalOpen}
      onClose={() => setIsUploadModalOpen(false)}
    >
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          type={"file"}
          onChange={(e) => setFile(e.target.files[0])}
          textInfo={"Only PDF files are allowed • Max size: 5MB"}
        />
        <Input
          type={"textarea"}
          placeholder={"Job Description (Optional)"}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="flex justify-center gap-3 items-center w-full mt-4">
          <Button
            text={"Cancel"}
            variant={"tertiary"}
            width={"flex-1"}
            onclick={() => setIsUploadModalOpen(false)}
          />
          <Button
            text={"Analyze"}
            variant={"primary"}
            width={"flex-1"}
            disabled={!file || isAnalyzeLoading}
            loading={isAnalyzeLoading}
            onclick={() => {
  navigate("/dashboard", {
    state: { isAnalyzing: true, file, jobDescription },
  });
}}
          />
        </div>
      </form>
    </Modal>
  );
};

export default UploadResume;
