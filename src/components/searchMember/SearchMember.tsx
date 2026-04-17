import React, {useCallback, useEffect, useState} from "react";
import styles from "./SearchMember.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import {UserPlus} from "lucide-react";
import {useUpdateUser} from "../../hooks/users/useUpdateUser.ts";
import {useProfileStore} from "../../store/profileStore.ts";
import {useSearchUsers} from "../../hooks/users/useSearchUsers.ts";
import {useShallow} from "zustand/react/shallow";
import Error from "../error/Error.tsx";

const SearchMember = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debounceTerm, setDebounceTerm] = useState<string>('');
    const {profile, editProfile} = useProfileStore(useShallow((state) => ({
        profile: state.profile, editProfile: state.editProfile
    })));
    const {mutate: updateUser} = useUpdateUser();
    const {data: searchMembers, isPending, isError} = useSearchUsers(debounceTerm);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceTerm(searchTerm);
        }, 700);
        return () => clearTimeout(timerId);
    }, [searchTerm]);

    const handleReserveUser = useCallback((userId: string) => {
        if (profile.reservedMembers.includes(userId)) return alert('User already added!');

        const reservedMembers = [...profile.reservedMembers, userId];
        updateUser({
            uid: profile.uid,
            reservedMembers: reservedMembers
        });
        editProfile({reservedMembers});
        setSearchTerm('');
        setDebounceTerm('');
    }, [profile, updateUser, editProfile]);

    return (
        <>
            <input
                type={"text"}
                value={searchTerm}
                className={styles.searchInput}
                placeholder={"Search user by email..."}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isPending && debounceTerm.trim() !== "" && <p>Searching...</p>}   {/* todo - add better ui */}
            {isError && <Error type={'server_crash'}  style={{ padding: 10 }}/>}
            <ul>
                {
                    searchMembers && searchMembers.length > 0 ? (
                        searchMembers.map((m) => (
                            <li key={m.uid} className={styles.element}>
                                <div className={styles.userIconContainer}>
                                    <CustomUserIcon title={m.displayName[0] || m.displayName[0]} backgroundColor={m.iconColor}/>
                                </div>
                                <h3>{m.email}</h3>
                                <div className={styles.buttonsContainer}>  {/* todo - if user added - show check icon, if not - plus, if this is searcher - 'you' or sth */}
                                    <UserPlus size={30} onClick={() => handleReserveUser(m.uid)}/>
                                </div>
                            </li>
                        ))
                    ) : (
                        debounceTerm.trim() !== '' && !isPending && <Error type={'not_found'} style={{ padding: 10 }}/>
                    )
                }
            </ul>

        </>
    )
}

export default SearchMember;