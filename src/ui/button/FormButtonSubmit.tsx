import React from "react";
import styles from "./FormButtonSubmit.module.css";
import {useProfileStore} from "../../store/profileStore.ts";
import {HighlightColor} from "../../types/user.ts";

interface FormButtonSubmitProps {
    text: string,
    customStyles?: React.CSSProperties,
}

const FormButtonSubmit = ({ text, customStyles }: FormButtonSubmitProps) => {
    const profile = useProfileStore((state) => state.profile);
    return <button 
        type="submit" 
        className={styles.customSubmitButton} 
        style={{
            backgroundColor: profile?.highlightColor ?? HighlightColor.Purple,
            ...customStyles
        }}
    >
        {text}
    </button>
}

export default FormButtonSubmit;