import { useState, useEffect } from 'react';
import { useEditorStore, getComponentById } from '../../store/store';
import type { Component } from '../../store/store';
import { Select, TreeSelect } from 'antd';
import { useComponentConfigStore } from '../../store/component-config';

export interface ComponentMethodConfig {
  type: 'componentMethod';
  config: {
    componentId: number;
    method: string;
  };
}

export interface ComponentMethodProps {
  value?: string;
  onChange?: (config: ComponentMethodConfig) => void;
}

export function ComponentMethod(props: ComponentMethodProps) {
  debugger
  const { value, onChange } = props;
  const { components, curComponentId } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();
  const [selectedComponent, setSelectedComponent] = useState<Component | null>();
  const [curId, setCurId] = useState<number>();
  const [curMethod, setCurMethod] = useState<string>();
  useEffect(() => {
    if (value) {
      setCurId(value.componentId);
      setCurMethod(value.method);

      setSelectedComponent(getComponentById(value.componentId, components));
    }
  }, [value, components]);
  function componentChange(value: number) {
    if (!curComponentId) return;

    setCurId(value);
    setSelectedComponent(getComponentById(value, components));
  }
  function componentMethodChange(value: string) {
    if (!curComponentId || !selectedComponent) return;

    setCurMethod(value);

    onChange?.({
      type: 'componentMethod',
      config: {
        componentId: selectedComponent?.id,
        method: value,
      },
    });
  }

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2.5">
        <div>组件：</div>
        <div>
          <TreeSelect
            style={{ width: 500, height: 50 }}
            treeData={components}
            fieldNames={{
              label: 'name',
              value: 'id',
            }}
            value={curId}
            onChange={(value) => {
              componentChange(value);
            }}
          />
        </div>
      </div>
      {componentConfig[selectedComponent?.name || ''] && (
        <div className="flex items-center gap-2.5 mt-5">
          <div>方法：</div>
          <div>
            <Select
              style={{ width: 500, height: 50 }}
              options={componentConfig[selectedComponent?.name || ''].methods?.map((method) => ({
                label: method.label,
                value: method.name,
              }))}
              value={curMethod}
              onChange={(value) => {
                componentMethodChange(value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
