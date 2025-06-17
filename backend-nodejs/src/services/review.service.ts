import { Types } from "mongoose";
import ReviewModel from "../models/review.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";
import {
  CreateReviewInput,
  UpdateReviewInput,
} from "../validations/review.validation";
import UserModel from "../models/user.model";
import PropertyModel from "../models/property.model";
import RoleModel from "../models/role.model";

type SessionUser = { _id: Types.ObjectId; roleId: Types.ObjectId };

export const createReviewService = async (
  reviewData: CreateReviewInput,
  authorId: Types.ObjectId
) => {
  const { propertyId, agentId } = reviewData;

  if (propertyId) {
    const propertyExists = await PropertyModel.findById(propertyId);
    if (!propertyExists) throw new NotFoundException("Property not found.");
  }

  if (agentId) {
    const agentExists = await UserModel.findById(agentId);
    if (!agentExists) throw new NotFoundException("Agent not found.");
  }

  const review = new ReviewModel({ ...reviewData, authorId });
  await review.save();
  return review;
};

export const getReviewsService = async (filters: {
  propertyId?: string;
  agentId?: string;
}) => {
  const query: any = {};
  if (filters.propertyId) {
    query.propertyId = filters.propertyId;
  }
  if (filters.agentId) {
    query.agentId = filters.agentId;
  }

  const reviews = await ReviewModel.find(query)
    .populate("authorId", "name avatarUrl -password roleId")
    .sort({ createdAt: -1 });

  return reviews;
};

export const updateReviewService = async (
  reviewId: Types.ObjectId,
  updateData: UpdateReviewInput,
  sessionUser: SessionUser
) => {
  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw new NotFoundException("Review not found.");
  }

  if (review.authorId.toString() !== sessionUser._id.toString()) {
    throw new UnauthorizedException(
      "You are not authorized to update this review."
    );
  }

  Object.assign(review, updateData);
  await review.save();
  return review;
};

export const deleteReviewService = async (
  reviewId: Types.ObjectId,
  sessionUser: SessionUser
) => {
  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw new NotFoundException("Review not found.");
  }

  const userRole = await RoleModel.findById(sessionUser.roleId);

  if (
    review.authorId.toString() !== sessionUser._id.toString() &&
    userRole?.name !== "Admin"
  ) {
    throw new UnauthorizedException(
      "You are not authorized to delete this review."
    );
  }

  await ReviewModel.findByIdAndDelete(reviewId);
  return { message: "Review deleted successfully." };
};
