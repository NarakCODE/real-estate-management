import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createReviewService,
  getReviewsService,
  updateReviewService,
  deleteReviewService,
} from "../services/review.service";

import {
  CreateReviewInput,
  UpdateReviewInput,
} from "../validations/review.validation";
import { HTTPSTATUS } from "../config/http-status.config";
import { UnauthorizedException } from "../utils/appError";

export const createReviewController = asyncHandler(
  async (req: Request, res: Response) => {
    const authorId = (req.session as any).user._id;
    const reviewData: CreateReviewInput = req.body;
    const review = await createReviewService(reviewData, authorId);
    res.status(HTTPSTATUS.CREATED).json({
      message: "Review created successfully",
      data: review,
    });
  }
);

export const getReviewsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { propertyId, agentId } = req.query;
    const reviews = await getReviewsService({
      propertyId: propertyId as string | undefined,
      agentId: agentId as string | undefined,
    });
    res.status(HTTPSTATUS.OK).json({
      message: "Reviews fetched successfully",
      data: reviews,
    });
  }
);

export const updateReviewController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const reviewId = new Types.ObjectId(req.params.id);
    const updateData: UpdateReviewInput = req.body;
    const updatedReview = await updateReviewService(
      reviewId,
      updateData,
      sessionUser
    );
    res.status(HTTPSTATUS.OK).json({
      message: "Review updated successfully",
      data: updatedReview,
    });
  }
);

export const deleteReviewController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    if (!sessionUser) throw new UnauthorizedException("Not authorized");

    const reviewId = new Types.ObjectId(req.params.id);
    const result = await deleteReviewService(reviewId, sessionUser);
    res.status(HTTPSTATUS.OK).json(result);
  }
);
