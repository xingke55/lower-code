import { Modal, Segmented } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { GoToLink, type GoToLinkConfig } from './GoToLink';
import { ShowMessage, type ShowMessageConfig } from './ShowMessage';
import type { CustomJSConfig } from './CustomJS';
import { CustomJS } from './CustomJS';
import { useEffect, useRef } from 'react';
import { ComponentMethod } from './ComponentMethod';
export type ActionConfig = GoToLinkConfig | ShowMessageConfig | CustomJSConfig;
interface ActionModalProps {
  visible: boolean;
  action?: ActionConfig;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}
export function ActionModal(props: ActionModalProps) {
  debugger
  const { visible, handleOk, handleCancel, action } = props;
  const [key, setKey] = useState<string>('访问链接');
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  const setKeyRef = useRef();
  useLayoutEffect(() => {
    setKeyRef.current = setKey;
  }, [setKey]);
  useEffect(() => {
    const map = {
      goToLink: '访问链接',
      showMessage: '消息提示',
      customJS: '自定义 JS',
      componentMethod: '组件方法',
    };
    if (action?.type) {
      setKeyRef.current(map[action.type]);
    }
  }, [action?.type]);
  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => {
        handleOk(curConfig);
      }}
      onCancel={handleCancel}
    >
      <div className="h-125">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={['访问链接', '消息提示', '组件方法', '自定义 JS']}
        />
        {key === '访问链接' && (
          <GoToLink
            key="goToLink"
            defaultValue={action?.type === 'goToLink' ? action.url : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            key="showMessage"
            value={action?.type === 'showMessage' ? action.config : undefined}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '组件方法' && (
          <ComponentMethod
            key="componentMethod"
            value={action?.type === 'componentMethod' ? action.config : undefined}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '自定义 JS' && (
          <CustomJS
            key="customJS"
            defaultValue={action?.type === 'customJS' ? action.code : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
