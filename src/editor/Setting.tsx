import { useState } from 'react';
import { useEditorStore } from './store/store';
import { Segmented } from 'antd';
import { ComponentAttr } from './setting/ComponentAttr';
import { ComponentStyle } from './setting/ComponentStyle';
import { ComponentEvent } from './setting/ComponentEvent';

export default function Setting() {
  const { curComponent, curComponentId } = useEditorStore();
  const [key, setKey] = useState<string>('属性');

  if (!curComponentId) return null;
  return (
    <div className="pt-5">
      <Segmented value={key} onChange={setKey} block options={['属性', '样式', '事件']} />
      <div>
        {key === '属性' && <ComponentAttr />}
        {key === '样式' && <ComponentStyle />}
        {key === '事件' && <ComponentEvent />}
      </div>
    </div>
  );
}
