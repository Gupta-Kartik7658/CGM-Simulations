import * as THREE from 'three';

/**
 * Small set of pure (non-mutating) vector operations used throughout the
 * math engine.
 *
 * We use THREE.Vector3 as the underlying numeric type (acceptable per the
 * project spec) but never call its mutating methods (.add, .cross, ...)
 * directly from engine code, since accidentally mutating a shared vector
 * (e.g. a curve's cached derivative) is a very easy bug to introduce.
 * These wrappers always return a new Vector3 and leave their inputs
 * untouched, which keeps the math engine's data flow predictable.
 */

export function length(v: THREE.Vector3): number {
  return v.length();
}

export function normalize(v: THREE.Vector3): THREE.Vector3 {
  return v.clone().normalize();
}

export function dot(a: THREE.Vector3, b: THREE.Vector3): number {
  return a.dot(b);
}

export function cross(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 {
  return a.clone().cross(b);
}

export function scale(v: THREE.Vector3, s: number): THREE.Vector3 {
  return v.clone().multiplyScalar(s);
}

export function add(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 {
  return a.clone().add(b);
}

export function subtract(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 {
  return a.clone().sub(b);
}

/**
 * Returns the component of `v` orthogonal to the given *unit* vector
 * `unitDirection`, i.e. v - (v . unitDirection) * unitDirection.
 *
 * Used to derive the principal normal N from r''(t) without differentiating
 * T(t) numerically (see math/frenetFrame.ts for the full explanation).
 */
export function projectOrthogonal(
  v: THREE.Vector3,
  unitDirection: THREE.Vector3,
): THREE.Vector3 {
  return subtract(v, scale(unitDirection, dot(v, unitDirection)));
}
