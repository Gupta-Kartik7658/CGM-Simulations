import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

/**
 * Standard trefoil knot parametrization:
 *   x(t) = sin t + 2 sin 2t
 *   y(t) = cos t - 2 cos 2t
 *   z(t) = -sin 3t
 *
 * A closed, non-planar curve with continuously varying curvature and
 * torsion — good for visually demonstrating the Frenet frame animating
 * along a genuinely 3D path (animation itself is out of scope for Phase 1).
 */
export class TrefoilKnot implements ParametricCurve3D {
  readonly id = 'trefoil';
  readonly name = 'Trefoil Knot';
  readonly domain: [number, number] = [0, 2 * Math.PI];

  private readonly scale: number;

  constructor(scale: number = 0.5) {
    this.scale = scale;
  }

  position(t: number): THREE.Vector3 {
    const s = this.scale;
    const x = Math.sin(t) + 2 * Math.sin(2 * t);
    const y = Math.cos(t) - 2 * Math.cos(2 * t);
    const z = -Math.sin(3 * t);
    return new THREE.Vector3(s * x, s * y, s * z);
  }

  derivative(t: number): THREE.Vector3 {
    const s = this.scale;
    const x = Math.cos(t) + 4 * Math.cos(2 * t);
    const y = -Math.sin(t) + 4 * Math.sin(2 * t);
    const z = -3 * Math.cos(3 * t);
    return new THREE.Vector3(s * x, s * y, s * z);
  }

  secondDerivative(t: number): THREE.Vector3 {
    const s = this.scale;
    const x = -Math.sin(t) - 8 * Math.sin(2 * t);
    const y = -Math.cos(t) + 8 * Math.cos(2 * t);
    const z = 9 * Math.sin(3 * t);
    return new THREE.Vector3(s * x, s * y, s * z);
  }

  thirdDerivative(t: number): THREE.Vector3 {
    const s = this.scale;
    const x = -Math.cos(t) - 16 * Math.cos(2 * t);
    const y = Math.sin(t) + 16 * Math.sin(2 * t);
    const z = 27 * Math.cos(3 * t);
    return new THREE.Vector3(s * x, s * y, s * z);
  }
}
