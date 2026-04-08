import styles from './BlurWrapper.module.css';
import {ReactNode, MouseEvent, KeyboardEvent} from "react";
import {X} from "lucide-react";

interface BlurWrapperProps {
    closeEvent?: () => void,
    children: ReactNode,
}

const BlurWrapper = ({closeEvent, children}: BlurWrapperProps) => {
    const handleClose = () => closeEvent?.();
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ')
            handleClose();
    };
    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return (
        <div
            className={styles.overlay}
            onClick={handleClose}
            onKeyDown={handleKeyDown}
            aria-label="Close overlay"
            role={'button'}
        >
            <div
                className={styles.content}
                onClick={handleContentClick}
                role="dialog"
            >
                <X
                    onClick={handleClose}
                    className={styles.x}
                    size={30}
                    color={'black'}
                    tabIndex={0}
                />
                {children}
            </div>
        </div>
    );
};

export default BlurWrapper;