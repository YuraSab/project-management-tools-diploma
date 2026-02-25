import { Droppable } from '@hello-pangea/dnd';
import { ReactNode } from 'react';

type DroppableColumnBodyProps = {
  droppableId: string;
  children: ReactNode;
};

export const DroppableColumnBody = ({ droppableId, children }: DroppableColumnBodyProps) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{width: "100%"}}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
