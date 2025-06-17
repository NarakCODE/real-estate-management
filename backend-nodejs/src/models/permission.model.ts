import mongoose, { type Document, Schema } from "mongoose";

export interface IPermission extends Document {
    name: string;
    description?: string;
}

const PermissionSchema = new Schema<IPermission>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

const PermissionModel = mongoose.model<IPermission>(
    "Permission",
    PermissionSchema
);
export default PermissionModel;
