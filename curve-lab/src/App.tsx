import './App.css';
import { Scene } from './components/scene/Scene';
import { ControlPanel } from './components/ControlPanel';
import { EducationalPanel } from './components/EducationalPanel';
import { getCurveById } from './curves';
import { useAppStore } from './state/useAppStore';
import { useFrenetFrame } from './hooks/useFrenetFrame';

function App() {
  const selectedCurveId = useAppStore((state) => state.selectedCurveId);
  const t = useAppStore((state) => state.t);
  const curve = getCurveById(selectedCurveId);
  const frame = useFrenetFrame(curve, t);

  return (
    <div className="app-root">
      <Scene curve={curve} frame={frame} />
      <ControlPanel />
      <EducationalPanel curve={curve} frame={frame} />
    </div>
  );
}

export default App;
