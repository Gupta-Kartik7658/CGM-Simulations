import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { getCurveById } from '../../curves';
import { useAppStore } from '../../state/useAppStore';
import { useFrenetFrame } from '../../hooks/useFrenetFrame';
import { CurveRenderer } from './CurveRenderer';
import { SelectedPoint } from './SelectedPoint';
import { FrenetVectors } from './FrenetVectors';

/**
 * Minimal 3D scene proving the architecture: a coordinate grid, the
 * selected curve, the selected point, and its Frenet frame — all driven
 * by shared Zustand state and the math engine via useFrenetFrame.
 */
export function Scene() {
  const selectedCurveId = useAppStore((s) => s.selectedCurveId);
  const t = useAppStore((s) => s.t);
  const visibility = useAppStore((s) => s.visibility);

  const curve = getCurveById(selectedCurveId);
  const frame = useFrenetFrame(curve, t);

  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
      <color attach="background" args={['#0b0f14']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <axesHelper args={[3]} />
      <gridHelper args={[10, 10]} />

      <CurveRenderer curve={curve} />
      <SelectedPoint frame={frame} />
      <FrenetVectors
        frame={frame}
        showTangent={visibility.showTangent}
        showNormal={visibility.showNormal}
        showBinormal={visibility.showBinormal}
      />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
