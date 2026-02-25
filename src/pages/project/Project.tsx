import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProjectTasks } from "../../hooks/project/useProjectTasks";
import { useProjectControlStore } from "../../store/projectControlStore";
import { Task, TaskStatus } from "../../types/task";
import { AlignJustify } from "lucide-react";
import LeftPanelProject from "../../components/leftPanel/leftPanelProject/LeftPanelProject";
import { DropResult } from "@hello-pangea/dnd";
import { updateTask } from "../../services/taskApi";
import KanbanBoard from "../../components/kanban/kanbanBoard/KanbanbBoard";
import RightPanelProject from "../../components/rightPanel/rightPanelProject/RightPanelProject";
import { useUserStore } from "../../store/userStore";
import { useProject } from "../../hooks/project/useProject";

const Project = () => {
    const { projectId } = useParams();
    const { data: currentProject } = useProject(projectId || "");
    const { data: projectTasks } = useProjectTasks(projectId || "");

    const selectedTask = useProjectControlStore((state) => state.selectedTask);
    const setSelectedTask = useProjectControlStore((state) => state.setSelectedTask);
    const isRightPanelActive = useProjectControlStore((state) => state.isRightPanelActive);
    const setIsRightPanelActive = useProjectControlStore((state) => state.setIsRightPanelActive);
    const isLeftPanelActive = useProjectControlStore((state) => state.isLeftPanelActive);
    const setIsLeftPanelActive = useProjectControlStore((state) => state.setIsLeftPanelActive);
    const isAddTaskActive = useProjectControlStore((state) => state.isAddTaskActive);
    const setIsAddTaskActive = useProjectControlStore((state) => state.setIsAddTaskActive);
    const setIsEditTaskActive = useProjectControlStore((state) => state.setIsEditTaskActive);
    const statusFilter = useProjectControlStore((state) => state.statusFilter);
    const usersFilter = useProjectControlStore((state) => state.usersFilter);
    const startDateFilter = useProjectControlStore((state) => state.startDateFilter);
    const endDateFilter = useProjectControlStore((state) => state.endDateFilter);
    const priorityFilter = useProjectControlStore((state) => state.priorityFilter);
    const sortValue = useProjectControlStore((state) => state.sortValue);
    const currentUser = useUserStore((state) => state.currentUser);

    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: updateTask,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    });

    const controlPanelFilters = (status: TaskStatus): Task[] => {
      return projectTasks?.filter(task => 
        task.status === status &&
        (usersFilter.length === 0 || usersFilter.some(user => task.assignedMembers?.includes(user.id))) &&
        (!task.startDate || startDateFilter === "" || task.startDate >= startDateFilter) &&
        (!task.endDate || endDateFilter === "" || task.endDate <= endDateFilter) &&
        (!priorityFilter.length || task.priority && priorityFilter.includes(task.priority))
      ) || [];
    };
    const controlPanelSort = (tasks: Task[]): Task[] => {
      const returnTime = (date: string) => new Date(date || "").getTime();
      const sortCollection = {
        ["Start date dec"]: () => [...tasks].sort( (a, b) => returnTime(b.startDate as string) - returnTime(a.startDate as string) ),
        ["Start date inc"]: () => [...tasks].sort( (a, b) => returnTime(a.startDate as string) - returnTime(b.startDate as string) ),
        ["End date dec"]: () => [...tasks].sort( (a, b) => returnTime(b.endDate as string) - returnTime(a.endDate as string) ),
        ["End date inc"]: () => [...tasks].sort( (a, b) => returnTime(a.endDate as string) - returnTime(b.endDate as string) ),
        ["none"]: () => tasks,
      };
      return sortValue && sortCollection[sortValue] ? sortCollection[sortValue]() : tasks;
    }

    const todoTasks = controlPanelSort(controlPanelFilters("todo"));
    const inProgressTasks = controlPanelSort(controlPanelFilters("in_progress"));
    const doneTasks = controlPanelSort(controlPanelFilters("done"));

    const handleOnTaskClick = (task: Task) => {
      setIsAddTaskActive(false);
      setIsEditTaskActive(false);
      setSelectedTask(task);
      setIsRightPanelActive(true);
    }

    const handleDragEnd = async (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination) return; // if drop hsppened outer columns
      if (source.droppableId === destination.droppableId) return; // if drop hsppened in the same column
      try {
        const selectedTask = projectTasks?.find((t) => t.id === draggableId);
        if ( !selectedTask ) return;
        mutation.mutate({
          ...selectedTask,
          status: destination.droppableId as TaskStatus,
        });
      } catch( error ) {
        console.error("Failed to update task status:", error);
      }
    }

    const shouldShowColumn = (status: TaskStatus): boolean => {
      return statusFilter.length === 0 || statusFilter.includes(status);
    }

    const visibleColumnsCount = [
      shouldShowColumn("todo"),
      shouldShowColumn("in_progress"),
      shouldShowColumn("done"),
    ].filter(Boolean).length;

    const gridTemplateColumns =  `repeat(${visibleColumnsCount}, 1fr)`;

    
    if ( !currentUser || !currentProject?.assignedMembers.includes(currentUser?.id) )
      return <div>You have no access to this project!</div>

    return(
        <div style={{display: "flex"}}>
          {
            isLeftPanelActive 
            ? <div style={{lineHeight: "normal",}}><LeftPanelProject/></div>
            : <div style={{padding: "35px 0 0 15px"}} onClick={() => setIsLeftPanelActive(true)}><AlignJustify size={28}/></div>
          }
          <KanbanBoard
            handleDragEnd={handleDragEnd}
            shouldShowColumn={shouldShowColumn}
            gridTemplateColumns={gridTemplateColumns}
            handleOnTaskClick={handleOnTaskClick}
            todoTasks={todoTasks}
            inProgressTasks={inProgressTasks}
            doneTasks={doneTasks}
          />
          { isRightPanelActive && ( isAddTaskActive || selectedTask !== null ) && <RightPanelProject/> }
        </div>
    )
}

export default Project;