import { NavLink } from "react-router-dom";
import styles from "./Projects.module.css";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Project } from "../../types/project";
import { useUserProjects } from "../../hooks/users/useUserProjects";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";

const Projects = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const { data: projects, isLoading, isError } = useUserProjects(currentUser?.id || "");

    const selectedProject = useProjectControlStore((state) => state.selectedProject);
    const clearFiltersAndSorts = useProjectControlStore((state) => state.clearFiltersAndSorts);
    const setSelectedProject = useProjectControlStore((state) => state.setSelectedProject);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);

    const handleChoseProject = (chosenProject: Project) => {
        if (chosenProject.id !== selectedProject?.id)
            clearFiltersAndSorts();
        setSelectedProject(chosenProject);
    }

    const themeClassMap = {
        purple: styles.purpleBlock,
        green: styles.greenBlock,
        blue: styles.blueBlock,
        orange: styles.orangeBlock,
    };
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: Something went wrong while fetching the projects!{isError}</div>;
    if (projects?.length === 0) return <div>No projects found.</div>;
    
    return(
        <div className={styles.main} style={{backgroundColor: backgroundMode === "black" ? "black" : "#f9f9fb", color: "black"}}>
            {
                projects?.map((project) => 
                    <NavLink to={`/projects/${project.id}`} key={project.id} onClick={() => handleChoseProject(project)}>
                        <div className={`${styles.element} ${highlightMode && themeClassMap[highlightMode]}`}>
                            <div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </NavLink>
                )
            }
        </div>
    )
}

export default Projects;