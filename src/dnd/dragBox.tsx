import { FC, useEffect, type CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
interface BoxProps {
  color: string;
  text: string;
}
export const DragBox: FC<BoxProps> = (props) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'drag-box',
      item: { color: props.color },
      collect: (monitor) => {
        return {
          isDragging: !!monitor.isDragging(),
          opacity: monitor.isDragging() ? 0.4 : 1,
        };
      },
    }),
    []
  );
  useEffect(() => {
    preview(getEmptyImage());
  }, []);
  const { color, text } = props;
  const dragCss: CSSProperties = isDragging
    ? {
        border: '5px dashed #000',
        boxSizing: 'border-box',
      }
    : {};
  const boxNormalCSS: CSSProperties = {
    width: '100px',
    height: '100px',
    backgroundColor: color,
  };

  const boxCSS = Object.assign({}, dragCss, boxNormalCSS);
  return (
    <div ref={drag} style={boxCSS}>
      {text}
    </div>
  );
};
