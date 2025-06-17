import mongoose, { type Document, Schema, Types } from "mongoose";
import {
    PROPERTY_AVAILABILITY,
    PROPERTY_STATUS,
    PROPERTY_TYPE,
} from "../enums/property.enum";
import { slugify } from "../utils/slugify";

export interface ILocation {
    street?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface IAmenities {
    name: string;
    description?: string;
    icon: string;
}

export interface IFeatures {
    bedrooms: number;
    bathrooms: number;
    area: number;
    lotSize?: number;
    yearBuilt?: number;
    parkingSpots?: number;
    amenityIds: [Types.ObjectId];
}

export interface IProperty extends Document {
    title: string;
    description: string;
    propertyType: string;
    status: string;
    availability: string;
    price: number;
    currency: string;
    location: ILocation;
    features: IFeatures;
    images: string[];
    videoTourUrl?: string;
    agentId: Types.ObjectId;
    isFeatured: boolean;
    views: number;
    slug: string;
}

const LocationSchema = new Schema<ILocation>({
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
});

const FeaturesSchema = new Schema<IFeatures>({
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, min: 0 },
    lotSize: { type: Number, min: 0 },
    yearBuilt: { type: Number, min: 1000 },
    parkingSpots: { type: Number, min: 0 },
});

const AmenitiesSchema = new Schema<IAmenities>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    icon: { type: String, required: true },
});

const PropertySchema = new Schema<IProperty>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        propertyType: { type: String, enum: PROPERTY_TYPE, required: true },
        status: {
            type: String,
            enum: PROPERTY_STATUS,
            required: true,
        },
        availability: {
            type: String,
            enum: PROPERTY_AVAILABILITY,
            default: "Available",
            required: true,
        },
        price: { type: Number, required: true },
        currency: { type: String, required: true, default: "USD" },
        location: { type: LocationSchema, required: true },
        features: { type: FeaturesSchema, required: true },
        images: [{ type: String }],
        videoTourUrl: { type: String },
        agentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        isFeatured: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        slug: { type: String, unique: true, sparse: true },
    },
    { timestamps: true }
);

PropertySchema.pre<IProperty>("save", async function (next) {
    if (this.isModified("title")) {
        let baseSlug = slugify(this.title);
        let slug = baseSlug;
        let count = 1;
        while (
            (await mongoose.models.Property.findOne({ slug })) &&
            (
                await mongoose.models.Property.findOne({ slug })
            )?._id.toString() !== this._id
        ) {
            slug = `${baseSlug}-${count++}`;
        }
        this.slug = slug;
    }
    next();
});

const PropertyModel = mongoose.model<IProperty>("Property", PropertySchema);
export default PropertyModel;
