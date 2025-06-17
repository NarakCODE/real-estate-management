import mongoose, { type Document, Schema, Types } from "mongoose";

export interface IAmenity extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  iconUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AmenitySchema = new Schema<IAmenity>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    iconUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

const AmenityModel = mongoose.model<IAmenity>("Amenity", AmenitySchema);
export default AmenityModel;
