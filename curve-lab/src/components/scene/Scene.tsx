import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAppStore } from '../../state/useAppStore';
import { CurveRenderer } from './CurveRenderer';
import { SelectedPoint } from './SelectedPoint';
import { FrenetVectors } from './FrenetVectors';
import { CharacteristicPlanes } from './CharacteristicPlanes';
import type { FrenetFrame } from '../../math/frenetFrame';
import type { ParametricCurve3D } from '../../curves';

/**
 * Minimal 3D scene proving the architecture: a coordinate grid, the
 * selected curve, the selected point, and its Frenet frame — all driven
 * by shared Zustand state and the math engine via useFrenetFrame.
 */
interface SceneProps {
  curve: ParametricCurve3D;
  frame: FrenetFrame;
}

export function Scene({ curve, frame }: SceneProps) {
  const visibility = useAppStore((s) => s.visibility);

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
      <CharacteristicPlanes
        frame={frame}
        showOsculating={visibility.showOsculatingPlane}
        showNormal={visibility.showNormalPlane}
        showRectifying={visibility.showRectifyingPlane}
      />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
