import { nanoid } from "nanoid";
import { getNewUserId } from "./userApi";
import { User } from "../types/user";
import { LoginData } from "../types/login";
import { AuthenticatedUser } from "../types/auth";

export const login = async (loginData: LoginData): Promise<AuthenticatedUser> => {
    const response = await fetch('http://localhost:3001/users');
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    const users: User[] = await response.json();
    const user = users.find( (u) => u.username === loginData.username && u.password === loginData.password );
    if ( !user )
        throw new Error('Invalid credentials');
    const token = nanoid();
    return { token, user };
};

export const register = async (user: Omit<User, 'id'>): Promise<User> => {
    const usersResponse = await fetch('http://localhost:3001/users');
    if (!usersResponse.ok)
        throw new Error(`HTTP error! status: ${usersResponse.status}`);
    const users: User[] = await usersResponse.json();
    if (users.find((u) => u.username === user.username))
        throw new Error('Username already exists');
    const newUserId = await getNewUserId();
    const newUser = { ...user, id: newUserId };
    const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};