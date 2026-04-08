import {useMutation, useQueryClient} from "@tanstack/react-query";
import { updateTask } from "../../services/taskService.ts";
import {Task} from "../../types/task.ts";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskData: Partial<Task> & { id: string }) => updateTask(taskData),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });
};