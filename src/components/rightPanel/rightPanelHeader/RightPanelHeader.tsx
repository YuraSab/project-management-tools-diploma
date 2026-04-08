import React from "react";
import {X} from "lucide-react";
import styles from "./RightPanelHeader.module.css";

interface RightPanelHeaderProps {
    taskTitle: string,
    setIsRightPanelActive: (value: boolean) => void,
}

const RightPanelHeader = ({taskTitle, setIsRightPanelActive}: RightPanelHeaderProps) => {
    return (
        <div className={styles.titleBlock}>
            <h1>{taskTitle}</h1>
            <div className={styles.controlIcons}>
                <X
                    onClick={() => setIsRightPanelActive(false)}
                    size={34}
                />
            </div>
        </div>
    );
};

export default React.memo(RightPanelHeader);