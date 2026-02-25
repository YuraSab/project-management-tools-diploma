import { useQuery } from "@tanstack/react-query";
import { Task } from "../../types/task";

const fetchTask = async (id: string): Promise<Task> => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching user. Status: ${response.status}`);
    return await response.json();
}

export const useProject = (id: string) => {
    return useQuery({ 
        queryKey: ["task", id], 
        queryFn: () => fetchTask(id),
    });
}