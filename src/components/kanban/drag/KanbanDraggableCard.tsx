import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../../types/task';
import KanbanCard from '../kanbanCard/KanbanCard';

type Props = {
  task: Task;
  index: number;
  handleOnTaskClick: (task: Task) => void;
};

export const KanbanDraggableCard = ({ task, index, handleOnTaskClick }: Props) => {
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
