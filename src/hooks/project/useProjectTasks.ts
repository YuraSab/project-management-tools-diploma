import { useQuery } from "@tanstack/react-query";
import { Task } from "../../types/task";

const fetchTasksByProjectId = async (id: string): Promise<Task[]> => {
    const response = await fetch(`http://localhost:3001/tasks`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching user. Status: ${response.status}`);
    const data: Task[] = await response.json();
    return data.filter((task) => task.projectId === id);
}

export const useProjectTasks = (id: string) => {
    return useQuery({ 
        queryKey: ["projectTasks", id], 
        queryFn: () => fetchTasksByProjectId(id),
    });
}