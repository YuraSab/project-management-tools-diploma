
import { useTaskUsers } from "../../../hooks/task/useTaskUsers";
import { useUsersThemes } from "../../../hooks/usersThemes/useUserThemes";
import { useProjectControlStore } from "../../../store/projectControlStore";
import { useUserThemeStore } from "../../../store/userThemeStore";
import StatusText from "../../../ui/statusText/StatusText";
import RightPanelHeader from "../../rightPanel/rightPanelHeader/RightPanelHeader";
import UserIconCollection from "../../usersIconsCollection/UsersIconsCollection";
import styles from "./TaskDetails.module.css";

import React, { useCallback } from "react";

const TaskDetails = React.memo(() => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    
    const { data: asignedTaskUsers } = useTaskUsers(selectedTask?.assignedMembers || []);
    const { data: usersThemes } = useUsersThemes(selectedTask?.assignedMembers || []);

    const hanldleEditOpen = useCallback(() => {
        setIsAddTaskActive(false);
        setIsEditTaskActive(true);
    }, [setIsAddTaskActive, setIsEditTaskActive]);

    if (!selectedTask) return null;
    return(
        <div className={styles.main} style={{backgroundColor: backgroundMode}}>
            <RightPanelHeader taskTitle={selectedTask.title} setIsEditTaskActive={hanldleEditOpen} setIsRightPanelActive={setIsRightPanelActive}/>
            <h2><b>Id:</b> {selectedTask.id}</h2>
            <h2 className={styles.description}><b>Description:</b> {selectedTask.description}</h2>
            <h2><b>Status:</b> <StatusText status={selectedTask.status}/></h2>
            <h2><b>Start date:</b> {selectedTask.startDate}</h2>
            <h2><b>End date:</b> {selectedTask.endDate}</h2>
            <h2><b>Assigned members:</b></h2>
            <UserIconCollection usersThemes={usersThemes} users={asignedTaskUsers || []} size={30} maxIcons={6}/>
        </div>
    )
});

export default TaskDetails;