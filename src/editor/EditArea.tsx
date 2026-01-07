import { useEditorStore } from './store/store';
import type { Component } from './store/store';
import { useComponentConfigStore } from './store/component-config';
import React, { useState } from 'react';
import HoverMask from './components/HoverMask';
import SelectedMask from './components/SelectedMask';
export default function EditArea() {
  const { components, curComponentId, setCurComponentId } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<number>();
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(componentId);
        return;
      }
    }
  };

  const handleMouseLeave = () => {
    setHoverComponentId(undefined);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;
      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setCurComponentId(componentId);
        return;
      }
    }
  };
  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig[component.name];
      if (!config?.dev) {
        return null;
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles:component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="h-[100%] edit-area"
    >
      {renderComponents(components)}
      {hoverComponentId && curComponentId !== hoverComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
