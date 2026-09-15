import type { FrenetFrame } from '../../math/frenetFrame';

interface SelectedPointProps {
  frame: FrenetFrame;
}

/** Renders a small sphere at the curve position for the current t. Reads position from the frame — never recomputes it. */
export function SelectedPoint({ frame }: SelectedPointProps) {
  const { position } = frame;
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
