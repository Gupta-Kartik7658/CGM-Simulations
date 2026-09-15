import { Html } from '@react-three/drei';

interface HoverLabelProps {
  children: string;
}

/** A small canvas-anchored label that appears only while its 3D target is hovered. */
export function HoverLabel({ children }: HoverLabelProps) {
  return (
    <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
      <span className="scene-label">{children}</span>
    </Html>
  );
}