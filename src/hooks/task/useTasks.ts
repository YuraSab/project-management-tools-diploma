import { useQuery } from "@tanstack/react-query";
import {getTasks} from "../../services/taskService.ts";


export const useTasks = (projectId: string, options?: { enabled?: boolean }) => {
    return useQuery({ 
        queryKey: ["tasks", projectId],
        queryFn: () => getTasks(projectId),
        enabled: !!projectId && (options?.enabled ?? true), // не робимо запит, якщо projectId порожній
    });
}