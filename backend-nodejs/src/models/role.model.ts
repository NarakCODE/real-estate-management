import mongoose, { type Document, Schema, Types } from "mongoose";
import "./permission.model";

export interface IRole extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  permissions: Types.ObjectId[];
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
export default RoleModel;
