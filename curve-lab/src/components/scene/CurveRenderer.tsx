import { useMemo, useState } from 'react';
import { Line } from '@react-three/drei';
import type { ParametricCurve3D } from '../../curves';
import { HoverLabel } from './HoverLabel';

const SAMPLE_COUNT = 400;

interface CurveRendererProps {
  curve: ParametricCurve3D;
  color?: string;
}

/**
 * Samples curve.position(t) across the curve's domain and draws the
 * resulting polyline. This component does not know (and must not know)
 * how position() is computed for any given curve type.
 */
export function CurveRenderer({ curve, color = '#4fc3f7' }: CurveRendererProps) {
  const [hovered, setHovered] = useState(false);
  const points = useMemo<[number, number, number][]>(() => {
    const [start, end] = curve.domain;
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const t = start + ((end - start) * i) / SAMPLE_COUNT;
      const p = curve.position(t);
      pts.push([p.x, p.y, p.z]);
    }
    return pts;
  }, [curve]);

  const labelPosition = points[Math.floor(points.length / 2)];

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={2}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      />
      {hovered && labelPosition && (
        <group position={labelPosition}>
          <HoverLabel>{curve.name}</HoverLabel>
        </group>
      )}
    </>
  );
}
