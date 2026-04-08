import React, { useEffect } from "react";
import styles from "./AddMember.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { SquarePlus } from "lucide-react";
import {UserProfile} from "../../types/user";

interface AddMemberProps {
    membersMap: Map<string, UserProfile>,
    selectedMembersIds: string[],
    filterMemberAction: (memberId: string) => void,
    exitAction: () => void,
}
const AddMember: React.FC<AddMemberProps> = ({ membersMap, selectedMembersIds, filterMemberAction, exitAction }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const members = [...membersMap.values()];

    return(
        <div className={styles.mainOverlay} onClick={exitAction}>
            <div className={styles.main} onClick={(event) => event.stopPropagation()}>
                {
                    members &&
                    [...members].map((m) =>
                        <div className={styles.element} key={m.uid}>
                            <div className={styles.iconAndTitle}>
                                <CustomUserIcon title={m.displayName[0]} backgroundColor={m.iconColor} />
                                <h3>{m.displayName}</h3>
                            </div>
                            <div onClick={() => filterMemberAction(m.uid)}>
                                <SquarePlus
                                    size={30}
                                    color={selectedMembersIds.includes(m.uid) ? "green" : 'black'}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddMember;