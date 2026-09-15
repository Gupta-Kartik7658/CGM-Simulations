import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

/**
 * r(t) = origin + t * direction
 *
 * The canonical degenerate case for the Frenet frame: curvature is exactly
 * zero everywhere, so the principal normal and binormal are undefined.
 */
export class StraightLine implements ParametricCurve3D {
  readonly id = 'line';
  readonly name = 'Straight Line';
  readonly domain: [number, number] = [-2, 2];

  private readonly origin: THREE.Vector3;
  private readonly direction: THREE.Vector3;

  constructor(
    origin: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    direction: THREE.Vector3 = new THREE.Vector3(1, 0.6, 0.3),
  ) {
    this.origin = origin.clone();
    this.direction = direction.clone();
  }

  position(t: number): THREE.Vector3 {
    return this.origin.clone().add(this.direction.clone().multiplyScalar(t));
  }

  derivative(_t: number): THREE.Vector3 {
    return this.direction.clone();
  }

  secondDerivative(_t: number): THREE.Vector3 {
    return new THREE.Vector3(0, 0, 0);
  }

  thirdDerivative(_t: number): THREE.Vector3 {
    return new THREE.Vector3(0, 0, 0);
  }
}
