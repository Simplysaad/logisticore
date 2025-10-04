import { Router } from "express";

import { login, verifyOtp } from "../controllers/auth.controller";

const authRouter = Router();

// Login route - upsert user & generate OTP
authRouter.post("/login", login);

// Verify OTP route - validate OTP & issue JWT token
authRouter.post("/verify", verifyOtp);

export default authRouter;
