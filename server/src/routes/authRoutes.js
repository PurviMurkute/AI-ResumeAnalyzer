import expess from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import verifyJwt from "../middlewares/jwt.js";

const authRouter = expess.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    try {
      const jwtToken = jwt.sign(
        { _id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.redirect(
        `${process.env.CLIENT_URL}/google-success?token=${jwtToken}`,
      );
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  },
);

authRouter.get("/current-user", verifyJwt, getCurrentUser);

export default authRouter;
