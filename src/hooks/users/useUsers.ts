import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("http://localhost:3001/users");
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching users. Status: ${response.status}`);
    return await response.json();
}

export const useUsers = () => {
    return useQuery({ 
        queryKey: ["users"], 
        queryFn: fetchUsers 
    });
}