export const INQUIRY_STATUS = ["New", "Contacted", "Resolved"] as const;
export type InquiryStatusType = (typeof INQUIRY_STATUS)[number];
