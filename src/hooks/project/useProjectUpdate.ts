import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProject} from "../../services/projectService.ts";
import {Project} from "../../types/project.ts";

type UpdateProjectVariables = Partial<Project> & { id: string };
export const useProjectUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateProjectVariables) => updateProject(data),
        onSuccess: async (_, variables) => {
            // Зробіть функцію onSuccess асинхронною.
            // Це гарантує, що мутація вважатиметься завершеною лише після того, як кеш буде успішно скинуто.
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ['projects']}),
                queryClient.invalidateQueries({queryKey: ['project', variables.id]})
            ]);
        }
    });
};