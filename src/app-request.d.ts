import { Request } from "express";
import User from "./models/User";

declare interface ProtectedRequest extends Request {
  user: User;
}
