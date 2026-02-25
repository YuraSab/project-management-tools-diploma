import React, { useCallback, useEffect, useState } from "react";
import styles from "./TaskEdit.module.css";
import { useProjectControlStore } from "../../../store/projectControlStore";
import { Task, TaskPriority } from "../../../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../../services/taskApi";
import CustomForm from "../../../ui/form/CustomForm";
import RightPanelHeader from "../../rightPanel/rightPanelHeader/RightPanelHeader";
import FormTextInput from "../../../ui/input/FormTextInput";
import FormTextarea from "../../../ui/textArea/FormTextarea";
import AsignMembers from "../../asignMembers/AsignMembers";
import FormSelect from "../../../ui/select/FormSelect";
import FormDateInput from "../../../ui/input/FormDateInput";
import FormButtonSubmit from "../../../ui/button/FormButtonSubmit";
import CustomButton from "../../../ui/button/CustomButton";
import { useUsersThemes } from "../../../hooks/usersThemes/useUserThemes";
import AddMember from "../../../modals/AddMember/AddMember";
import { useReservedUsers } from "../../../hooks/users/useReservedUsers";
import { User } from "../../../types/user";
import { useParams } from "react-router-dom";
import { useProject } from "../../../hooks/project/useProject";
import { useUserThemeStore } from "../../../store/userThemeStore";

const TaskEdit = React.memo(() => {
    const { projectId } = useParams();
    
    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const clearSelectedTask = useProjectControlStore((state) => state.clearSelectedTask);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    
    const { data: project } = useProject(projectId || "");
    const { data: initiallyAsignedMembers } = useReservedUsers(selectedTask?.assignedMembers || []);
    const { data: usersThemes } = useUsersThemes(selectedTask?.assignedMembers || []);
    const { data: projectAsignedMembers } = useReservedUsers(project?.assignedMembers || []);

    const [formData, setFormData] = useState<Omit<Task, "id" | "projectId" | "assignedMembers">>({
        title: selectedTask?.title || "",
        description: selectedTask?.description || "",
        status: selectedTask?.status || "todo",
        startDate: selectedTask?.startDate || "",
        endDate: selectedTask?.endDate || "", 
        priority: selectedTask?.priority || "none",
    });
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);
    const [assignedMembers, setAssignedMembers] = useState<User[]>(initiallyAsignedMembers || []);
    
    const queryClient = useQueryClient();
    const editTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });
    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    const handleAsignUserClick = useCallback((chosenUser: User) => {
            setAssignedMembers((prev) => {
                const isAdded = prev.find((u) => u.id === chosenUser.id);
                return isAdded
                ? prev.filter((u) => u.id !== chosenUser.id)
                : [...prev, chosenUser];
            })
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmitEdit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedTask?.id) 
            return;
        if ( !formData.title || !formData.description )
            alert("Please fill all the requered fields!");
        editTaskMutation.mutate({
            id: selectedTask.id,
            projectId: selectedTask.projectId,
            assignedMembers: assignedMembers.map((am) => am.id),
            ...formData,
        });
    };

    const handleDelete = async () => {
        if (window.confirm("Ви впевнені, що хочете видалити дане завдання?")) {
            deleteTaskMutation.mutate(selectedTask?.id || "");
            clearSelectedTask();
        }
    }

    useEffect(() => {
        if (initiallyAsignedMembers)
            setAssignedMembers(initiallyAsignedMembers);
    }, [initiallyAsignedMembers]);

    return(
        <CustomForm onSubmit={handleSubmitEdit} customStyles={{ margin: 15, minHeight: "calc(100vh - 130px)", gap: 0, backgroundColor: backgroundMode }}>
            <RightPanelHeader taskTitle={selectedTask?.title || ""} setIsEditTaskActive={setIsEditTaskActive} setIsRightPanelActive={setIsRightPanelActive}/>
            <div className={styles.rightPanelChildEdit}>
                <label>Title
                    <FormTextInput name={"title"} value={formData.title} onChange={handleChange} required/>
                </label>
                <label>Description:
                    <FormTextarea name={"description"} value={formData.description} onChange={handleChange} />                
                </label>
                <AsignMembers usersThemes={usersThemes || []} users={assignedMembers || []} setAddMembersActive={setAddMembersActive} maxIcons={1}/>
                <label>Status:
                    <FormSelect name={"status"} value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
                </label>
                <label>From:
                    <FormDateInput name={"startDate"} value={formData.startDate || ""} onChange={handleChange} />
                </label>
                <label>To:
                    <FormDateInput name={"endDate"} value={formData.endDate || ""} onChange={handleChange} />
                </label>
                <label>Priority
                    <FormSelect<TaskPriority> name={"priority"} value={formData.priority} onChange={handleChange} options={["low", "medium", "high", "none"]}/>
                </label>
                <FormButtonSubmit text={"Save chenges"} customStyles={{height: 40}}/>
                <CustomButton text={"Delete task"} onClick={() => handleDelete()} customStyles={{backgroundColor: "#D10000", height: 40}}/> 
                { addMembersActive && <AddMember usersThemes={usersThemes || []} initiallyAssignedMembers={projectAsignedMembers} exitAction={() => setAddMembersActive(false)} selectedUsers={assignedMembers} handlerFilterUser={handleAsignUserClick}/> }
            </div>
        </CustomForm>
    )
});

export default TaskEdit;