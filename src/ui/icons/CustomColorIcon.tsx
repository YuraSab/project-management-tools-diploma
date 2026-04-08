import { Check } from "lucide-react";
import styles from "./CustomColorIcon.module.css";
import {useProfileStore} from "../../store/profileStore.ts";
import {ColorPalette, UserProfile} from "../../types/user.ts";

interface CustomColorIconProps<T extends string> {
    backgroundColor: T,
    size?: number,
    field: keyof UserProfile,
    onClick: (field: keyof UserProfile, color: ColorPalette) => void,
    currentColor: T,
}

const CustomColorIcon = <T extends string>({ backgroundColor, size = 36, field, onClick, currentColor }: CustomColorIconProps<T>) => {
    const theme = useProfileStore((state) => state.profile.theme);
    return(
        <div 
            className={`${styles.iconBlock}`} 
            style={{ 
                width: size, 
                height: size, 
                backgroundColor: backgroundColor, 
                color: backgroundColor === "white" ? "black" : "white", 
                borderColor: theme === "black" ? "white" :"black"
            }} 
            onClick={() => onClick(field, backgroundColor)}
        >
            { currentColor === backgroundColor && <Check/> }
        </div>
    )
}

export default CustomColorIcon;