import React, {useEffect} from "react";
import styles from "./FilterMembers.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import {SquarePlus} from "lucide-react";
import {UserProfile} from "../../types/user";
import BlurWrapper from "../../ui/blurWrapper/BlurWrapper.tsx";

interface FilterMemberProps {
    members: UserProfile[],
    selectedMembersIds: Set<string>,
    memberClickAction: (member: UserProfile) => void,
    exitAction: () => void,
}

const FilterMembers: React.FC<FilterMemberProps> = ({members, selectedMembersIds, memberClickAction, exitAction}) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <BlurWrapper closeEvent={exitAction}>
            {
                members &&
                members.map((m) =>
                    <div className={styles.element} key={m.uid}>
                        <div className={styles.iconAndTitle}>
                            <CustomUserIcon title={m.displayName[0]} backgroundColor={m.iconColor}/>
                            <h3>{m.displayName}</h3>
                        </div>
                        <button onClick={() => memberClickAction(m)}>
                            <SquarePlus
                                size={30}
                                color={selectedMembersIds.has(m.uid) ? 'green' : 'black'}
                            />
                        </button>
                    </div>
                )
            }
        </BlurWrapper>
    )
}

export default FilterMembers;