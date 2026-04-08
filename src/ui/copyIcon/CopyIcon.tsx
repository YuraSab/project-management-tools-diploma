import React from 'react';
import {copyText} from "../../utils/copy.ts";
import {Copy} from "lucide-react";
import styles from './CopyIcon.module.css';

interface CopyIcon {
    text: string,
}

const CopyIcon = ({ text }: CopyIcon) => {
    const handleCopy = () => {
        copyText(text);
    };

    return (
        <Copy
            size={19}
            onClick={handleCopy}
            className={styles.copyIcon}
        />
    );
};

export default React.memo(CopyIcon);