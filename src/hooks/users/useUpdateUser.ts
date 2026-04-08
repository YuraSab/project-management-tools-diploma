import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUser} from "../../services/userService.ts";
import {UserProfile} from "../../types/user.ts";

export const useUpdateUser = (uid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: Partial<UserProfile> & { uid: string }) => updateUser(user),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['users', uid] })
        }
    });
};