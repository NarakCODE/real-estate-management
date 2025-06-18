import { Types } from "mongoose";
import PropertyModel, { IProperty } from "../models/property.model";
import { CreatePropertyInput } from "../validations/property.validation";
import { BadRequestException, NotFoundException } from "../utils/appError";

export type UpdatePropertyInput = Partial<CreatePropertyInput>;

export interface PropertyFilters {
    propertyName?: string;
    status?: string;
    propertyType?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export const createProperty = async (
    propertyData: CreatePropertyInput,
    agentId: Types.ObjectId
): Promise<{ message: string }> => {
    try {
        const newProperty = new PropertyModel({ ...propertyData, agentId });
        await newProperty.save();
        return { message: "Property created successfully" };
    } catch (error: any) {
        throw new BadRequestException(
            `Could not create property: ${error.message}`
        );
    }
};

export const getPropertiesService = async (
    filters: PropertyFilters = {}
): Promise<{
    properties: IProperty[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}> => {
    try {
        const {
            propertyName,
            status,
            propertyType,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = filters;

        // Build filter query
        const filterQuery: any = {};

        // Filter by property name (case-insensitive search in title)
        if (propertyName && propertyName.trim()) {
            filterQuery.title = {
                $regex: propertyName.trim(),
                $options: "i",
            };
        }

        // Filter by status
        if (status && status.trim()) {
            filterQuery.status = status.trim();
        }

        // Filter by property type
        if (propertyType && propertyType.trim()) {
            filterQuery.propertyType = propertyType.trim();
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Build sort query
        const sortQuery: any = {};
        sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

        // Execute queries
        const [properties, totalCount] = await Promise.all([
            PropertyModel.find(filterQuery)
                .sort(sortQuery)
                .skip(skip)
                .limit(limit)
                .populate(
                    "agentId",
                    "name email phone avatarUrl roleId -password"
                )
                .lean(),
            PropertyModel.countDocuments(filterQuery),
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
            properties,
            totalCount,
            currentPage: page,
            totalPages,
            hasNextPage,
            hasPrevPage,
        };
    } catch (error: any) {
        throw new BadRequestException(
            `Could not get properties: ${error.message}`
        );
    }
};

export const getUserProperties = async (
    userId: Types.ObjectId,
    filters: Omit<PropertyFilters, "agentId"> = {}
): Promise<{
    properties: IProperty[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}> => {
    try {
        const {
            propertyName,
            status,
            propertyType,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = filters;

        // Build filter query starting with user's properties
        const filterQuery: any = { agentId: userId };

        // Add additional filters
        if (propertyName && propertyName.trim()) {
            filterQuery.title = {
                $regex: propertyName.trim(),
                $options: "i",
            };
        }

        if (status && status.trim()) {
            filterQuery.status = status.trim();
        }

        if (propertyType && propertyType.trim()) {
            filterQuery.propertyType = propertyType.trim();
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Build sort query
        const sortQuery: any = {};
        sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

        // Execute queries
        const [properties, totalCount] = await Promise.all([
            PropertyModel.find(filterQuery)
                .sort(sortQuery)
                .skip(skip)
                .limit(limit)
                .lean(),
            PropertyModel.countDocuments(filterQuery),
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
            properties,
            totalCount,
            currentPage: page,
            totalPages,
            hasNextPage,
            hasPrevPage,
        };
    } catch (error: any) {
        throw new BadRequestException(
            `Could not get user properties: ${error.message}`
        );
    }
};

export const getPropertyById = async (
    propertyId: Types.ObjectId
): Promise<IProperty> => {
    try {
        const response = await PropertyModel.findById(propertyId)
            .populate("agentId", "name phone email avatarUrl -password")
            .lean();

        if (!response) {
            throw new NotFoundException(`Property not found`);
        }

        // Increment view count
        await PropertyModel.findByIdAndUpdate(
            propertyId,
            { $inc: { views: 1 } },
            { new: true }
        );

        return response;
    } catch (error: any) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException(
            `Could not get property by id: ${error.message}`
        );
    }
};

export const updateProperty = async (
    propertyId: Types.ObjectId,
    propertyData: UpdatePropertyInput
) => {
    try {
        const existingProperty = await PropertyModel.findById(propertyId);
        if (!existingProperty) {
            throw new NotFoundException(`Property not found`);
        }

        const updatedProperty = await PropertyModel.findByIdAndUpdate(
            propertyId,
            propertyData,
            { new: true, runValidators: true }
        );

        return {
            message: "Property updated successfully",
            property: updatedProperty,
        };
    } catch (error: any) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException(
            `Could not update property: ${error.message}`
        );
    }
};

export const deletePropertyService = async (propertyId: Types.ObjectId) => {
    try {
        const existingProperty = await PropertyModel.findById(propertyId);
        if (!existingProperty) {
            throw new NotFoundException(`Property not found`);
        }

        await PropertyModel.findByIdAndDelete(propertyId);
        return { message: "Property deleted successfully" };
    } catch (error: any) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException(
            `Could not delete property: ${error.message}`
        );
    }
};

export const getPropertyStats = async (
    agentId?: Types.ObjectId
): Promise<{
    totalProperties: number;
    availableProperties: number;
    soldProperties: number;
    rentedProperties: number;
    averagePrice: number;
    propertyTypeDistribution: Array<{ type: string; count: number }>;
}> => {
    try {
        const matchQuery = agentId ? { agentId } : {};

        const [stats] = await PropertyModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: null,
                    totalProperties: { $sum: 1 },
                    availableProperties: {
                        $sum: {
                            $cond: [
                                { $eq: ["$availability", "Available"] },
                                1,
                                0,
                            ],
                        },
                    },
                    soldProperties: {
                        $sum: { $cond: [{ $eq: ["$status", "Sold"] }, 1, 0] },
                    },
                    rentedProperties: {
                        $sum: { $cond: [{ $eq: ["$status", "Rented"] }, 1, 0] },
                    },
                    averagePrice: { $avg: "$price" },
                },
            },
        ]);

        const propertyTypeStats = await PropertyModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: "$propertyType",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    type: "$_id",
                    count: 1,
                },
            },
        ]);

        return {
            totalProperties: stats?.totalProperties || 0,
            availableProperties: stats?.availableProperties || 0,
            soldProperties: stats?.soldProperties || 0,
            rentedProperties: stats?.rentedProperties || 0,
            averagePrice: stats?.averagePrice || 0,
            propertyTypeDistribution: propertyTypeStats || [],
        };
    } catch (error: any) {
        throw new BadRequestException(
            `Could not get property stats: ${error.message}`
        );
    }
};
