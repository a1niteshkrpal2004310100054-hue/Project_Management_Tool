import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookie("accessToken");

  if (!token) {
    return res.status(401).json({ messsage: "Unauthorized - No Token" });
  }

  try {
    const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user(decode);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid token" });
  }
};
