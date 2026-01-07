import { PropsWithChildren, type CSSProperties } from 'react';

import { useMaterailDrop } from '../../hooks/useMaterialDrop';
export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  styles: CSSProperties;
  [key: string]: any;
}
function Page({ id, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container','Modal'], id);
  return (
    <div
      data-component-id={id}
      ref={drop}
      className="p-5 h-full box-border"
      style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}
    >
      {children}
    </div>
  );
}

export default Page;
