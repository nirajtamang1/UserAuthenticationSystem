import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//Sign Up User
export const signUpController = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    // // check user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    // save the user information
    const user = await userModel({
      name,
      phone,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User sign up Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res
        .status(500)
        .send({ message: "Please enter email and password." });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Invalid Email",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User Login successfully",
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
