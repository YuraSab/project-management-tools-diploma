import styles from "./Header.module.css";
import HeaderModalAccout from "../headerModalAccout/HeaderModalAccout";
import { useUserStore } from "../../../store/userStore";
import CustomUserIcon from "../../../ui/icons/CustomUserIcon";
import { useUserThemeStore } from "../../../store/userThemeStore";
import CustomNavLink from "../../../ui/link/CustomNavLink";

const Header = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const iconColor = useUserThemeStore((state) => state.iconColor);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    return(
        <div className={styles.main} style={{backgroundColor: backgroundMode}}>
            <nav>
                <CustomNavLink to="/projects">Projects</CustomNavLink>
                <CustomNavLink to="/people">People</CustomNavLink>
                { (currentUser?.role === "admin" || currentUser?.role === "manager") &&
                <CustomNavLink to="/create">Create</CustomNavLink>
                }
            </nav>
            <CustomUserIcon title={currentUser ? currentUser.name : "User"} size={36} onClick={() => setHeaderModalActive(!headerModalActive)} backgroundColor={iconColor} />
            { headerModalActive && <HeaderModalAccout/> }
        </div>
    )
}

export default Header;