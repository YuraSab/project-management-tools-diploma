import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProject} from "../../services/projectService.ts";

export const useProjectDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) =>  deleteProject(id),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    });
};