import React from "react";
import { User } from "../../types/user";
import UserIconCollection from "../usersIconsCollection/UsersIconsCollection";
import styles from "./AsignMembers.module.css";
import { UserTheme } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface AsignMembersProps {
    users: User[],
    setAddMembersActive: (value: boolean) => void,
    uniqueText?: string,
    maxIcons?: number,
    iconSize?: number,
    usersThemes: UserTheme[],
}

const AsignMembers = React.memo(({ users, setAddMembersActive, maxIcons, iconSize, uniqueText, usersThemes }: AsignMembersProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const themeClassMap = {
        purple: styles._assignedMembers_button__purple,
        green: styles._assignedMembers_button__green,
        blue: styles._assignedMembers_button__blue,
        orange: styles._assignedMembers_button__orange,
    };
    return <div className={styles.asignBlock}>
        <label>Assigned Members:</label>
        <div className={`${styles.assignedMembers}`}>
            <button className={highlightMode && themeClassMap[highlightMode]} type="button" onClick={() => setAddMembersActive(true)}>{uniqueText ? uniqueText : "＋ Add Member"}</button>
        </div>
        { users  && <UserIconCollection usersThemes={usersThemes} users={users} maxIcons={maxIcons} size={iconSize}/> }
    </div>
});

export default AsignMembers;