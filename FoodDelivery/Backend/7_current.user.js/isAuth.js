import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({ path: ".env" });
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "jwt secret not found" }); //is secret key 
    }

    req.userId = decoded.id;  // id token se aaya hai
    next();  //next function
  } catch (error) {
    return res.status(401).json({ message: `Invalid token ${error}` });
  }
};
 export default isAuth