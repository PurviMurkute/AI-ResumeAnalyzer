import { useLocation } from "react-router";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useAnalyseResume } from "../api/resumeAnalyse.mutations";
import { useEffect } from "react";

const Dashboard = () => {
  const location = useLocation();
  const { file, jobDescription, isAnalyzing } = location.state || {};

  const {
    mutate: analyzeResume,
    data,
    isPending,
  } = useAnalyseResume();

  console.log('data: ', data?.data);

  useEffect(() => {
    if (isAnalyzing && file) {
      analyzeResume({ file, jobDescription });
    }
  }, []);

  const atsPercent = (data?.data?.score / 10) * 100 || 0;
  const resumeUrl = data?.data?.resume || null;

  return (
    <div>
      <Header />
      {isPending ? (
        <div className="flex justify-center items-center h-screen">
          <motion.div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="mt-20 p-5">
          {/* <h2 className="text-2xl font-bold mb-4">Resume Analysis Result</h2> */}
          <div className="flex flex-col md:flex-row items-start gap-30">
            <div className="w-full md:w-[40%] h-[500px] md:h-[600px] lg:h-[800px]">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(resumeUrl)}&embedded=true`}
                className="w-full h-full rounded-lg border"
              />
            </div>
            <div>
              <motion.div
                initial={{
                  background: `conic-gradient(#3b82f6 0%, #e5e7eb 0%)`,
                }}
                animate={{
                  background: `conic-gradient(#3b82f6 ${atsPercent}%, #e5e7eb ${atsPercent}%)`,
                }}
                transition={{ duration: 1 }}
                className="w-40 h-40 rounded-full flex items-center justify-center"
              >
                <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    <span className="text-6xl">{data?.data?.score}</span>/10
                  </span>
                </div>
              </motion.div>
              <div className="border border-gray-400 rounded-lg mt-5 p-2">
                <h2 className="text-xl font-bold p-2">Strengths</h2>
                {data?.data?.analysisResult?.strengths?.map(
                  (strength, index) => (
                    <div key={index} className="p-2 rounded">
                      <ul className="list-disc list-inside">
                        <li className="text-green-800">{strength}</li>
                      </ul>
                    </div>
                  ),
                )}
              </div>
              <div className="border border-gray-400 rounded-lg mt-5 p-2">
                <h2 className="text-xl font-bold p-2">Suggestions</h2>
                {data?.data?.analysisResult?.suggestions?.map(
                  (strength, index) => (
                    <div key={index} className="p-2 rounded">
                      <ul className="list-disc list-inside">
                        <li className="text-green-800">{strength}</li>
                      </ul>
                    </div>
                  ),
                )}
              </div>
              <div className="border border-gray-400 rounded-lg mt-5 p-2">
                <h2 className="text-xl font-bold p-2">Weaknesses</h2>
                {data?.data?.analysisResult?.weaknesses?.map(
                  (strength, index) => (
                    <div key={index} className="p-2 rounded">
                      <ul className="list-disc list-inside">
                        <li className="text-green-800">{strength}</li>
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
