import User from "../2_schema/schema.js";

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "UserId not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({success: true,user,});
  } catch (error) {
    return res.status(500).json({ message: `Get current user error ${error}` });
  }
};
export  default getCurrentUser
