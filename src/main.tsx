import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClickToComponent } from 'click-to-react-component';
createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <ClickToComponent />
    <App />
  </DndProvider>
);
