import { useTaskUsers } from "../../../hooks/task/useTaskUsers";
import { useUsersThemes } from "../../../hooks/usersThemes/useUserThemes";
import { useProjectControlStore } from "../../../store/projectControlStore";
import { useUserThemeStore } from "../../../store/userThemeStore";
import { Task } from "../../../types/task";
import UserIconCollection from "../../usersIconsCollection/UsersIconsCollection";
import styles from "./Kanban.module.css";

interface KanbanCardProps {
    task: Task,
    handleOnTaskClick: (task: Task) => void,
} 

const KanbanCard = ({ task, handleOnTaskClick }: KanbanCardProps) => {
    const { data: users } = useTaskUsers(task.assignedMembers);
    const { data: usersThemes } = useUsersThemes(task.assignedMembers);
    const isLeftPanelActive = useProjectControlStore((state) => state.isLeftPanelActive);
    const isRightPanelActive = useProjectControlStore((state) => state.isRightPanelActive);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return(
        <div className={styles.cardMain  + " w-full"} onClick={() => handleOnTaskClick(task)} style={{backgroundColor: backgroundMode, color: backgroundMode === "black" ? "white" : "black"}} >
            <h3 className={`text-lg font-semibold ${styles.title}`}>{task.title}</h3>            
             <p className={`text-sm text-gray-600 ${styles.description}`}>
                {task.description}
            </p>
            { users && <UserIconCollection size={(isLeftPanelActive && isRightPanelActive) ? 20 : 24} users={users} usersThemes={usersThemes} fontSize={(isLeftPanelActive && isRightPanelActive) ? 14 : 18}/> }
        </div>
    )
}

export default KanbanCard;