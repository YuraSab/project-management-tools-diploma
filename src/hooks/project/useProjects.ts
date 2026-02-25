import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/project";

const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch("http://localhost:3001/projects");
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching projects. Status: ${response.status}`);
    return await response.json();
}

export const useProjects = () => {
    return useQuery({ 
        queryKey: ["projects"], 
        queryFn: fetchProjects 
    });
}