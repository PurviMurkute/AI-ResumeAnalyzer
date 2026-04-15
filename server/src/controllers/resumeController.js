const analyzeResume = async (req, res) => {
  try {
    const { file } = req.file ? req : { file: null };
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: {
        file,
      },
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { analyzeResume };
