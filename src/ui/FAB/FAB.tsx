import React, {HTMLAttributes} from 'react';
import styles from './Fab.module.css';
import {useProfileStore} from "../../store/profileStore.ts";

interface FabProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
}

const Fab = ({ children, onClick, className, style, ...rest }: FabProps) => {
    const highlightColor = useProfileStore((state) => state.profile.highlightColor);
    const combinedStyles: React.CSSProperties = {
        backgroundColor: highlightColor,
        ...style,
    };
    const combinedClasses = `${styles.fab} ${className || ''}`.trim();

    return (
        <div
            {...rest}
            onClick={onClick}
            className={combinedClasses}
            style={combinedStyles}
        >
            {children}
        </div>
    );
};

export default Fab;