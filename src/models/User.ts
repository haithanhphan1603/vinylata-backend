import mongoose, { Schema } from "mongoose";
import { Role } from "./Role";
import bcrypt from "bcrypt";

export default interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (pw: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      select: false,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      select: false,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    dateOfJoining: {
      type: Schema.Types.Date,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre<User>("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<User>("User", userSchema, "users");
