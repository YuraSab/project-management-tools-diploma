import React, {useCallback, useMemo, useState} from "react";
import {Task, TaskPriority, TaskStatus} from "../../../types/task";
import {useParams} from "react-router-dom";
import CustomForm from "../../../ui/form/CustomForm";
import FormTextInput from "../../../ui/input/FormTextInput";
import FormTextarea from "../../../ui/textArea/FormTextarea";
import RightPanelHeader from "../../rightPanel/rightPanelHeader/RightPanelHeader";
import {useProjectControlStore} from "../../../store/projectControlStore";
import AssignMembers from "../../asignMembers/AssignMembers.tsx";
import FormSelect from "../../../ui/select/FormSelect";
import FormButtonSubmit from "../../../ui/button/FormButtonSubmit";
import styles from "./TaskAdd.module.css";
import FormDateInput from "../../../ui/input/FormDateInput";
import {useProject} from "../../../hooks/project/useProject";
import AddMember from "../../../modals/AddMember/AddMember";
import Title from "../../../ui/title/Title.tsx";
import {useProjectUsers} from "../../../hooks/project/useProjectUsers.ts";
import {useCreateTask} from "../../../hooks/task/useCreateTask.ts";
import {UserProfile} from "../../../types/user.ts";
import {isDefined} from "../../../utils/isDefined.ts";

type FormData = Pick<Task, 'title'| 'description'| 'status' | 'priority'> & { startDate: string, endDate: string };

const INITIAL_TASK: FormData = {
    title: '',
    description: '',
    status: "todo",
    startDate: '',
    endDate: '',
    priority: 'none',
};

const TaskAdd = React.memo(() => {
    const {projectId} = useParams();

    const [formData, setFormData] = useState<FormData>(INITIAL_TASK);
    const [assignedMembersIds, setAssignedMembersIds] = useState<string[]>([]);
    const [addMembersActive, setAddMembersActive] = useState<boolean>(false);

    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);

    const { data: project} = useProject(projectId || "");
    const { data: projectMembers} = useProjectUsers(project?.assignedMembers || []);
    const { mutate: createTask, isPending } = useCreateTask();

    const handleAssignUserClick = useCallback((memberId: string) => {
        setAssignedMembersIds((prev) =>
            prev.includes(memberId)
                ? prev.filter(m => m !== memberId)
                : [...prev, memberId]
        );
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!projectId) return alert("No project found!");
        if (!formData.title) return alert("Title is required!");

        createTask({
            ...formData,
            projectId,
            assignedMembers: assignedMembersIds,
            createdAt: new Date(),
            startDate: formData.startDate ? new Date(formData.startDate) : null,
            endDate: formData.endDate ? new Date(formData.endDate) : null,
        }, {
            onSuccess: () => {
                setFormData(INITIAL_TASK);
                setAssignedMembersIds([]);
            }
        });
    };

    const projectMembersMap = useMemo<Map<string, UserProfile>>(() => (
        new Map(projectMembers
            ? projectMembers.map(m => [m.uid, m])
            : []
        )
    ), [projectMembers]);

    const assignedMembers = useMemo<UserProfile[]>(() => (
        assignedMembersIds
            .map(id => projectMembersMap.get(id))
            .filter(isDefined)
    ), [assignedMembersIds, projectMembersMap]);

    return (
        <CustomForm disabled={isPending} onSubmit={handleSubmit} style={{margin: 15, height: "calc(100vh - 130px)"}}>
            <RightPanelHeader taskTitle={"Add task"} setIsRightPanelActive={setIsRightPanelActive}/>
            <div className={styles.rightPanelChild}>
                <Title text={'Title:'}/>
                <FormTextInput name="title" value={formData.title} onChange={handleChange} required/>
                <Title text={'Description:'}/>
                <FormTextarea name="description" value={formData.description} onChange={handleChange}/>
                <Title text={'Members:'}/>
                <AssignMembers
                    assignedMembers={assignedMembers}
                    setAddMembersActive={setAddMembersActive}
                    maxIcons={2} iconSize={28}
                />
                <Title text={'Status:'}/>
                <FormSelect<TaskStatus> name="status" value={formData.status} onChange={handleChange} options={["todo", "in_progress", "done"]}/>
                <Title text={'Priority:'}/>
                <FormSelect<TaskPriority> name="priority" value={formData.priority} onChange={handleChange} options={["low", "medium", "high", "none"]}/>
                <Title text={'Start date:'}/>
                <FormDateInput name={"startDate"} value={formData.startDate} onChange={handleChange}/>
                <Title text={'End date:'}/>
                <FormDateInput name={"endDate"} value={formData.endDate} onChange={handleChange}/>
                <FormButtonSubmit text={"Save changes"} customStyles={{width: "100%", marginTop: 16}} disabled={isPending}/>
            </div>
            {addMembersActive && (
                <AddMember
                    membersMap={projectMembersMap}
                    selectedMembersIds={assignedMembersIds}
                    filterMemberAction={handleAssignUserClick}
                    exitAction={() => setAddMembersActive(false)}
                />
            )}
        </CustomForm>
    )
});

export default TaskAdd;