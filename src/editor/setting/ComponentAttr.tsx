import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useEditorStore } from '../store/store';
import { useComponentConfigStore } from '../store/component-config';
import type { ComponentSetter, ComponentConfig } from '../store/component-config';

export const ComponentAttr = () => {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponent } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();
  console.log(curComponentId, curComponent, componentConfig);
  function valueChange(changeValues: ComponentConfig) {
    if (curComponentId) {
      updateComponent(curComponentId, changeValues);
    }
  }
  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    }
  }

  useEffect(() => {
    form.resetFields();

    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent, form]);

  if (!curComponentId || !curComponent) return null;
  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
      <Form.Item label="组件id">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
    </Form>
  );
};
