import {NavLink, NavLinkProps} from "react-router-dom"
import React from "react";
import {useProfileStore} from "../../store/profileStore.ts";
import {Theme} from "../../types/user.ts";

interface CustomNavLinkProps extends NavLinkProps  {
    className?: string,
    customStyles?: React.CSSProperties,
}

const CustomNavLink = ({ className = "", customStyles = {}, ...navLinkProps }: CustomNavLinkProps) => {
    const profile = useProfileStore((state) => state.profile);
    const linkColorStyle = ({isActive}: {isActive: boolean}) => ({
        color: isActive 
            ? profile.highlightColor
            : profile.theme === Theme.Black ? Theme.Black : Theme.White,
        ...customStyles,
    });

    return (
        <NavLink
            {...navLinkProps}
            style={linkColorStyle}
            className={className}
        />
    )
}

export default CustomNavLink;