export const PERMISSION = {
  // User Management
  MANAGE_USERS: "manage_users", // Admin can manage users (create, read, update, delete)

  // Property Management
  CREATE_PROPERTY: "create_property",
  READ_PROPERTY: "read_property",
  UPDATE_PROPERTY: "update_property",
  DELETE_PROPERTY: "delete_property",

  // Appointment Management
  CREATE_APPOINTMENT: "create_appointment",
  UPDATE_APPOINTMENT: "update_appointment",
  APPROVE_APPOINTMENT: "approve_appointment",
  DELETE_APPOINTMENT: "delete_appointment",

  // Review Management
  CREATE_REVIEW: "create_review",
  READ_REVIEW: "read_review",
  UPDATE_REVIEW: "update_review",
  DELETE_REVIEW: "delete_review",

  // Deal Management
  CREATE_DEAL: "create_deal",
  READ_DEAL: "read_deal",
  MANAGE_DEALS: "manage_deals",

  // Amenity Management
  MANAGE_AMENITIES: "manage_amenities", // Create, Read, Update, Delete amenities

  // General
  VIEW_DASHBOARD: "view_dashboard",
} as const;

export type PermissionType = (typeof PERMISSION)[keyof typeof PERMISSION];
