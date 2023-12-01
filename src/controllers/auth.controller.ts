import { handleAsync } from "../utils/handleAsync";
import User, { UserModel } from "../models/User";
import { Request, Response } from "express";
import { RoleModel } from "../models/Role";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { RoleCode } from "../models/Role";

const createToken = function (id: mongoose.Types.ObjectId) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = function (user: User, statusCode: number, res: Response) {
  const token = createToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  });
  user.password = "";
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

const signUp = handleAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(400).json({
      status: "Failed",
      message: "User already exists",
    });
  }
  const role = await RoleModel.findOne({ code: RoleCode.USER });
  const now = new Date();
  const newUser = await UserModel.create({
    email,
    password,
    name,
    roles: role?._id,
    createdAt: now,
    updatedAt: now,
    dateOfJoining: now,
  });
  sendToken(newUser, 201, res);
});

const signIn = handleAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid email or password",
    });
  } else {
    sendToken(user, 200, res);
  }
});

const authController = {
  signUp,
  signIn,
};
export default authController;
