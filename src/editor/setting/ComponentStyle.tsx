import { Form, Input, Select,InputNumber } from 'antd';
import { useEffect } from 'react';
import { useEditorStore } from '../store/store';
import { useComponentConfigStore } from '../store/component-config';
import type { ComponentSetter, ComponentConfig } from '../store/component-config';

export const ComponentStyle = () => {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useEditorStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    form.resetFields()
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
  }, [curComponent, form]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    } else if (type === 'inputNumber') {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
    </Form>
  );
};
