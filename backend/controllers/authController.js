import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

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
