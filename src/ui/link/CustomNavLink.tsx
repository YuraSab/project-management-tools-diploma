import { NavLink, NavLinkProps } from "react-router-dom"
import { useUserThemeStore } from "../../store/userThemeStore";
import React from "react";

interface CustomNavLinkProps extends NavLinkProps  {
    className?: string,
    customStyles?: React.CSSProperties,
}

const CustomNavLink = ({ className = "", customStyles = {}, ...navLinkProps }: CustomNavLinkProps) => {
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const linkColorStyle = ({isActive}: {isActive: boolean}) => ({
        color: isActive 
        ? highlightMode 
        : backgroundMode === "black" ? "white" : "black",
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