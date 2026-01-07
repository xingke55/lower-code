import { useMaterailDrop } from '../../hooks/useMaterialDrop';
import type { CommonComponentProps } from '../Page/dev';
function Modal({ id, children, title, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

  return (
    <div
      ref={drop}
      style={styles}
      data-component-id={id}
      className={`min-h-25 p-5 ${
        canDrop ? 'border-2 border-[blue]' : 'border'
      }`}
    >
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
