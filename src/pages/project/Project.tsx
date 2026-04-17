import { useParams } from "react-router-dom";
import { useProjectControlStore } from "../../store/projectControlStore";
import {AlignJustify, Plus} from "lucide-react";
import LeftPanelProject from "../../components/leftPanel/projectSidebar/ProjectSidebar.tsx";
import KanbanBoard from "../../components/kanban/kanbanBoard/KanbanbBoard";
import RightPanelProject from "../../components/rightPanel/rightPanelProject/RightPanelProject";
import { useProject } from "../../hooks/project/useProject";
import {useAuthStore} from "../../store/authStore.ts";
import {useCallback, useMemo} from "react";
import Error from "../../components/error/Error.tsx";
import FAB from "../../ui/FAB/FAB.tsx";
import {useProfileStore} from "../../store/profileStore.ts";
import {useShallow} from "zustand/react/shallow";
import styles from './Project.module.css';

const Project = () => {
    const { projectId } = useParams();
    const { data: currentProject, isPending: isLoadingProject } = useProject(projectId || "");
    const user = useAuthStore((state) => state.user);

    const {
        selectedTask,
        isRightPanelActive, setIsLeftPanelActive,
        isLeftPanelActive, setIsRightPanelActive,
        isAddTaskActive, setIsAddTaskActive
    } = useProjectControlStore(useShallow((state) => ({
        selectedTask: state.selectedTask,
        isRightPanelActive: state.isRightPanelActive, setIsLeftPanelActive: state.setIsLeftPanelActive,
        isLeftPanelActive: state.isLeftPanelActive, setIsRightPanelActive: state.setIsRightPanelActive,
        isAddTaskActive: state.isAddTaskActive, setIsAddTaskActive: state.setIsAddTaskActive
    })));
    const theme = useProfileStore((state) => state.profile.theme);

    const handleAddTaskOpen = useCallback(() => {
        setIsRightPanelActive(true);
        setIsAddTaskActive(true);
    }, [setIsRightPanelActive, setIsAddTaskActive]);

    const canAccess = useMemo(() =>
        user && currentProject?.assignedMembers.includes(user.uid)
    , [user, currentProject]);

    if ( !isLoadingProject && !canAccess ) return <Error type={'no_access'}/>;

    return (
        <div className={styles.main}>
            {
                isLeftPanelActive && !isLoadingProject
                    ? <LeftPanelProject/>
                    : (
                        <div onClick={() => setIsLeftPanelActive(true)} className={styles.burgerMenu}>
                            <AlignJustify size={28}/>
                        </div>
                    )
            }
            <KanbanBoard projectId={projectId}/>
            {isRightPanelActive && !isLoadingProject && (isAddTaskActive || selectedTask !== null) && (
                <RightPanelProject/>
            )}
            <FAB style={{ right: isRightPanelActive ? 376 : 36 }}><Plus onClick={handleAddTaskOpen} size={36} color={theme}/></FAB>
        </div>
    );
}

export default Project;