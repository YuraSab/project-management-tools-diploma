import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";

const fetchUsers = async (id: string): Promise<User> => {
    const response = await fetch(`http://localhost:3001/users/${id}`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching user. Status: ${response.status}`); 
    return await response.json();
}

export const useUser = (id: string , options?: { enabled?: boolean }) => {
    return useQuery({ 
        queryKey: ["user", id], 
        queryFn: () => fetchUsers(id),
        enabled: options?.enabled ?? true,
    });
}