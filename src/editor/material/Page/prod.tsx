import { PropsWithChildren, type CSSProperties } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  styles: CSSProperties;
  [key: string]: any;
}
function Page({ children, styles }: CommonComponentProps) {
  return (
    <div className="p-[20px]" style={{ ...styles }}>
      {children}
    </div>
  );
}

export default Page;
