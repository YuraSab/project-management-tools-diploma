import { User } from "../types/user";

export const getNewUserId = async () => {
    const response = await fetch("http://localhost:3001/users");
    if ( !response.ok )
        throw new Error(`Error during fetching user. Status: ${response.status}`);
    const data: User[] = await response.json();
    if ( data.length === 0 )
        return 1;
    return String(parseInt(data[data.length-1].id) + 1);
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const userId = await getNewUserId();
    const newUser = {...user, id: userId} as User;
    const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if ( !response.ok )
        throw new Error(`Error during creation of the user. Status: ${response.status}`);
    return response.json();
}

export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
    return response.json();
}

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
}

export const updateReservedMembers = async (
    { id, reservedMembers }: 
    { id: string, reservedMembers: string[] }
): Promise<User> => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservedMembers }),
    });
    if (!response.ok)
        throw new Error(`Error during updating reserved members. Status: ${response.status}`);
    return await response.json();
};
