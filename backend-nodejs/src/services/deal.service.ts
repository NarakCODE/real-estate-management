import { Types } from "mongoose";
import DealModel from "../models/deal.model";
import { NotFoundException } from "../utils/appError";
import { CreateDealInput } from "../validations/deal.validation";
import PropertyModel from "../models/property.model";
import UserModel from "../models/user.model";

export const createDealService = async (dealData: CreateDealInput) => {
  const { propertyId, agentId, clientId, dealClosedAt } = dealData;

  const [property, agent, client] = await Promise.all([
    PropertyModel.findById(propertyId),
    UserModel.findById(agentId),
    UserModel.findById(clientId),
  ]);

  if (!property) throw new NotFoundException("Property not found.");
  if (!agent) throw new NotFoundException("Agent not found.");
  if (!client) throw new NotFoundException("Client not found.");

  const newDeal = new DealModel({
    ...dealData,
    dealClosedAt: new Date(dealClosedAt),
  });

  await newDeal.save();
  return newDeal;
};

export const getDealsService = async () => {
  return await DealModel.find({})
    .populate("propertyId", "title")
    .populate("agentId", "name email -password")
    .populate("clientId", "name email -password")
    .sort({ dealClosedAt: -1 });
};

export const getDealByIdService = async (dealId: Types.ObjectId) => {
  const deal = await DealModel.findById(dealId)
    .populate("propertyId", "title location price")
    .populate("agentId", "name email phone")
    .populate("clientId", "name email phone");

  if (!deal) {
    throw new NotFoundException("Deal not found.");
  }
  return deal;
};
