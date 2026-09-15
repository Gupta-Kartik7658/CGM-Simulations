import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

/**
 * r(t) = (R cos t, R sin t, 0)
 *
 * Planar circle of radius R in the XY plane. Theoretical properties used
 * in tests: constant curvature κ = 1/R, torsion τ = 0 everywhere (the
 * curve is planar).
 */
export class Circle implements ParametricCurve3D {
  readonly id = 'circle';
  readonly name = 'Circle';
  readonly domain: [number, number] = [0, 2 * Math.PI];

  private readonly radius: number;

  constructor(radius: number = 1.5) {
    this.radius = radius;
  }

  position(t: number): THREE.Vector3 {
    const r = this.radius;
    return new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), 0);
  }

  derivative(t: number): THREE.Vector3 {
    const r = this.radius;
    return new THREE.Vector3(-r * Math.sin(t), r * Math.cos(t), 0);
  }

  secondDerivative(t: number): THREE.Vector3 {
    const r = this.radius;
    return new THREE.Vector3(-r * Math.cos(t), -r * Math.sin(t), 0);
  }

  thirdDerivative(t: number): THREE.Vector3 {
    const r = this.radius;
    return new THREE.Vector3(r * Math.sin(t), -r * Math.cos(t), 0);
  }
}
