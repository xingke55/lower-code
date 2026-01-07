import { create } from 'zustand';
import ContainerDev from '../material/Container/dev';
import ContainerProd from '../material/Container/prod';
import ButtonDev from '../material/AddButton/dev';
import ButtonProd from '../material/AddButton/prod';
import PageDev from '../material/Page/dev';
import PageProd from '../material/Page/prod';
import ModalDev from '../material/modal/dev';
import ModalProd from '../material/modal/prod';
export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc?: string;
  // component: any;
  setter: ComponentSetter[];
  stylesSetter: ComponentSetter[];
  dev: any;
  prod: any;
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
}
export interface ComponentMethod {
  name: string;
  label: string;
}
export interface ComponentEvent {
  name: string;
  label: string;
}
export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}
interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}
export const useComponentConfigStore = create<State & Action>()((set, get) => ({
  componentConfig: {
    Page: {
      name: 'Page',
      desc: '页面',
      defaultProps: {},
      dev: PageDev,
      prod: PageProd,
    },
    Container: {
      name: 'Container',
      desc: '容器',
      defaultProps: {},
      dev: ContainerDev,
      prod: ContainerProd,
    },
    Button: {
      name: 'Button',
      desc: '按钮',
      defaultProps: { type: 'primary', text: '按钮' },
      dev: ButtonDev,
      prod: ButtonProd,
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
      stylesSetter: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
        },
      ],
      events: [
        {
          name: 'onClick',
          label: '点击事件',
        },
        {
          name: 'onDoubleClick',
          label: '双击事件',
        },
      ],
    },
    Modal: {
      name: 'Modal',
      defaultProps: {
        title: '弹窗',
      },
      setter: [
        {
          name: 'title',
          label: '标题',
          type: 'input',
        },
      ],
      stylesSetter: [],
      events: [
        {
          name: 'onOk',
          label: '确认事件',
        },
        {
          name: 'onCancel',
          label: '取消事件',
        },
      ],
      desc: '弹窗',
      dev: ModalDev,
      prod: ModalProd,
      methods: [
        {
          name: 'open',
          label: '打开弹窗',
        },
        {
          name: 'close',
          label: '关闭弹窗',
        },
      ],
    },
  },
  registerComponent(name, componentConfig) {
    set((state) => ({
      componentConfig: {
        ...state.componentConfig,
        [name]: componentConfig,
      },
    }));
  },
}));
