import { Button as AntdButton } from 'antd';
import type { CommonComponentProps } from '../Page/dev';
import { useDrag } from 'react-dnd';
type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';

export interface AddButtonProps extends CommonComponentProps {
  text: string;
  type?: ButtonType;
  onClick?: () => void;
}

const Button = (props: AddButtonProps) => {
  const { id, text, styles, type = 'default' } = props;
  const [, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
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
  return (
    <AntdButton data-component-id={id} type={type} style={styles} ref={drag}>
      {text}
    </AntdButton>
  );
};

export default Button;
