import expess from 'express';
import { registerUser } from '../controllers/authController.js';

const authRouter = expess.Router();

authRouter.post("/register", registerUser);

export default authRouter;