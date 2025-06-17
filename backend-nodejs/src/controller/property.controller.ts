import { type Request, type Response } from "express";
import * as propertyService from "../services/property.service";
import { HTTPSTATUS } from "../config/http-status.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Types } from "mongoose";
import { PropertyFilters } from "../services/property.service";

export const createProperty = asyncHandler(
    async (req: Request, res: Response) => {
        const sessionUser = (req.session as any).user;
        const agentId = sessionUser._id;

        const propertyData = req.body;

        const newProperty = await propertyService.createProperty(
            propertyData,
            agentId
        );

        res.status(HTTPSTATUS.CREATED).json(newProperty);
    }
);

export const getProperties = asyncHandler(
    async (req: Request, res: Response) => {
        // Extract query parameters for filtering
        const {
            propertyName,
            status,
            propertyType,
            page = "1",
            limit = "10",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build filters object
        const filters: PropertyFilters = {
            propertyName: propertyName as string,
            status: status as string,
            propertyType: propertyType as string,
            page: parseInt(page as string, 10),
            limit: parseInt(limit as string, 10),
            sortBy: sortBy as string,
            sortOrder: sortOrder as "asc" | "desc",
        };

        // Validate pagination parameters
        if (filters.page && filters.page < 1) {
            filters.page = 1;
        }
        if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
            filters.limit = 10;
        }

        const result = await propertyService.getPropertiesService(filters);

        res.status(HTTPSTATUS.OK).json({
            message: "Properties retrieved successfully",
            data: result.properties,
            pagination: {
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
                limit: filters.limit,
            },
            filters: {
                propertyName: filters.propertyName || null,
                status: filters.status || null,
                propertyType: filters.propertyType || null,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            },
        });
    }
);

export const getUserProperties = asyncHandler(
    async (req: Request, res: Response) => {
        const sessionUser = (req.session as any).user;
        const userId = sessionUser._id;

        // Extract query parameters for filtering
        const {
            propertyName,
            status,
            propertyType,
            page = "1",
            limit = "10",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build filters object
        const filters: Omit<PropertyFilters, "agentId"> = {
            propertyName: propertyName as string,
            status: status as string,
            propertyType: propertyType as string,
            page: parseInt(page as string, 10),
            limit: parseInt(limit as string, 10),
            sortBy: sortBy as string,
            sortOrder: sortOrder as "asc" | "desc",
        };

        // Validate pagination parameters
        if (filters.page && filters.page < 1) {
            filters.page = 1;
        }
        if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
            filters.limit = 10;
        }

        const result = await propertyService.getUserProperties(userId, filters);

        res.status(HTTPSTATUS.OK).json({
            message: "User properties retrieved successfully",
            data: result.properties,
            pagination: {
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
                limit: filters.limit,
            },
            filters: {
                propertyName: filters.propertyName || null,
                status: filters.status || null,
                propertyType: filters.propertyType || null,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            },
        });
    }
);

export const getPropertyById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        // Validate ObjectId format
        if (!Types.ObjectId.isValid(id)) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Invalid property ID format",
            });
        }

        const property = await propertyService.getPropertyById(
            new Types.ObjectId(id)
        );

        res.status(HTTPSTATUS.OK).json({
            message: "Property retrieved successfully",
            data: property,
        });
    }
);

export const updateProperty = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const propertyData = req.body;

        // Validate ObjectId format
        if (!Types.ObjectId.isValid(id)) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Invalid property ID format",
            });
        }

        const updatedProperty = await propertyService.updateProperty(
            new Types.ObjectId(id),
            propertyData
        );

        res.status(HTTPSTATUS.OK).json(updatedProperty);
    }
);

export const deleteProperty = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        // Validate ObjectId format
        if (!Types.ObjectId.isValid(id)) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Invalid property ID format",
            });
        }

        const deletedProperty = await propertyService.deletePropertyService(
            new Types.ObjectId(id)
        );

        res.status(HTTPSTATUS.OK).json(deletedProperty);
    }
);

export const getPropertyStats = asyncHandler(
    async (req: Request, res: Response) => {
        const sessionUser = (req.session as any).user;
        const { global } = req.query;

        // If global query param is true and user has admin role, get all stats
        // Otherwise, get stats for current user only
        const agentId =
            global === "true" && sessionUser.role === "admin"
                ? undefined
                : sessionUser._id;

        const stats = await propertyService.getPropertyStats(agentId);

        res.status(HTTPSTATUS.OK).json({
            message: "Property statistics retrieved successfully",
            data: stats,
        });
    }
);

export const searchProperties = asyncHandler(
    async (req: Request, res: Response) => {
        const {
            q: searchTerm,
            propertyType,
            status,
            minPrice,
            maxPrice,
            city,
            state,
            bedrooms,
            bathrooms,
            page = "1",
            limit = "10",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        // Build advanced search filters
        const filters: PropertyFilters & {
            minPrice?: number;
            maxPrice?: number;
            city?: string;
            state?: string;
            bedrooms?: number;
            bathrooms?: number;
        } = {
            propertyName: searchTerm as string,
            status: status as string,
            propertyType: propertyType as string,
            page: parseInt(page as string, 10),
            limit: parseInt(limit as string, 10),
            sortBy: sortBy as string,
            sortOrder: sortOrder as "asc" | "desc",
            minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
            city: city as string,
            state: state as string,
            bedrooms: bedrooms ? parseInt(bedrooms as string, 10) : undefined,
            bathrooms: bathrooms
                ? parseInt(bathrooms as string, 10)
                : undefined,
        };

        // Validate pagination parameters
        if (filters.page && filters.page < 1) {
            filters.page = 1;
        }
        if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
            filters.limit = 10;
        }

        const result = await propertyService.getPropertiesService(filters);

        res.status(HTTPSTATUS.OK).json({
            message: "Property search completed successfully",
            data: result.properties,
            pagination: {
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalCount: result.totalCount,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
                limit: filters.limit,
            },
            searchFilters: {
                searchTerm: filters.propertyName || null,
                propertyType: filters.propertyType || null,
                status: filters.status || null,
                priceRange: {
                    min: filters.minPrice || null,
                    max: filters.maxPrice || null,
                },
                location: {
                    city: filters.city || null,
                    state: filters.state || null,
                },
                features: {
                    bedrooms: filters.bedrooms || null,
                    bathrooms: filters.bathrooms || null,
                },
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            },
        });
    }
);
