import { Check } from "lucide-react";
import styles from "./CustomColorIcon.module.css";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomColorIconProps<T extends string> {
    backgroundColor: T,
    size?: number,
    onClick: (color: T) => void,
    currentColor: T,
}

const CustomColorIcon = <T extends string>({ backgroundColor, size=36, onClick, currentColor }: CustomColorIconProps<T>) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return(
        <div 
            className={`${styles.iconBlock}`} 
            style={{ 
                width: size, 
                height: size, 
                backgroundColor: backgroundColor, 
                color: backgroundColor === "white" ? "black" : "white", 
                borderColor: backgroundMode === "black" ? "white" :"black" 
            }} 
            onClick={() => onClick(backgroundColor)}
        >
            { currentColor === backgroundColor && <Check/> }
        </div>
    )
}

export default CustomColorIcon;