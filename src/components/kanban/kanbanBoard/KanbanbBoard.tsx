import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styles from "./KanbanBoard.module.css";
import { DroppableColumnBody } from "../drag/DroppableColumnBody";
import { KanbanDraggableCard } from "../drag/KanbanDraggableCard";
import { Task, TaskStatus } from "../../../types/task";

interface KanbanBoardProps {
    handleDragEnd: (dropValue: DropResult) => void,
    shouldShowColumn: (status: TaskStatus) => boolean,
    gridTemplateColumns: string,
    handleOnTaskClick: (task: Task) => void,
    todoTasks: Task[],
    inProgressTasks: Task[],
    doneTasks: Task[],
}

const KanbanBoard = ({ handleDragEnd, shouldShowColumn, gridTemplateColumns, handleOnTaskClick, todoTasks, inProgressTasks, doneTasks  }: KanbanBoardProps) => {
    
    return <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.kanbanBoard} style={{ gridTemplateColumns }}>
            { shouldShowColumn("todo") && <div className={`${styles.columnHeader} ${styles.todoHeader}`} >Todo</div> }
            { shouldShowColumn("in_progress") && <div className={`${styles.columnHeader} ${styles.inProgressHeader}`} >In Progress</div> }
            { shouldShowColumn("done") && <div className={`${styles.columnHeader} ${styles.doneHeader}`} >Done</div> }
            { shouldShowColumn("todo") &&
                <DroppableColumnBody droppableId="todo">
                    <div className={styles.statusColumn}>
                        {todoTasks.map((task, index) => (
                            <KanbanDraggableCard
                                key={task.id}
                                task={task}
                                index={index}
                                handleOnTaskClick={handleOnTaskClick}
                            />
                        ))}
                    </div>
                </DroppableColumnBody>
            }
            { shouldShowColumn("in_progress") &&
                <DroppableColumnBody droppableId="in_progress">
                    <div className={styles.statusColumn}>
                        {inProgressTasks.map((task, index) => (
                            <KanbanDraggableCard
                                key={task.id}
                                task={task}
                                index={index}
                                handleOnTaskClick={handleOnTaskClick}
                            />
                        ))}
                    </div>
                </DroppableColumnBody>
            }
            { shouldShowColumn("done") &&
                <DroppableColumnBody droppableId="done">
                    <div className={styles.statusColumn}>
                        {doneTasks.map((task, index) => (
                            <KanbanDraggableCard
                                key={task.id}
                                task={task}
                                index={index}
                                handleOnTaskClick={handleOnTaskClick}
                            />
                        ))}
                    </div>
                </DroppableColumnBody>
            }
        </div>
    </DragDropContext>
}

export default KanbanBoard;