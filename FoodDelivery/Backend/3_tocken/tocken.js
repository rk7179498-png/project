import jwt from "jsonwebtoken";

export const gennerttoken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in env");
  }

  return jwt.sign({ id },process.env.JWT_SECRET,{ expiresIn: "7d" });
};
