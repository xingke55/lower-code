import type { CommonComponentProps } from '../Page/dev';

const Container = (props: CommonComponentProps) => {
  const { children, styles } = props;
  return (
    <div style={styles} className="p-[20px]">
      {children}
    </div>
  );
};

export default Container;
