import { Button as AntdButton } from 'antd';
import type { CommonComponentProps } from '../Page/dev';
type ButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';

export interface AddButtonProps extends CommonComponentProps {
  text: string;
  type?: ButtonType;
  onClick?: () => void;
}
const Button = ({ text, styles, type = 'default', ...props }: AddButtonProps) => {
  return (
    <AntdButton type={type} style={styles} {...props}>
      {text}
    </AntdButton>
  );
};

export default Button;
