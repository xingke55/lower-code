import { useMemo } from 'react';
import { useComponentConfigStore } from '../store/component-config';
import { MaterialItem } from './MaterialItem';
export default function MaterialCpn() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem key={index + item.name} name={item.name} desc={item.desc} />;
      })}
    </div>
  );
}
