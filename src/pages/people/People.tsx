import {UserMinus, UserPen} from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./People.module.css";
import {useNavigate} from "react-router-dom";
import SearchMember from "../../components/searchMember/SearchMember";
import {useProfileStore} from "../../store/profileStore.ts";
import {useProjectUsers} from "../../hooks/project/useProjectUsers.ts";
import {useUpdateUser} from "../../hooks/users/useUpdateUser.ts";
import {useShallow} from "zustand/react/shallow";
import React from "react";
import {Role} from "../../types/user.ts";

const People = () => {
    const navigate = useNavigate();

    const { profile , editProfile } = useProfileStore(useShallow((state) => ({
        profile: state.profile, editProfile: state.editProfile
    })));
    const { data: reservedMembers } = useProjectUsers(profile.reservedMembers);
    const { mutate: updateProfile } = useUpdateUser();

    const handleRemoveReservedMember = (memberId: string) => {
        if (!profile.id) return alert('Profile not found.');
        const updatedReservedMembers = profile.reservedMembers.filter(mId => mId !== memberId);
        updateProfile({
            uid: profile.uid,
            reservedMembers: updatedReservedMembers
        }, {
            onSuccess: () => editProfile({ reservedMembers: updatedReservedMembers })
        });
    };

    return(
        <div className={styles.main}>
            <SearchMember/>
            <ul>
                {
                    reservedMembers && reservedMembers.length > 0 ? (
                    reservedMembers.map((m) => (
                        <li key={m.uid} className={styles.element}>
                            <div className={styles.userIconContainer}>
                                <CustomUserIcon title={m.displayName[0]} backgroundColor={m.iconColor}/>
                            </div>
                            <h3>{m.email}</h3>
                            <div className={styles.buttonsContainer}>
                                {profile.role === Role.Admin && (
                                    <UserPen size={30} onClick={() => navigate(`/edit/user/${m.uid}`)}/>
                                )}
                                <UserMinus size={30} onClick={() => handleRemoveReservedMember(m.uid)}/>
                            </div>
                        </li>
                    ))) : (
                        <p>no added</p> // todo - add better ui
                    )
                }
            </ul>
        </div>
    )
}

export default People;