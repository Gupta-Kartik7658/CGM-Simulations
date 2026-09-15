import * as THREE from 'three';
import type { FrenetFrame } from './frenetFrame';
import { dot, subtract } from './vector';

export type CharacteristicPlaneType = 'osculating' | 'normal' | 'rectifying';

/**
 * A plane through the curve point, described by an origin, two orthonormal
 * basis vectors spanning it, and its unit normal. Together these are enough
 * to later render the plane (using basisU/basisV) or test membership via
 * the implicit form n . (x - P0) = 0 (see `signedDistanceToPlane`).
 *
 * No UI consumes this yet in Phase 1 — this only establishes the math-side
 * abstraction the renderer will build on later.
 */
export interface CharacteristicPlane {
  type: CharacteristicPlaneType;
  origin: THREE.Vector3;
  basisU: THREE.Vector3;
  basisV: THREE.Vector3;
  normal: THREE.Vector3;
}

/**
 * Builds one of the three classical characteristic planes at a frame's
 * position, or null if the frame is incomplete (T/N/B undefined here).
 *
 *   Osculating plane: basis {T, N}, normal B
 *   Normal plane:      basis {N, B}, normal T
 *   Rectifying plane:  basis {T, B}, normal N
 */
export function getCharacteristicPlane(
  frame: FrenetFrame,
  type: CharacteristicPlaneType,
): CharacteristicPlane | null {
  if (!frame.tangentValid || !frame.normalValid || !frame.binormalValid) {
    return null;
  }

  const T = frame.tangent!;
  const N = frame.normal!;
  const B = frame.binormal!;
  const origin = frame.position;

  switch (type) {
    case 'osculating':
      return { type, origin, basisU: T, basisV: N, normal: B };
    case 'normal':
      return { type, origin, basisU: N, basisV: B, normal: T };
    case 'rectifying':
      return { type, origin, basisU: T, basisV: B, normal: N };
  }
}

/** Evaluates n . (x - P0) for a given plane and point (0 => point lies on the plane). */
export function signedDistanceToPlane(plane: CharacteristicPlane, point: THREE.Vector3): number {
  return dot(plane.normal, subtract(point, plane.origin));
}
