import mongoose, { type Document, Schema, Types } from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  roleId: Types.ObjectId;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  omitPassword(): Omit<IUser, "password">;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    phone: { type: String },
    avatarUrl: { type: String, default: null },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);

/** Hash the password before saving it to the database.
 * This is done to prevent passwords from being stored in plain text.
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

/**
 * Omit the password field from the user object.
 * This is done to prevent passwords from being sent over the network.
 * @returns {Omit<UserDocument, 'password'>} - The user object without the password field.
 */
UserSchema.methods.omitPassword = function (): Omit<IUser, "password"> {
  const user = this.toObject();
  delete user.password;
  return user;
};

/**
 * Compare the given password with the user's password.
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
 */
UserSchema.methods.comparePassword = async function (password: string) {
  return await comparePassword(password, this.password);
};

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
