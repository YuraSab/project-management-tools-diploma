import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProject} from "../../services/projectService.ts";
import {Project} from "../../types/project.ts";

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Omit<Project, 'id'>) => createProject(data),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};