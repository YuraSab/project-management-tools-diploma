import { LogOut, Paintbrush, UserRoundCog, X } from "lucide-react";
import styles from "./HeaderModalAcccout.module.css";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserThemeStore } from "../../../store/userThemeStore";

const HeaderModalAccout = () => {
    const navigate = useNavigate();
    const setLogoutUser = useUserStore((state) => state.setLogoutUser);
    const headerModalActive = useUserStore((state) => state.headerModalActive);
    const setHeaderModalActive = useUserStore((state) => state.setHeaderModalActive);
    const currentUser = useUserStore((state) => state.currentUser);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const clearTheme = useUserThemeStore((state) => state.clearTheme);

    const [hasCopied, setHasCopied] = useState<boolean>(false);

     const handleCopy = async(id: string) => {
        await navigator.clipboard.writeText(id);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
     }

     const handleClickPesonalisation = () => {
        navigate("/personalisation");
        setHeaderModalActive(false);
    }
    const handleClickAccount = () => {
        navigate(`/edit/user/${currentUser?.id}`);
        setHeaderModalActive(false);
    }

    const handleLogout = () => {
        setLogoutUser();
        setHeaderModalActive(!headerModalActive);
        clearTheme();
        navigate("/login");
    }

    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const themeClassMap = {
        purple: styles.purpleBlock,
        green: styles.greenBlock,
        blue: styles.blueBlock,
        orange: styles.orangeBlock,
    };
    const item = `${styles.item} ${highlightMode && themeClassMap[highlightMode]}`;
    
    return (
        <div className={styles.overlay}  onClick={() => setHeaderModalActive(false)}>
            <div className={styles.main} onClick={(event) => event.stopPropagation()} style={{backgroundColor: backgroundMode === "black" ? "black" : "wihte"}}>
                <div className={styles.exitBlock} style={{justifyContent: "end"}} onClick={() => setHeaderModalActive(!headerModalActive)}>
                    <X size={24}/>
                </div>
                <div className={item} onClick={() => handleCopy(currentUser?.id ?? "")}>
                    <h2>id:</h2>
                    <h2 style={{paddingRight: 7}}>{currentUser?.id}</h2>
                </div>
                {
                currentUser?.role === "admin" &&
                <div className={item} onClick={handleClickAccount}>
                    <h2>Account</h2>
                    <UserRoundCog size={20}/>
                </div>
                }
                <div className={item} onClick={handleClickPesonalisation}>
                    <h2>Personalisation</h2>
                    <Paintbrush size={20}/>
                </div>
                <div className={item} onClick={handleLogout}>
                    <h2>Logout</h2>
                    <LogOut size={20}/>
                </div>
                { hasCopied && <div className={styles.copyAlert}>Copied!</div> }
            </div>
        </div>
    )
}

export default HeaderModalAccout;