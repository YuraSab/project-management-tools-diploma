import React from "react";
import styles from "./AuthFormLayout.module.css";

interface AuthFormLayoutProps {
    onSubmit: () => void,
    children: React.ReactNode,
    customStyles?: React.CSSProperties,
}

const AuthFormLayout = ({onSubmit, children, customStyles}: AuthFormLayoutProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div
            className={styles.mainOverlay}
            style={customStyles}
        >
            <form
                onSubmit={handleSubmit}
                className={styles.formAuth}
            >
                {children}
            </form>
        </div>
    );
}

export default AuthFormLayout;