import React, { useRef } from 'react';
import { message } from 'antd';
import { useComponentConfigStore } from './store/component-config';
import { useEditorStore } from './store/store';
import type { Component } from './store/store';
import type { ActionConfig } from './setting/actions/ActionModal';
export function Preview() {
  const { components } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();
  const componentRefs = useRef<Record<string, any>>({});
  function handleEvent(component: Component) {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === 'goToLink') {
              window.location.href = action.url;
            } else if (action.type === 'showMessage') {
              if (action.config.type === 'success') {
                message.success(action.config.text);
              } else if (action.config.type === 'error') {
                message.error(action.config.text);
              }
            } else if (action.type === 'customJS') {
              const func = new Function('context', action.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content);
                },
              });
            } else if (action.type === 'componentMethod') {
              debugger
              const component = componentRefs.current[action.config.componentId];

              if (component) {
                component[action.config.method]?.();
              }
            }
          });
        };
      }
    });
    return props;
  }
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
          ref: (ref: Record<string, any>) => {
            componentRefs.current[component.id] = ref;
          },
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
