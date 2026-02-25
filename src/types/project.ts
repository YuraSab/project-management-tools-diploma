export type ProjectStatus = "planned" | "in_progress" | "completed";

export interface Project {
    id: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    assignedMembers: string[],
    status: ProjectStatus,
}