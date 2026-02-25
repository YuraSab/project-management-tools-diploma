import { useUserThemeStore } from "../../store/userThemeStore";
import styles from "./FormButtonSubmit.module.css";

interface FormButtonSubmitProps {
    text: string,
    customStyles?: React.CSSProperties,
}

const FormButtonSubmit = ({ text, customStyles }: FormButtonSubmitProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    return <button 
        type="submit" 
        className={styles.customSubmitButton} 
        style={{
            backgroundColor: highlightMode,
            ...customStyles
        }}
    >
        {text}
    </button>
}

export default FormButtonSubmit;