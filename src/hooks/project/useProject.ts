import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/project";

const fetchProject = async (id: string): Promise<Project> => {
    const response = await fetch(`http://localhost:3001/projects/${id}`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching user. Status: ${response.status}`);
    return await response.json();
}

export const useProject = (id: string) => {
    return useQuery({ 
        queryKey: ["project", id], 
        queryFn: () => fetchProject(id),
    });
}