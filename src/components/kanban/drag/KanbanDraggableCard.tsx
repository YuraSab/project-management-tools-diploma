import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../../types/task';
import KanbanCard from '../kanbanCard/KanbanCard';
import {memo} from "react";

type KanbanDraggableCardProps = {
  task: Task;
  index: number;
  handleOnTaskClick: (task: Task) => void;
};

const KanbanDraggableCard = ({ task, index, handleOnTaskClick }: KanbanDraggableCardProps) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={"w-full"}
        >
          <KanbanCard task={task} handleOnTaskClick={handleOnTaskClick} />
        </div>
      )}
    </Draggable>
  );
};

export default memo(KanbanDraggableCard);