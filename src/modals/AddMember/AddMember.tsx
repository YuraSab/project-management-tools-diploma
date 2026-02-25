import React, { useEffect } from "react";
import styles from "./AddMember.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import { User } from "../../types/user";
import { UserTheme } from "../../types/userTheme";
import { useUserThemeStore } from "../../store/userThemeStore";

interface AddMemberProps {
    initiallyAssignedMembers?: User[],
    exitAction: () => void,
    selectedUsers: User[],
    handlerFilterUser: (value: User) => void,
    usersThemes?: UserTheme[],
}
const AddMember: React.FC<AddMemberProps> = ({ initiallyAssignedMembers, exitAction, selectedUsers, handlerFilterUser, usersThemes }) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return(
        <div className={styles.mainOverlay} onClick={exitAction}>
            <div className={styles.main} onClick={(event) => event.stopPropagation()} style={{backgroundColor: backgroundMode}}>
                {
                    initiallyAssignedMembers && initiallyAssignedMembers
                        .map((user) =>  
                            <div className={styles.element} key={user.id}>
                                <div className={styles.iconAndTitle}>
                                    <CustomUserIcon title={user.name[0]} backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor} />
                                    <h3>{user.name}</h3>
                                </div>
                                <div onClick={() => handlerFilterUser(user)}>
                                    <SquarePlus size={30} color={ selectedUsers.find((u) => u.id === user.id) ? "green" : backgroundMode === "black" ? "white" : "black" }/>
                                </div>
                            </div> 
                        )
                }
            </div>
        </div>
    )
}

export default AddMember;