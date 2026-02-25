import React, { ReactNode } from "react";
import styles from "./CustomForm.module.css";
import { useUserThemeStore } from "../../store/userThemeStore";

interface CustomFormProps {
    children: ReactNode,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    customStyles?: React.CSSProperties,
}

const CustomForm = ({ children, onSubmit, customStyles }: CustomFormProps) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return <form className={`${styles.customForm} ${backgroundMode === "black" ? styles.dark : styles.light}`} onSubmit={onSubmit} style={customStyles}>
        { children }
    </form>
}

export default CustomForm;