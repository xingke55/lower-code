import { Modal as AntdModal } from 'antd';
import { useImperativeHandle, useState, type RefObject } from 'react';
import type { CommonComponentProps } from '../Page/dev';
export interface ModalRef {
  open: () => void;
  close: () => void;
}
export interface ModalProps extends CommonComponentProps {
  ref: RefObject<ModalRef | null>;
}
const Modal = (props: ModalProps) => {
  const { children, title, onOk, onCancel, styles, ref } = props;
  const [open, setOpen] = useState(true);
  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      };
    },
    []
  );
  return (
    <AntdModal
      title={title}
      style={styles}
      open={open}
      onCancel={() => {
        onCancel();
        setOpen(false);
      }}
      onOk={() => {
        onOk();
      }}
      destroyOnHidden
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
