import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/project";

const fetchUserProjects = async (userId: string): Promise<Project[]> => {
    const response = await fetch(`http://localhost:3001/projects/`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching user. Status: ${response.status}`);
    const data: Project[] = await response.json();
    return data.filter((p) => p.assignedMembers.includes(userId));
}

export const useUserProjects = (userId: string , options?: { enabled?: boolean }) => {
    return useQuery({ 
        queryKey: ["userProjects", userId], 
        queryFn: () => fetchUserProjects(userId),
        enabled: options?.enabled ?? true,
    });
}