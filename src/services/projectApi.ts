import { Project } from "../types/project";

const getNewProjectId = async () => {
    const response = await fetch("http://localhost:3001/projects");
    if ( !response.ok )
        throw new Error(`Error during fetching project. Status: ${response.status}`);
    const data: Project[] = await response.json();
    if ( data.length === 0 )
        return 1;
    return String(parseInt(data[data.length-1].id) + 1);
}

export const createProject = async (project: Omit<Project, "id">): Promise<Project> => {
    const projectId = await getNewProjectId();
    const newProject = {...project, id: projectId} as Project;
    const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
    });
    if ( !response.ok )
        throw new Error(`Error during creation of the project. Status: ${response.status}`);
    return response.json();
}

export const updateProject = async (project: Project): Promise<Project> => {
    const response = await fetch(`http://localhost:3001/projects/${project.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
    return response.json();
}

export const deleteProject = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:3001/projects/${id}`, {
        method: "DELETE",
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
}