import User from "../models/user-schema";
import jwt from "jsonwebtoken";

// CREATE JWT TOKEN
const createToken = (_id: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("Secret not defined.");

  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

//  LOGIN USER
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// REGISTER USER
export const registerUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.register({ email, password });

    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
