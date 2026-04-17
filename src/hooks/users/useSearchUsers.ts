import { useQuery } from "@tanstack/react-query";
import {searchUsersByEmail} from "../../services/userService.ts";

export const useSearchUsers = (searchTerm: string) => {
    return useQuery({
        queryKey: ['users_search', searchTerm],
        queryFn: () => searchUsersByEmail(searchTerm.trim()),
        enabled: searchTerm.trim().length > 0,
    });
};