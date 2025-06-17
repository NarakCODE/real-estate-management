import mongoose, { type Document, Schema, Types } from "mongoose";
import { INQUIRY_STATUS, type InquiryStatusType } from "../enums/inquiry.enum";

export interface IInquiry extends Document {
  userId?: Types.ObjectId; // Can be null if inquiry is from a guest
  propertyId: Types.ObjectId;
  name?: string; // Guest's name if userId is null
  email?: string; // Guest's email if userId is null
  message: string;
  status: InquiryStatusType;
}

const InquirySchema = new Schema<IInquiry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: INQUIRY_STATUS,
      default: "New",
      required: true,
    },
  },
  { timestamps: true }
);

const InquiryModel = mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default InquiryModel;
