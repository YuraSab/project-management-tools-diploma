import { useEffect, useState } from "react";
import { useUser } from "../../hooks/users/useUser";
import styles from "./SearchMember.module.css";
import CustomUserIcon from "../../ui/icons/CustomUserIcon";
import { UserPlus } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";
import { updateReservedMembers } from "../../services/userApi";

const SearchMember = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [shouldSearch, setShouldSearch] = useState<boolean>(false);
    const [debouncerTimer, setDebouncerTimer] = useState<number | null>(null);
    
    const { data: searchedUser, refetch, isLoading, isError} = useUser(searchTerm, { enabled: false });

    const currentUser = useUserStore((state) => state.currentUser);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const setUser = useUserStore((state) => state.setLoggedInUser);


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if ( debouncerTimer ) clearTimeout(debouncerTimer);
        const timer = setTimeout(() => {
            setShouldSearch(true);
        }, 1000);
        setDebouncerTimer(timer);
    }
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if ( debouncerTimer ) 
                clearTimeout(debouncerTimer);
            setShouldSearch(true);
        }
    }

    const handleReserveUser = async (userId: string) => {
        if (!currentUser) return;
        if (currentUser.reservedMembers.includes(userId)) return;
        if (currentUser.id === userId) return;
        try {
            const updatedUser = await updateReservedMembers({
                id: currentUser.id,
                reservedMembers: [...currentUser.reservedMembers, userId],
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

    useEffect(() => {
        if ( shouldSearch && searchTerm !== "" ) {
            refetch();
            setShouldSearch(false);
        }
    }, [shouldSearch, searchTerm, refetch]);

    return(
        <>
            <input 
                type={"text"}
                value={searchTerm}
                className={styles.searchInput}
                placeholder={"Add user by ID..."}
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
            />
            {   isLoading && <h1 className={styles.searchElement}>Loading...</h1> }
            {   isError && <h1 className={styles.searchElement}>No search results</h1> }
            {
                !isLoading && !isError && searchedUser &&
                <div className={styles.searchElement} style={{borderColor: highlightMode}}>
                    <CustomUserIcon title={searchedUser.name}/>
                    <h3>{searchedUser.name}</h3>
                    <div style={{ width: 84 }}>
                    <UserPlus size={30} onClick={() => handleReserveUser(searchedUser.id)} style={{ justifySelf: "end" }}/>
                    </div>
                </div>
            }
        </>
    )
}

export default SearchMember;