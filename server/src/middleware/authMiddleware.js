import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = await req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized or no token" });
  }
  if (!token) {
    return res.status(401).json({ messsage: "Unauthorized - No Token" });
  }

  const authToken = token.split(" ")[1];

  try {
    const decode = jwt.verify(authToken, ACCESS_TOKEN_SECRET);
    req.user(decode);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid token" });
  }
};
