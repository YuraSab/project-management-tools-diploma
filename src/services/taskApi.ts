import { Task } from "../types/task";

const getNewTaskId = async (): Promise<string> => {
    const response = await fetch("http://localhost:3001/tasks");
    if ( !response.ok )
        throw new Error(`Error during fetching project. Status: ${response.status}`);
    const data: Task[] = await response.json();
    if ( data.length === 0 )
        return "1";
    return String(parseInt(data[data.length-1].id) + 1);
}

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
    const taskId = await getNewTaskId();
    const newTask = {...task, id: taskId} as Task;
    const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });
    if ( !response.ok )
        throw new Error(`Error during creation of the task. Status: ${response.status}`);
    return response.json();
}

export const updateTask = async (task: Task): Promise<Task> => {
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
    return response.json();
}

export const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
    });
    if ( !response.ok )
        throw new Error(`Error during updating of the user. Status: ${response.status}`);
}