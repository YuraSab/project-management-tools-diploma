import { ReactNode } from "react"
import styles from "./FormLayout.module.css";
import { useUserThemeStore } from "../../store/userThemeStore";

interface FormLayoutProps {
    children: ReactNode,
}

const FormLayout = ({ children }: FormLayoutProps) => {
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return <div 
        className={styles.formLayout}  
        style={{
            backgroundColor: backgroundMode === "black" ? "black" : "#f9f9fb", 
            color: "black",
        }}
    >
        { children }
    </div>
}

export default FormLayout;