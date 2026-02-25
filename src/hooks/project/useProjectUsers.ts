import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/project";
import { User } from "../../types/user";

const fetchProjectById = async (id: string): Promise<Project> => {
    const response = await fetch(`http://localhost:3001/projects/${id}`);
    if ( !response.ok )
        throw new Error(`HTTP Error during fetching projects. Status: ${response.status}`);
    return await response.json();
};

const fetchUsersByIds = async (ids: string[]): Promise<User[]> => {
    if (!ids || ids.length === 0)
        return [];
    const responseUsers = await fetch(`http://localhost:3001/users`);
    if ( !responseUsers.ok )
        throw new Error(`HTTP Error during fetching users. Status: ${responseUsers.status}`);
    const data: User[] = await responseUsers.json();
    return data.filter((user) => ids.includes(user.id));
};

export const useProjectUsers = (projectId: string) => {
    const { data: project } = useQuery({ 
        queryKey: ["project", projectId], 
        queryFn: () => fetchProjectById(projectId),
    });

    return useQuery({
        queryKey: ["projectUsers", projectId],
        queryFn: () => fetchUsersByIds(project?.assignedMembers  || []),
        enabled: !!project?.assignedMembers,
    });
};