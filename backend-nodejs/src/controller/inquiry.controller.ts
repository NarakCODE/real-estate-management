import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { HTTPSTATUS } from "../config/http-status.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import * as inquiryService from "../services/inquiry.service";

export const createInquiryController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const userId = new Types.ObjectId(String(sessionUser._id));

    await inquiryService.createInquiryService(req.body, userId);

    res.status(HTTPSTATUS.CREATED).json({
      message: "Inquiry submitted successfully",
    });
  }
);

export const getInquiriesController = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionUser = (req.session as any).user;
    const userId = new Types.ObjectId(String(sessionUser._id));

    const inquiries = await inquiryService.getInquiriesService(userId);

    res.status(HTTPSTATUS.OK).json({
      message: "Retrieved successfully",
      data: inquiries,
    });
  }
);

export const deleteInquiryController = asyncHandler(
  async (req: Request, res: Response) => {
    const inquiryId = req.params.inquiryId;
    await inquiryService.deleteInquiryService(
      new Types.ObjectId(String(inquiryId))
    );

    res.status(HTTPSTATUS.OK).json({
      message: "Deleted successfully",
    });
  }
);

export const getInquiryByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const inquiryId = req.params.inquiryId;
    const inquiry = await inquiryService.getInquiryByIdService(inquiryId);

    res.status(HTTPSTATUS.OK).json({
      message: "Retrieved successfully",
      data: inquiry,
    });
  }
);
