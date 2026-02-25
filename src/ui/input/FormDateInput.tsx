import styles from "./Input.module.css";

interface FormDateInputProps {
    name: string, 
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
}

const FormDateInput = ({ name, value , onChange, required = false }: FormDateInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        type="date" 
        className={styles.cunstomInput}
    />
}

export default FormDateInput;