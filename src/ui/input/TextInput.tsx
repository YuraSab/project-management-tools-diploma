import styles from "./Input.module.css";

interface TextInputProps {
    name: string, 
    value: string,
    onChange: (value: string) => void,
    required?: boolean,
}

const TextInput = ({ name, value , onChange, required }: TextInputProps) => {
    return <input 
        name={name} 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        required={required}
        type="text" 
        className={styles.cunstomInput}
    />
}

export default TextInput;