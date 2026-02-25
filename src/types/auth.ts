import { Role, User } from "./user";

export interface AuthUserStore {
    id: string,
    name: string,
    username: string,
    role: Role,
    reservedMembers: string[],
}

export interface AuthenticatedUser {
    token: string,
    user: User,
}