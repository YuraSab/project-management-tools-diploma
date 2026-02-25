import { useQuery } from "@tanstack/react-query";
import { UserTheme } from "../../types/userTheme";

const fetchUsersThemes = async (themes: string[]): Promise<UserTheme[]> => {
    const response = await fetch("http://localhost:3001/userThemes");
    if ( !response.ok ) {
        throw new Error(`HTTP Error during fetching users. Status: ${response.status}`);
    }
    const data: UserTheme[] = await response.json();
    return data.filter((theme) => !!themes.includes(theme.id));
}

export const useUsersThemes = (themes: string[]) => {
    return useQuery({
        queryKey: ["usersThemes", themes], // reserved as key for cache
        queryFn: () => fetchUsersThemes(themes),
        enabled: !!themes.length, // don`t apply if list is empty
    });
}