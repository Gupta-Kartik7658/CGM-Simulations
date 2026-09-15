import { useMemo } from 'react';
import * as THREE from 'three';
import type { FrenetFrame } from '../../math/frenetFrame';

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
      {tangentArrow && <primitive object={tangentArrow} />}
      {normalArrow && <primitive object={normalArrow} />}
      {binormalArrow && <primitive object={binormalArrow} />}
    </>
  );
}
