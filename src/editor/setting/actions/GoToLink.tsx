import { useEditorStore } from '../../store/store';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
export interface GoToLinkConfig {
  type: 'goToLink';
  url: string;
}
export function GoToLink(props: GoToLinkConfig) {
  const { defaultValue, onChange } = props;
  const [value, setValue] = useState(defaultValue);

  const { curComponentId } = useEditorStore();

  function urlChange(value: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({
      type: 'goToLink',
      url: value,
    });
  }

  return (
    <div className="mt-2.5">
      <div className="flex items-center gap-2.5">
        <div>跳转链接</div>
        <div>
          <TextArea
            style={{ height: 200, width: 500, border: '1px solid #000' }}
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            value={value || ''}
          />
        </div>
      </div>
    </div>
  );
}
