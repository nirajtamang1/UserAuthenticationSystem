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
    res.status(500).json({ error: error.message });
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
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");

    res.status(200).send({
      success: true,
      message: "Get User Profile Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, email, password } = req.body;
    const user = await userModel.findById(userId);
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        phone: phone || user.phone,
        email: email || user.email,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Update User Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
