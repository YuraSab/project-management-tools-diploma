import { useQuery } from "@tanstack/react-query";
import { Task } from "../../types/task";

const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch("http://localhost:3001/tasks");
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching tasks. Status: ${response.status}`);
    return await response.json();
}

export const useTasks = () => {
    return useQuery({ 
        queryKey: ["tasks"], 
        queryFn: fetchTasks 
    });
}