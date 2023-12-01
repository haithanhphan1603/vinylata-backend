import { Schema, model, Document } from "mongoose";

export const enum RoleCode {
  ADMIN = "admin",
  USER = "user",
  VENDOR = "vendor",
}

export interface Role extends Document {
  code: string;
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.ADMIN, RoleCode.USER, RoleCode.VENDOR],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now(),
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

schema.pre<Role>("save", function (next) {
  const currentDate = new Date();

  // Set updatedAt and createdAt if they don't exist
  this.updatedAt = currentDate;
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

export const RoleModel = model<Role>("Role", schema, "roles");
