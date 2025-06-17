export const ROLE = {
    ADMIN: "Admin",
    AGENT: "Agent",
    USER: "User",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];
