import { User } from "../Models/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "Please enter all fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, password: hashedPassword });
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "Please enter all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect email or password" });
    }

    return res
      .status(200)
      .json({ success: true, message: `Welcome ${user.fullname}` });
  } catch (error) {}
};
