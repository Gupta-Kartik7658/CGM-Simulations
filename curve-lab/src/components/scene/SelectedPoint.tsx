import { useState } from 'react';
import type { FrenetFrame } from '../../math/frenetFrame';
import { HoverLabel } from './HoverLabel';

interface SelectedPointProps {
  frame: FrenetFrame;
}

/** Renders a small sphere at the curve position for the current t. Reads position from the frame — never recomputes it. */
export function SelectedPoint({ frame }: SelectedPointProps) {
  const [hovered, setHovered] = useState(false);
  const { position } = frame;
  return (
    <group position={[position.x, position.y, position.z]}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {hovered && <HoverLabel>Selected Point</HoverLabel>}
    </group>
  );
}
