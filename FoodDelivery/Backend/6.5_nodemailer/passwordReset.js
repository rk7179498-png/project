import User from "../2_schema/schema.js";
import { sendOtpMail } from "./mail.js";
import bcrypt from "bcrypt";
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ massage: "user does't exsit." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //otp generate
    user.resetOtp = otp; //put otp generate in resetotp
    user.otpVarified = false;
    user.otpExpires = Date.now() + 1 * 60 * 1000; //expired 5 min
    await user.save();
    await sendOtpMail(email, otp); //jo email aaya ushka otp sendotpmail par send kar diya
    return res.status(200).json({ massage: "otp sent successfull" });
  } catch (error) {
    return res.status(500).json({ massage: `send otp error${error}` });
  }
};

export const verifiedOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ massage: "Invalide/expired otp." });
    }
    user.otpVarified = true;
    user.otpExpires = undefined;
    user.resetOtp = undefined;
    await user.save();
    return res.status(200).json({ massage: "otp verify successfull" });
  } catch (error) {
    return res.status(500).json({ massage: `otp verify error${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.otpVarified) {
      return res.status(400).json({ massage: "otp verification required." });
    }
    const hashpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashpassword;
    user.otpVarified = false;
    await user.save();
    return res.status(200).json({ massage: "password Reset successfull" });
  } catch (error) {
    return res.status(500).json({ massage: `Reset password error${error}` });
  }
};
