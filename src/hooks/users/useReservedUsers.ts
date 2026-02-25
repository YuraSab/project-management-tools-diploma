import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";

const fetchReservedUsers = async (reserved: string[]): Promise<User[]> => {
    const response = await fetch("http://localhost:3001/users");
    if ( !response.ok ) {
        throw new Error(`HTTP Error during fetching users. Status: ${response.status}`);
    }
    const data: User[] = await response.json();
    return data.filter((user) => !!reserved.includes(user.id));
}

export const useReservedUsers = (reserved: string[]) => {
    return useQuery({
        queryKey: ["reservedUsers", reserved], // reserved as key for cache
        queryFn: () => fetchReservedUsers(reserved),
        enabled: !!reserved.length, // don`t apply if list is empty
    });
}