import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import generateToken from "../jwt/jwtToken.js";
import User from "../model/userModel.js";

const login = async (req, res) => {
  try {
    const { token } = req.body;

    // 1. Check Firebase token
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // 2. Verify Firebase ID Token
    const auth = getAuth(app);

    const decoded = await auth.verifyIdToken(token);

    console.log("Firebase UID:", decoded.uid);

    // 3. Find existing user
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    // 4. Create user if not exists
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "",
        email: decoded.email,
        avatar: decoded.picture || "",
      });
    }

    // 5. Generate JWT
    const jwtToken = generateToken(user._id);

    // 6. Store JWT in HTTP-only cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Login Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default login;