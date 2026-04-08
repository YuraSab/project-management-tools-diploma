import React from "react";
import styles from "./FormButtonSubmit.module.css";
import {useProfileStore} from "../../store/profileStore.ts";

interface FormButtonSubmitProps {
    text: string,
    customStyles?: React.CSSProperties,
}

const FormButtonSubmit = ({ text, customStyles }: FormButtonSubmitProps) => {
    const highlightColor = useProfileStore((state) => state.profile.highlightColor);
    return <button 
        type="submit" 
        className={styles.customSubmitButton} 
        style={{
            backgroundColor: highlightColor,
            ...customStyles
        }}
    >
        {text}
    </button>
}

export default FormButtonSubmit;