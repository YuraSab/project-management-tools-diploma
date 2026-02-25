import styles from "./FormTextarea.module.css";

interface FormTextareaProps {
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const FormTextarea = ({ name, value, onChange }: FormTextareaProps) => {
    return <textarea 
        name={name}
        value={value} 
        onChange={onChange}
        className={styles.customTextarea}
    />
}

export default FormTextarea;