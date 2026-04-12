import expess from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const authRouter = expess.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

export default authRouter;