import React from "react";
import styles from "./AuthFormLayout.module.css";

interface AuthFormLayoutProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode,
    customStyles?: React.CSSProperties,
}

const AuthFormLayout = ({ handleSubmit, children, customStyles }: AuthFormLayoutProps) => {
    return <div className={styles.mainOverlay} style={customStyles}>
        <form onSubmit={handleSubmit} className={styles.formAuth}>
            { children }
        </form>
    </div>
}

export default AuthFormLayout;