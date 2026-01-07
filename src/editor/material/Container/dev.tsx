import type { CommonComponentProps } from '../Page/dev';
import { useMaterailDrop } from '../../hooks/useMaterialDrop';
import { useDrag } from 'react-dnd';
import { useEffect, useRef } from 'react';
const Container = (props: CommonComponentProps) => {
  const { id, children, styles } = props;
  const ref = useRef<HTMLDivElement | null>();
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);
  const [, drag] = useDrag({
    type: 'Container',
    item: {
      type: 'Container',
      dragType: 'move',
      id,
    },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      };
    },
  });
  useEffect(() => {
    drop(drag(ref));
  }, [drag, drop]);
  return (
    <div
      style={styles}
      data-component-id={id}
      ref={ref}
      className="border border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
};

export default Container;
