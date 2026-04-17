import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUser} from "../../services/userService.ts";
import {UserProfile} from "../../types/user.ts";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: Partial<UserProfile> & { uid: string }) => updateUser(user),
        onSuccess: (_data, variables) => {
            const { uid } = variables;
            return queryClient.invalidateQueries({ queryKey: ['users', uid] })
        }
    });
};