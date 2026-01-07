import { useEffect, type FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
export interface CardItem {
  id: number;
  content: string;
}
interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: () => void;
}

interface DragData {
  index: number;
  id: number;
}
export const Card: FC<CardProps> = (props) => {
  const { data, index, swapIndex } = props;
  console.log(data, index);

  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id: data.id, index },
      collect: (monitor) => {
        return {
          isDragging: !!monitor.isDragging(),
          opacity: monitor.isDragging() ? 0.4 : 1,
        };
      },
    }),
    []
  );
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: 'card',
    drop(item: DragData, monitor) {
      console.log(index, item.index,"drop");

      swapIndex(index, item.index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  useEffect(() => {
    drag(drop(ref));
    console.log('ddd');
  }, [drag, drop]);
  return (
    <div className="card" ref={ref}>
      {data.content}
    </div>
  );
};
