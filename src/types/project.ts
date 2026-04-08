import type { Timestamp } from "firebase/firestore";

export enum ProjectStatus {
    Planned = "planned",
    InProgress = "in_progress",
    Completed = "completed"
}

export interface Project {
    id: string,
    title: string,
    description: string,
    startDate: Timestamp | Date | null,
    endDate: Timestamp | Date | null,
    assignedMembers: string[],
    status: ProjectStatus,
}
