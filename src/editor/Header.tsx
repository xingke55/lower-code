import { Button, Space } from 'antd';
import { useEditorStore } from './store/store';

export default function Header() {
  const { mode, setMode, setCurComponentId } = useEditorStore();
  return (
    <div className="h-[12.5] flex justify-between items-center px-[5]">
      <div>低代码编辑器</div>
      <Space>
        {mode === 'edit' && (
          <Button
            onClick={() => {
              setMode('preview');
              setCurComponentId(null);
            }}
            type="primary"
          >
            预览
          </Button>
        )}
        {mode === 'preview' && (
          <Button
            onClick={() => {
              setMode('edit');
            }}
            type="primary"
          >
            退出预览
          </Button>
        )}
      </Space>
    </div>
  );
}
