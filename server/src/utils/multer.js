import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file);

  const allowedTypes = ["application/pdf", "application/msword"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only PDF and Word documents are allowed"), false);
  } else if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    return cb(new Error("File size exceeds 5MB limit"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
