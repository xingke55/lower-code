import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import Header from './Header';
import Material from './Materail';
import EditArea from './EditArea';
import Setting from './Setting';
import { useEditorStore } from './store/store';
import { Preview } from './preview';
export default function LowcodeEditor() {
  const { mode } = useEditorStore();
  return (
    <div className="h-[100vh] flex flex-col w-[100vw]">
      <Header />
      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <Material />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}
