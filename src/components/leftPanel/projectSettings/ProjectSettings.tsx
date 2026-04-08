import {useNavigate, useParams} from "react-router-dom";
import styles from "./ProjectSettings.module.css";
import {useProjectUsers} from "../../../hooks/project/useProjectUsers";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useProjectControlStore} from "../../../store/projectControlStore";
import FormTextInput from "../../../ui/input/FormTextInput";
import FormTextarea from "../../../ui/textArea/FormTextarea";
import FormDateInput from "../../../ui/input/FormDateInput";
import FormSelect from "../../../ui/select/FormSelect";
import {Project, ProjectStatus} from "../../../types/project";
import AssignMembers from "../../asignMembers/AssignMembers.tsx";
import CustomButton from "../../../ui/button/CustomButton";
import AddMember from "../../../modals/AddMember/AddMember";
import {UserProfile} from "../../../types/user.ts";
import {useProjectUpdate} from "../../../hooks/project/useProjectUpdate.ts";
import {useProjectDelete} from "../../../hooks/project/useProjectDelete.ts";
import Title from "../../../ui/title/Title.tsx";
import {useProfileStore} from "../../../store/profileStore.ts";
import {formatDateForInput} from "../../../utils/dateFormat.ts";
import {isDefined} from "../../../utils/isDefined.ts";
import {useProject} from "../../../hooks/project/useProject.ts";
import CopyIcon from "../../../ui/copyIcon/CopyIcon.tsx";

type FormData = Pick<Project, 'title' | 'description' | 'status'> & { startDate: string, endDate: string };

const INITIAL_PROJECT: FormData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: ProjectStatus.Planned,
};

const ProjectSettings: React.FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const profile = useProfileStore((state) => state.profile);
    const { data: project} = useProject(projectId || '');
    const { data: reservedMembers} = useProjectUsers(profile?.reservedMembers || []);
    const { data: projectMembers} = useProjectUsers(project?.assignedMembers || []);
    const isAddMembersActive = useProjectControlStore((state) => state.isAddMembersActive);
    const setIsAddMembersActive = useProjectControlStore((state) => state.setIsAddMembersActive);
    const [formData, setFormData] = useState<FormData>(INITIAL_PROJECT);
    const [localAssignedMembersIds, setLocalAssignedMembersIds] = useState<string[]>([]);

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                description: project.description,
                startDate: formatDateForInput(project.startDate),
                endDate: formatDateForInput(project.endDate),
                status: project.status,
            });
        }
    }, [project]);

    useEffect(() => {
        if (projectMembers)
            setLocalAssignedMembersIds(projectMembers.map(m => m.uid));
    }, [projectMembers]);

    const editProjectMutation = useProjectUpdate();
    const deleteProjectMutation = useProjectDelete();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAssignUserClick = useCallback((memberId: string) => {
        setLocalAssignedMembersIds((prev) => {
            return prev.includes(memberId)
                ? prev.filter(m => m !== memberId)
                : [...prev, memberId];
        });
    }, []);

    const totalMembersMap: Map<string, UserProfile> = useMemo(() => (
        new Map([...(projectMembers || []), ...(reservedMembers || [])]
            .map(m=> [m.uid, m]))
    ), [projectMembers, reservedMembers]);

    const assignedMembers: UserProfile[]  = useMemo(() => (
        localAssignedMembersIds
            .map(id => totalMembersMap.get(id))
            .filter<UserProfile>(isDefined)
    ), [localAssignedMembersIds, totalMembersMap]);

    const handleUpdateProject = async () => {
        if (!project) return;
        editProjectMutation.mutate({
            ...formData,
            id: project.id,
            assignedMembers: localAssignedMembersIds,
            startDate: formData.startDate ? new Date(formData.startDate) : null,
            endDate: formData.startDate ? new Date(formData.endDate) : null,
        });
    };

    const handleDeleteProject  = async () => {
        if (window.confirm("Are you sure, you wanna delete this project?")) {
            deleteProjectMutation.mutate(projectId || "");
            navigate("/projects");
        }
    };

    return(
        <div className={`${styles.settingsPanel} ${profile.theme === "black" ? styles.dark : styles.light}`} >
            <Title text={'ID:'}/>
            <div className={styles.displayInputLike}>{project?.id} <CopyIcon text={project?.id}/></div>
            <Title text={'Name:'}/>
            <FormTextInput name={"title"} value={formData.title} onChange={handleChange} placeholder={"title"}/>
            <Title text={'Description:'}/>
            <FormTextarea  name={"description"} value={formData.description} onChange={handleChange}/>
            <Title text={'Start date:'}/>
            <FormDateInput name={"startDate"} value={formData.startDate} onChange={handleChange}/>
            <Title text={'End date:'}/>
            <FormDateInput name={"endDate"} value={formData.endDate} onChange={handleChange}/>
            <Title text={'Status:'}/>
            <FormSelect<ProjectStatus> name={"status"} value={formData.status} onChange={handleChange} options={[ProjectStatus.Planned, ProjectStatus.InProgress, ProjectStatus.Completed]}/>
            <Title text={'Members:'}/>
            <AssignMembers
                assignedMembers={assignedMembers}
                setAddMembersActive={setIsAddMembersActive}
                maxIcons={2} iconSize={28}
            />
            <div className={styles.buttonBlock}>
                <CustomButton text={"Save changes"} onClick={() => handleUpdateProject()} disabled={editProjectMutation.isPending}/>
                { profile?.role === "admin" && <CustomButton text={"Delete project"} onClick={() => handleDeleteProject()} customStyles={{backgroundColor: "#D10000"}}/> }
            </div>
            <Title text={''}/>
            { isAddMembersActive &&
                <AddMember
                    membersMap={totalMembersMap}
                    selectedMembersIds={localAssignedMembersIds}
                    filterMemberAction={handleAssignUserClick}
                    exitAction={() => setIsAddMembersActive(false)}
                />
            }
        </div>
    )
}

export default ProjectSettings;