import { UserMinus, UserPen } from "lucide-react";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import styles from "./People.module.css";
import { useUserStore } from "../../store/userStore";
import { updateReservedMembers } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useReservedUsers } from "../../hooks/users/useReservedUsers";
import { useUsersThemes } from "../../hooks/usersThemes/useUserThemes";
import SearchMember from "../../components/searchMember/SearchMember";

const People = () => {
    const navigate = useNavigate();

    const currentUser = useUserStore((state) => state.currentUser);
    const setUser = useUserStore((state) => state.setLoggedInUser);

    const { data: users } = useReservedUsers(currentUser?.reservedMembers ?? []);
    const { data: usersThemes } = useUsersThemes(currentUser?.reservedMembers || []);

    const handleRemoveReservedUser = async (userId: string) => {
        if (!currentUser) return;
        try {
            const updatedReservedMembers = currentUser.reservedMembers.filter((id) => id !== userId);
            const updatedUser = await updateReservedMembers({
                id: currentUser.id,
                reservedMembers: updatedReservedMembers,
            });
            setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role,
                reservedMembers: updatedUser.reservedMembers,
            });
        } catch(error) {
            console.error("Error reserving user:", error);
        }
    }

    return(
        <div className={styles.main}>
            <SearchMember/>
            <ul className={styles.list}>
                {
                    users && users.map((user) => 
                        <li key={user.id} className={styles.element}>
                            <CustomUserIcon backgroundColor={usersThemes?.find((ut) => ut.userId === user.id)?.iconColor} title={user.name}/>
                            <h3>{user.name}</h3>
                            <div style={{display: "flex", gap: 24}}>
                                { currentUser?.role === "admin" && <UserPen size={30} onClick={() => navigate(`/edit/user/${user.id}`)}/> }
                                <UserMinus size={30} onClick={() => handleRemoveReservedUser(user.id)}/>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default People;