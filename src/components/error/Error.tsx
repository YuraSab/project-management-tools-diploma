import React from 'react';
import {Ban, GlobeOff, LucideProps, SearchAlert, ServerCrash} from 'lucide-react';
import styles from './Error.module.css';
import {useProfileStore} from "../../store/profileStore.ts";

type ErrorType = 'not_found' | 'server_crash' | 'no_access' | 'network_problems';

interface ErrorConfig {
    Icon: React.ComponentType<LucideProps>,
    defaultText: string,
}

const ERROR_OPTIONS: Record<ErrorType, ErrorConfig> = {
    not_found: {
        Icon: SearchAlert,
        defaultText: 'Nothing found!',
    },
    server_crash: {
        Icon: ServerCrash,
        defaultText: 'Something wend wrong!',
    },
    no_access: {
        Icon: Ban,
        defaultText: 'You have no access to this project!',
    },
    network_problems: {
        Icon: GlobeOff,
        defaultText: 'Network problems!',
    }
};

interface ErrorProps {
    type: ErrorType,
    text?: string,
}

const Error = ({ type, text }: ErrorProps) => {
    const highlightColor = useProfileStore((state) => state.profile.highlightColor)
    const { Icon, defaultText } = ERROR_OPTIONS[type];
    return (
        <div className={styles.block}>
            <h2 style={{ color: highlightColor }}>{text ? text : defaultText}</h2>
            <Icon size={54} color={highlightColor}/>
        </div>
    );
};

export default Error;