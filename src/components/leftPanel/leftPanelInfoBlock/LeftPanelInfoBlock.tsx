import { useParams } from "react-router-dom"
import { TaskPriority, TaskStatus } from "../../../types/task"
import CustomButton from "../../../ui/button/CustomButton"
import CheckBoxStatus from "../../../ui/checkbox/CheckBoxStatus"
import DateInput from "../../../ui/input/DateInput"
import CustomSelect, { sortOptions } from "../../../ui/select/CustomSelect"
import AsignMembers from "../../asignMembers/AsignMembers"
import { useProjectControlStore } from "../../../store/projectControlStore"
import styles from "../leftPanelProject/LeftPanelProject.module.css"
import { useCallback } from "react"
import { lazy, Suspense } from "react"
import { useProjectUsers } from "../../../hooks/project/useProjectUsers"
import { useUserThemeStore } from "../../../store/userThemeStore"
import { useUsersThemes } from "../../../hooks/usersThemes/useUserThemes"
import { useProject } from "../../../hooks/project/useProject"

const AddMember = lazy(() => import("../../../modals/AddMember/AddMember"));

const LeftPanelInfoBlock = () => {
    const { projectId } = useParams();
    const {data: initiallyAsignedMembers} = useProjectUsers(projectId || "");
        
    const isAddMembersActive = useProjectControlStore((state) => state.isAddMembersActive);
    const setIsAddMembersActive = useProjectControlStore((state) => state.setIsAddMembersActive);
    const statusFilter = useProjectControlStore((state) => state.statusFilter);
    const setStatusFilter = useProjectControlStore((state) => state.setStatusFilter);
    const usersFilter = useProjectControlStore((state) => state.usersFilter);
    const setUserFilter = useProjectControlStore((state) => state.setUserFilter);
    const startDateFilter = useProjectControlStore((state) => state.startDateFilter);
    const setStartDateFilter = useProjectControlStore((state) => state.setStartDateFilter);
    const endDateFilter = useProjectControlStore((state) => state.endDateFilter);
    const setEndDateFilterr = useProjectControlStore((state) => state.setEndDateFilterr);
    const priorityFilter = useProjectControlStore((state) => state.priorityFilter);
    const setPriorityFilter = useProjectControlStore((state) => state.setPriorityFilter);
    const sortValue = useProjectControlStore((state) => state.sortValue);
    const setSortValue = useProjectControlStore((state) => state.setSortValue);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    
    const { data: project } = useProject(projectId || "");
    const { data: usersThemes } = useUsersThemes(project?.assignedMembers || []);
        
    const handleAddTaskOpen = useCallback(() => {
        setIsEditTaskActive(false);
        setIsAddTaskActive(true);
        setIsRightPanelActive(true);
    }, [setIsEditTaskActive, setIsAddTaskActive, setIsRightPanelActive]);

    return(
        <div className={`${styles.leftPanelChild} ${backgroundMode === "black" ? styles.dark : styles.light}`}>
        <CustomButton text={"Add task"} onClick={() => handleAddTaskOpen()} customStyles={{width: "100%"}}/>
                <label>Status
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: 5}}>
                        <CheckBoxStatus<TaskStatus> status={"todo"} checked={statusFilter.includes("todo")} setStatusFilter={setStatusFilter}/>
                        <CheckBoxStatus<TaskStatus> status={"in_progress"} checked={statusFilter.includes("in_progress")} setStatusFilter={setStatusFilter}/>
                        <CheckBoxStatus<TaskStatus> status={"done"} checked={statusFilter.includes("done")} setStatusFilter={setStatusFilter}/>
                    </div>
                </label>
                <label>Priority
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: 5}}>
                        <CheckBoxStatus<TaskPriority> status={"low"}  checked={priorityFilter.includes("low")} setStatusFilter={setPriorityFilter}/>
                        <CheckBoxStatus<TaskPriority>  status={"medium"} checked={priorityFilter.includes("medium")} setStatusFilter={setPriorityFilter}/>
                        <CheckBoxStatus<TaskPriority>  status={"high"} checked={priorityFilter.includes("high")} setStatusFilter={setPriorityFilter}/>
                    </div>
                </label>
                <AsignMembers
                    usersThemes={usersThemes || []}
                    users={usersFilter} setAddMembersActive={setIsAddMembersActive} 
                    uniqueText={"Select members"} maxIcons={3} iconSize={24}
                />
                <label>From
                    <DateInput value={startDateFilter} onChange={setStartDateFilter} />
                </label>
                <label>To
                    <DateInput value={endDateFilter} onChange={setEndDateFilterr} />
                </label>
                <label>Sort by
                    <CustomSelect value={sortValue} onChange={setSortValue} options={sortOptions}/>
                </label>
            {      
                isAddMembersActive && (
                    <Suspense fallback={null}>
                        <AddMember 
                            initiallyAssignedMembers={initiallyAsignedMembers} 
                            exitAction={() => setIsAddMembersActive(false)} 
                            selectedUsers={usersFilter} 
                            handlerFilterUser={setUserFilter}
                            usersThemes={usersThemes}
                        />
                    </Suspense>
                )
            }
        </div>
    )
}

export default LeftPanelInfoBlock;