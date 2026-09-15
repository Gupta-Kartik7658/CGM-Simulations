import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

/**
 * r(t) = (R cos t, R sin t, c t)
 *
 * Theoretical properties used in tests: both curvature and torsion are
 * constant. For this parametrization:
 *   κ = R / (R^2 + c^2)
 *   τ = c / (R^2 + c^2)
 */
export class CircularHelix implements ParametricCurve3D {
  readonly id = 'helix';
  readonly name = 'Circular Helix';
  readonly domain: [number, number] = [0, 4 * Math.PI];

  private readonly radius: number;
  private readonly pitch: number;

  constructor(radius: number = 1, pitch: number = 0.35) {
    this.radius = radius;
    this.pitch = pitch;
  }

  position(t: number): THREE.Vector3 {
    const { radius: r, pitch: c } = this;
    return new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), c * t);
  }

  derivative(t: number): THREE.Vector3 {
    const { radius: r, pitch: c } = this;
    return new THREE.Vector3(-r * Math.sin(t), r * Math.cos(t), c);
  }

  secondDerivative(t: number): THREE.Vector3 {
    const { radius: r } = this;
    return new THREE.Vector3(-r * Math.cos(t), -r * Math.sin(t), 0);
  }

  thirdDerivative(t: number): THREE.Vector3 {
    const { radius: r } = this;
    return new THREE.Vector3(r * Math.sin(t), -r * Math.cos(t), 0);
  }
}
