import { useMemo, useState } from 'react';
import * as THREE from 'three';
import type { FrenetFrame } from '../../math/frenetFrame';
import { HoverLabel } from './HoverLabel';

interface FrenetVectorsProps {
  frame: FrenetFrame;
  showTangent: boolean;
  showNormal: boolean;
  showBinormal: boolean;
  arrowLength?: number;
}

const COLOR_TANGENT = 0xff5252;
const COLOR_NORMAL = 0x4caf50;
const COLOR_BINORMAL = 0x2979ff;

function useArrow(
  visible: boolean,
  valid: boolean,
  direction: THREE.Vector3 | null,
  origin: THREE.Vector3,
  length: number,
  color: number,
): THREE.ArrowHelper | null {
  return useMemo(() => {
    if (!visible || !valid || !direction) return null;
    return new THREE.ArrowHelper(direction, origin, length, color);
  }, [visible, valid, direction, origin, length, color]);
}

function VectorArrow({
  arrow,
  origin,
  direction,
  label,
}: {
  arrow: THREE.ArrowHelper | null;
  origin: THREE.Vector3;
  direction: THREE.Vector3 | null;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  if (!arrow || !direction) return null;

  return (
    <group>
      <primitive object={arrow} />
      <mesh
        position={origin.clone().add(direction.clone().multiplyScalar(0.3))}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {hovered && (
        <group position={origin.clone().add(direction.clone().multiplyScalar(0.6))}>
          <HoverLabel>{label}</HoverLabel>
        </group>
      )}
    </group>
  );
}

/**
 * Draws arrows for T, N, B at the current curve point.
 *
 * This component only reads pre-computed vectors off the FrenetFrame
 * result (and their *Valid flags) — it performs no differential-geometry
 * calculations of its own. If a vector is invalid at the current t (e.g.
 * N/B on a straight line), its arrow is simply omitted.
 */
export function FrenetVectors({
  frame,
  showTangent,
  showNormal,
  showBinormal,
  arrowLength = 0.6,
}: FrenetVectorsProps) {
  const origin = frame.position;

  const tangentArrow = useArrow(
    showTangent,
    frame.tangentValid,
    frame.tangent,
    origin,
    arrowLength,
    COLOR_TANGENT,
  );
  const normalArrow = useArrow(
    showNormal,
    frame.normalValid,
    frame.normal,
    origin,
    arrowLength,
    COLOR_NORMAL,
  );
  const binormalArrow = useArrow(
    showBinormal,
    frame.binormalValid,
    frame.binormal,
    origin,
    arrowLength,
    COLOR_BINORMAL,
  );

  return (
    <>
      <VectorArrow
        arrow={tangentArrow}
        origin={origin}
        direction={frame.tangent}
        label="Unit Tangent T"
      />
      <VectorArrow
        arrow={normalArrow}
        origin={origin}
        direction={frame.normal}
        label="Principal Normal N"
      />
      <VectorArrow
        arrow={binormalArrow}
        origin={origin}
        direction={frame.binormal}
        label="Binormal B"
      />
    </>
  );
}
