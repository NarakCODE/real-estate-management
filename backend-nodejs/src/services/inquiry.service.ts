import { Types } from "mongoose";
import InquiryModel, { IInquiry } from "../models/inquiry.model";
import PropertyModel from "../models/property.model";
import { NotFoundException } from "../utils/appError";

export const createInquiryService = async (
  inquiryData: Partial<IInquiry>,
  userId?: Types.ObjectId
) => {
  const property = await PropertyModel.findById(inquiryData.propertyId);
  if (!property) {
    throw new NotFoundException("Property not found");
  }

  const inquiry = new InquiryModel({
    ...inquiryData,
    userId,
  });
  return await inquiry.save();
};

export const getInquiriesService = async (userId: Types.ObjectId) => {
  return await InquiryModel.find({ userId });
};

export const deleteInquiryService = async (inquiryId: Types.ObjectId) => {
  const inquiry = await InquiryModel.findById(inquiryId);
  if (!inquiry) {
    throw new NotFoundException("Inquiry not found");
  }
  await InquiryModel.findByIdAndDelete(inquiryId);
  return { message: "Inquiry deleted successfully" };
};

export const getInquiryByIdService = async (inquiryId: string) => {
  const inquiry = await InquiryModel.findById(inquiryId);

  if (!inquiry) {
    throw new NotFoundException("Inquiry not found");
  }
  return inquiry;
};
