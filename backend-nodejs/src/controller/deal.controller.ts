import { type Request, type Response } from "express";
import { Types } from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import * as dealService from "../services/deal.service";
import { CreateDealInput } from "../validations/deal.validation";
import { HTTPSTATUS } from "../config/http-status.config";

export const createDealController = asyncHandler(
  async (req: Request, res: Response) => {
    const dealData: CreateDealInput = req.body;
    const deal = await dealService.createDealService(dealData);
    res.status(HTTPSTATUS.CREATED).json({
      message: "Deal created successfully",
      data: deal,
    });
  }
);

export const getDealsController = asyncHandler(
  async (req: Request, res: Response) => {
    const deals = await dealService.getDealsService();
    res.status(HTTPSTATUS.OK).json({
      message: "Deals retrieved successfully",
      data: deals,
    });
  }
);

export const getDealByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const dealId = new Types.ObjectId(req.params.id);
    const deal = await dealService.getDealByIdService(dealId);
    res.status(HTTPSTATUS.OK).json({
      message: "Deal retrieved successfully",
      data: deal,
    });
  }
);
