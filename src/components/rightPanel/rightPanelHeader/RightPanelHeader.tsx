import { Settings, X } from "lucide-react";
import styles from "./RightPanelHeader.module.css";
import { memo } from "react";

interface RightPanelHeaderProps {
    taskTitle: string,
    setIsEditTaskActive?: (value: boolean) => void,
    setIsRightPanelActive: (value: boolean) => void,
}

const RightPanelHeader = memo(({ taskTitle, setIsEditTaskActive, setIsRightPanelActive }: RightPanelHeaderProps) => {
    return <div className={styles.titleBlock}>
        <h1>{taskTitle}</h1>
        <div className={styles.controlIcons}>
            { setIsEditTaskActive && <Settings size={30} onClick={() => setIsEditTaskActive(false)}/> }
            <X size={34} onClick={() => setIsRightPanelActive(false)}/>
        </div>
    </div>
})

export default RightPanelHeader;