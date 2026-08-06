import User from "../2_schema/schema.js";
import { gennerttoken } from "../3_tocken/tocken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;
    const exist = await User.findOne({ email });
    
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(password.length<8){
      return res.status(201).json({message:"password must be 8 digit"})
    }
    //  if(mobile.length==10){
    //   return res.status(201).json({message:"Mobile number must be 10 digit"})
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });
    const token = gennerttoken(newUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
  
    return res.status(500).json({message: `signup error ${error}`});
  }
};
