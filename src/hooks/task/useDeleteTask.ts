import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "../../services/taskService.ts";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => {
            return  queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
};