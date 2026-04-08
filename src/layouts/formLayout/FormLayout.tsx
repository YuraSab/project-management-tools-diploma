import { ReactNode } from "react"
import styles from "./FormLayout.module.css";
import {useProfileStore} from "../../store/profileStore.ts";

interface FormLayoutProps {
    children: ReactNode,
}

const FormLayout = ({ children }: FormLayoutProps) => {
    const theme = useProfileStore((state) => state.profile);

    return <div 
        className={styles.formLayout}  
        style={{
            backgroundColor: theme === "black" ? "black" : "#f9f9fb",
            color: "black",
        }}
    >
        { children }
    </div>
}

export default FormLayout;