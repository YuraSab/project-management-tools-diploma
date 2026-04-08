import React from "react";
import styles from "./RightPanelProject.module.css";
import { useProjectControlStore } from "../../../store/projectControlStore";
import TaskAdd from "../../task/taskAdd/TaskAdd";
import TaskEdit from "../../task/taskEdit/TaskEdit";
import {useProfileStore} from "../../../store/profileStore.ts";
import {Theme} from "../../../types/user.ts";

const RightPanelProject = () => {
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);
    const theme = useProfileStore((state) => state.profile.theme);
    return(
        <div className={styles.main} style={{backgroundColor: theme === Theme.Black ? Theme.Black : "#f3f4f6"}}>
            {
                isAddTaskActive
                    ? <TaskAdd/>
                    : selectedTask && <TaskEdit/>
            }
        </div>
    );
};

export default React.memo(RightPanelProject);