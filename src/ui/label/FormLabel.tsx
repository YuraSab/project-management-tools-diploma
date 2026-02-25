import { ReactNode } from "react";
import styles from "./FormLabel.module.css";
import { useUserThemeStore } from "../../store/userThemeStore";

interface FormLabel{
    text: string, 
    children: ReactNode,
}

const FormLabel = ({ text, children }: FormLabel) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return <label className={styles.customLabel} style={{color: backgroundMode === "black" ? "white" : "#1f2937"}}>
        {text}
        {children}
    </label>
}

export default FormLabel;