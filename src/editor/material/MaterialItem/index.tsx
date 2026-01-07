import { useDrag } from 'react-dnd';
interface MaterialItemProps {
  name: string;
  desc: string;
}
export function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props;
  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
    collect: (monitor) => {

      return {
        isDragging: !!monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      };
    },
  });

  return (
    <div
      ref={drag}
      className="
            border-dashed
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
        "
    >
      {desc}
    </div>
  );
}
