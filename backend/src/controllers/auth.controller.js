import userModel from "../models/user.model.js";
import * as authValidation from "../validation/auth.validation.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  try {
    const { error, value } = authValidation.validationForRegister.validate(
      req.body,
    );
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let { username, email, password } = value;
    let isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "user already exist",
      });
    }
    let hash = await bcryptjs.hash(password, 10);

    let newUser = await userModel.create({
      username,
      email,
      password: hash,
    });
    let token = jwt.sign({ id: newUser._id }, process.env.JWT_URI);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(201).json({
      success: true,
      message: "New user added",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { error, value } = authValidation.validationForLogin.validate(
      req.body,
    );
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    let { username, email, password } = value;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    let isPassValid = await bcryptjs.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({
        success: false,
        message: "password does not matched",
      });
    }
    let token = jwt.sign({ id: user._id }, process.env.JWT_URI);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function logoutUser(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
}

export { registerUser, loginUser, logoutUser };
