import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface IUser extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (
  this: IUserModel,
  { email, password },
) {
  if (!email || !password) throw new Error("Both fields are required.");
  if (!validator.isEmail(email)) throw new Error("Invalid email.");
  if (!validator.isStrongPassword(password))
    throw new Error("Password not strong enough.");

  const exists = await this.findOne({ email });
  if (exists) throw new Error("Email already in use!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (
  this: IUserModel,
  email: string,
  password: string,
) {
  if (!email || !password) throw new Error("All fields must be filled!");

  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found.");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect password");

  return user;
};

const User = mongoose.model<IUser, IUserModel>("Users", userSchema);
export default User;
