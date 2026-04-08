import { useQuery } from "@tanstack/react-query";
import {getUsersByIds} from "../../services/userService.ts";

export const useProjectUsers = (usersIds: string[]) => {
    console.log('usersIds in useProjectUsers',usersIds);
    return useQuery({
        queryKey: ['users', usersIds],
        queryFn: () => getUsersByIds(usersIds),
        enabled: usersIds.length > 0, // don`t make request for empty array
    });
};