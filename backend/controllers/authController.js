import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

//Sign Up User
export const signUpController = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword } = req.body;
    console.log(req.body);

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!confirmPassword) {
      return res.send({ message: "Confirmed Password is required" });
    }
    if (password != confirmPassword) {
      return res.send({
        message: "Password and confirmed password must be same",
      });
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
      message: "Update User Profile Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "User Profile in not update" });
  }
};

export const deleteProfileController = async (req, res) => {
  try {
    const userId = req.userId;
    await userModel.deleteOne({ _id: userId });
    res.status(201).json({
      success: true,
      message: "Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });
    console.log(oldUser);
    if (!oldUser) {
      return res.status(200).json({ message: "User not found!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = JWT.sign({ id: oldUser._id, email: oldUser.email }, secret, {
      expiresIn: "5m",
    });
    const link = `${process.env.FRONTEND_URL}/reset_password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "waibanitaj222@gmail.com",
        pass: "qjmv xkpb kuhi ribg",
      },
    });

    var mailOptions = {
      from: "Niraj Tamang <waibanitaj222@gmail.com>",
      to: oldUser.email,
      subject: "Password Reset",
      html: `
        <p>Hello ${oldUser.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${link}">${link}</a>
        <p>This email link is only valid for 5 minutes</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log({ Status: "Success", "Email sent: ": info.response });
      }
    });
    res.status(200).send({
      success: true,
      message: "Please check your mail for reset password link!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while sending the email",
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await userModel.findOne({ _id: id });
  if (!oldUser) {
    return res.send({ status: "User doesnot Exists" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    JWT.verify(token, secret, async (err) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        const hashedPassword = await hashPassword(password);
        await userModel.updateOne(
          { _id: id },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );

        return res.send({ Status: "Successs" });
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Not verified",
    });
  }
};

export const allUserController = async (req, res) => {
  try {
    // console.log("Successfully");
    const user = await userModel.find({ role: 0 });
    res.status(200).send({
      success: true,
      message: "All User",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Displaying all User Information",
      error,
    });
  }
};
