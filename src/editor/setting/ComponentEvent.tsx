import { useEditorStore,getComponentById } from '../store/store';
import { useState } from 'react';
import { useComponentConfigStore } from '../store/component-config';
import { Collapse, Button } from 'antd';
import type { CollapseProps } from 'antd';
import type { ComponentEvent } from '../store/component-config';
import { ActionModal } from './actions/ActionModal';
import type { GoToLinkConfig } from './actions/GoToLink';
import type { ShowMessageConfig } from './actions/ShowMessage';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ActionConfig } from './actions/ActionModal';

export const ComponentEvent = () => {
  const { curComponent, updateComponent, components } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [curAction, setCurAction] = useState<ActionConfig>();
  const [curActionIndex, setCurActionIndex] = useState<number>();
  function deleteAction(event: ComponentEvent, index: number) {
    if (!curComponent) {
      return;
    }

    const actions = curComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponent(curComponent.id, {
      [event.name]: {
        actions: actions,
      },
    });
  }
  const handleModalOk = (config: GoToLinkConfig | ShowMessageConfig) => {
    if (!config || !curEvent || !curComponent) {
      return;
    }

    if (curAction) {
      updateComponent(curComponent.id, {
        [curEvent.name]: {
          actions: curComponent.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curActionIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponent(curComponent.id, {
        [curEvent.name]: {
          actions: [...(curComponent.props[curEvent.name]?.actions || []), config],
        },
      });
    }

    setActionModalOpen(false);
  };
  function editAction(config: ActionConfig, index: number) {
    if (!curComponent) {
      return;
    }
    setCurAction(config);
    setCurActionIndex(index);
    setActionModalOpen(true);
  }
  if (!curComponent) return null;
  console.log(curComponent, componentConfig);

  const items: CollapseProps['items'] = (componentConfig[curComponent.name].events || []).map(
    (event) => {
      return {
        key: event.name,
        label: (
          <div className="flex justify-between leading-7.5">
            {event.label}
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setCurEvent(event);
                setActionModalOpen(true);
              }}
            >
              添加动作
            </Button>
          </div>
        ),
        children: (
          <div>
            {(curComponent.props[event.name]?.actions || []).map(
              (item: ActionConfig, index: number) => {
                return (
                  <div key={Math.random() + index}>
                    {item.type === 'goToLink' ? (
                      <div className="border border-[#aaa] m-2.5 p-2.5 relative">
                        <div className="text-[blue]">跳转链接</div>
                        <div>{item.url}</div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                          onClick={() => deleteAction(event, index)}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    ) : null}
                    {item.type === 'showMessage' ? (
                      <div className="border border-[#aaa] m-2.5 p-2.5 relative">
                        <div className="text-[blue]">消息弹窗</div>
                        <div>{item.config.type}</div>
                        <div>{item.config.text}</div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                          onClick={() => deleteAction(event, index)}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    ) : null}
                    {item.type === 'customJS' ? (
                      <div key="customJS" className="border border-[#aaa] m-2.5 p-2.5 relative">
                        <div className="text-[blue]">自定义 JS</div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                          onClick={() => deleteAction(event, index)}
                        >
                          <DeleteOutlined />
                        </div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>
                      </div>
                    ) : null}
                    {item.type === 'componentMethod' ? (
                      <div
                        key="componentMethod"
                        className="border border-[#aaa] m-2.5 p-2.5 relative"
                      >
                        <div className="text-[blue]">组件方法</div>
                        <div>{getComponentById(item.config.componentId, components)?.desc}</div>
                        <div>{item.config.componentId}</div>
                        <div>{item.config.method}</div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 30, cursor: 'pointer' }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>
                        <div
                          style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                          onClick={() => deleteAction(event, index)}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            )}
          </div>
        ),
      };
    }
  );

  return (
    <div className="px-2.5">
      <Collapse
        className="mb-2.5"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name].events?.map((item) => item.name)}
      />
      <ActionModal
        visible={actionModalOpen}
        action={curAction}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
};
