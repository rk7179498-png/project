import User from "../2_schema/schema.js";
import { gennerttoken } from "../3_tocken/tocken.js";
const googleAuth = async (req, res) => {
  //look like a signup user
  try {
    const { name, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, mobile, role });
    }
    const tocken = gennerttoken(user._id);
    res.cookie("tocken", tocken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ success: true, message: "Signup successful", 
    user:{name: user.name, email: user.email,role: user.role} });
  } catch (error) {
    return res.status(500).json({message: `googleauth Error ${error}`});
  }
};
export default googleAuth
