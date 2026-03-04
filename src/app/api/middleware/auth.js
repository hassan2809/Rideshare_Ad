import jwt from "jsonwebtoken";
import User from "../models/User";
import { connectDB } from "../startup/mongodb";
import { ApiError } from "../utils/ApiError";

export default async function auth(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError("Access denied. No token provided.", 401);
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    await connectDB();
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError("Invalid user.", 401);
    }

    return user;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new ApiError("Invalid token.", 400);
    }
    throw err; // unexpected error
  }
}
