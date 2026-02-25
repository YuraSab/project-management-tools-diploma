export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "none";

export interface Task {
    id: string,
    projectId: string,
    title: string,
    description: string,
    assignedMembers: string[],
    status: TaskStatus,
    startDate?: string,
    endDate?: string,
    priority?: TaskPriority,
}