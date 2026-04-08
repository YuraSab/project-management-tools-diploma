import React from 'react';
import styles from './Fab.module.css';
import {useProfileStore} from "../../store/profileStore.ts";

interface FabProps {
    children: React.ReactNode,
    onClick?: () => void,
}

const Fab = ({ children, onClick }: FabProps) => {
    const highlightColor = useProfileStore((state) => state.profile.highlightColor)
    return (
        <div
            onClick={onClick}
            className={styles.fab}
            style={{ backgroundColor: highlightColor }}
        >
            {children}
        </div>
    );
};

export default Fab;