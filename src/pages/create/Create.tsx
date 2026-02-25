import { FolderKanban, UserPlus } from "lucide-react";
import styles from "./Create.module.css";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";

const Create = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const themeClassMap = {
        purple: styles.purpleBlock,
        green: styles.greenBlock,
        blue: styles.blueBlock,
        orange: styles.orangeBlock,
    };
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    
    return(
        <div className={styles.main} style={{backgroundColor: backgroundMode === "black" ? "black" : "#f9f9fb", color: "black"}}>
            <NavLink to={"/create/project"}>
                <article className={`${styles.card} ${highlightMode && themeClassMap[highlightMode]}`}>
                    <h3>New project</h3>
                    <FolderKanban size={40}/>
                </article>
            </NavLink>
            { currentUser?.role === "admin" &&
            <NavLink to={"/create/user"}>
                <article className={`${styles.card} ${highlightMode && themeClassMap[highlightMode]}`}>
                    <h3>New user</h3>
                    <UserPlus size={40}/>
                </article>
            </NavLink>
            }

        </div>
    )
}

export default Create;