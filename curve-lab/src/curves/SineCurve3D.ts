import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

/**
 * r(t) = (t, A sin(w t), B cos(w t))
 *
 * A non-planar curve with generally non-constant, non-zero curvature and
 * torsion — useful for exercising the engine on a "generic" case rather
 * than the special circle/helix symmetries.
 */
export class SineCurve3D implements ParametricCurve3D {
  readonly id = 'sine3d';
  readonly name = '3D Sine Curve';
  readonly domain: [number, number] = [-2 * Math.PI, 2 * Math.PI];

  private readonly amplitudeY: number;
  private readonly amplitudeZ: number;
  private readonly angularFrequency: number;

  constructor(amplitudeY: number = 1, amplitudeZ: number = 0.6, angularFrequency: number = 1) {
    this.amplitudeY = amplitudeY;
    this.amplitudeZ = amplitudeZ;
    this.angularFrequency = angularFrequency;
  }

  position(t: number): THREE.Vector3 {
    const { amplitudeY: a, amplitudeZ: b, angularFrequency: w } = this;
    return new THREE.Vector3(t, a * Math.sin(w * t), b * Math.cos(w * t));
  }

  derivative(t: number): THREE.Vector3 {
    const { amplitudeY: a, amplitudeZ: b, angularFrequency: w } = this;
    return new THREE.Vector3(1, a * w * Math.cos(w * t), -b * w * Math.sin(w * t));
  }

  secondDerivative(t: number): THREE.Vector3 {
    const { amplitudeY: a, amplitudeZ: b, angularFrequency: w } = this;
    const w2 = w * w;
    return new THREE.Vector3(0, -a * w2 * Math.sin(w * t), -b * w2 * Math.cos(w * t));
  }

  thirdDerivative(t: number): THREE.Vector3 {
    const { amplitudeY: a, amplitudeZ: b, angularFrequency: w } = this;
    const w3 = w * w * w;
    return new THREE.Vector3(0, -a * w3 * Math.cos(w * t), b * w3 * Math.sin(w * t));
  }
}
