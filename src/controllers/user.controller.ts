import { Request, Response } from "express";
import { handleAsync } from "../utils/handleAsync";
import User, { UserModel } from "../models/User";

const getAllUsers = handleAsync(async (req: Request, res: Response) => {
  const users = await UserModel.find().populate("roles");
  res.status(200).json({
    status: "Success",
    data: {
      data: users,
    },
  });
});

const getUserById = handleAsync(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    data: {
      data: user,
    },
  });
});

const userController = {
  getAllUsers,
  getUserById,
};

export default userController;
