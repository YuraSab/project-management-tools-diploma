import { Droppable } from "@hello-pangea/dnd";
import styles from "./KanbanColumn.module.css";
import { KanbanDraggableCard } from "./KanbanDraggableCard";
import { Task } from "../../../types/task";

type Props = {
  title: string;
  status: string;
  tasks: Task[];
  handleOnTaskClick: (task: Task) => void;
};

export const KanbanColumn = ({ title, status, tasks, handleOnTaskClick }: Props) => (
  <>
    <div className={styles.columnHeader}>{title}</div>
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.statusColumn}
          style={{width: "100%"}}
        >
          {tasks.map((task, index) => (
            <KanbanDraggableCard
              key={task.id}
              task={task}
              index={index}
              handleOnTaskClick={handleOnTaskClick}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </>
);
