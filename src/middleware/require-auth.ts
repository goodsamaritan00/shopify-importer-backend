import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user-schema";

const requireAuth = async (req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  if (!secret) {
    throw new Error("Secret not defined.");
  }

  // Split 'Bearer' and token
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const { _id } = decoded;

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not authorized." });
  }
};

export default requireAuth;
