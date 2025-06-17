export const PROPERTY_TYPE = [
    "Apartment",
    "House",
    "Land",
    "Villa",
    "Townhouse",
    " ",
] as const;

export const PROPERTY_STATUS = ["For Sale", "For Rent"] as const;

export const PROPERTY_AVAILABILITY = [
    "Available",
    "Pending",
    "Sold",
    "Rented",
] as const;

export type PropertyTypeType = (typeof PROPERTY_TYPE)[number];
export type PropertyStatusType = (typeof PROPERTY_STATUS)[number];
export type PropertyAvailabilityType = (typeof PROPERTY_AVAILABILITY)[number];
