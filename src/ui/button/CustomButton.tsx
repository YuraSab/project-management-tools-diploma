import React from "react";
import styles from "./FormButtonSubmit.module.css";
import {useProfileStore} from "../../store/profileStore.ts";

interface CustomButtonProps {
    text: string,
    onClick: (value: any) => void,
    customStyles?: React.CSSProperties
}

const CustomButton = ({ text, onClick, customStyles }: CustomButtonProps) => {
    const highlightColor = useProfileStore((state) => state.profile.highlightColor);
    return <button
        onClick={onClick}
        className={styles.customSubmitButton} 
        style={{
            backgroundColor: highlightColor,
            ...customStyles
        }}
    >
            {text}
    </button>
}

export default CustomButton;