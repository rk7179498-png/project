const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,      // agar https use kar rahe ho
      sameSite: "none"   // frontend alag origin par hai to
    });

    return res.status(200).json({message: "Logout successful"});

  } catch (error) {
   
    return res.status(500).json({ message: "Logout failed" });
  }
};

export default Logout;
