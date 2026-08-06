import express from "express";
import { signup } from "../4_user/signup.js";
import { login } from "../4_user/login.js";
import Logout from "../4_user/logout.js";
import { resetPassword, sendOtp, verifiedOtp } from "../6.5_nodemailer/passwordReset.js";

import googleAuth from "../6_firbase/firbasr.GoogleAuth.js";


const router = express.Router();

// User Authentication
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", Logout);

// Google Authentication
router.post("/google-auth", googleAuth);

// Password Reset
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifiedOtp);
router.post("/reset-pass", resetPassword);

export default router;
