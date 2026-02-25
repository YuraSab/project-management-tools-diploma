export type Role =  "member" | "manager" | "admin";

export enum UserRole {
    Admin = "member",
    Member = "manager",
    Viewer = "admin",
}

export interface User {
    uid: string,
    email: string | null,
    name: string, // Раніше було displayName
    username: string,
    role: Role,
    reservedMembers: string[],
}