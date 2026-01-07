import { Tree } from 'antd';
import { useEditorStore } from '../../../store/store';

export function Outline() {
  const { components, setCurComponentId } = useEditorStore();

  return (
    <Tree
      fieldNames={{ title: 'desc', key: 'id' }}
      treeData={components as any}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurComponentId(selectedKey as number);
      }}
    />
  );
}
