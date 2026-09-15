import './App.css';
import { Scene } from './components/scene/Scene';
import { ControlPanel } from './components/ControlPanel';

function App() {
  return (
    <div className="app-root">
      <Scene />
      <ControlPanel />
    </div>
  );
}

export default App;
