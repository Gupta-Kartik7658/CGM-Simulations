import * as THREE from 'three';
import type { ParametricCurve3D } from './ParametricCurve3D';

export interface CubicCoefficients {
  /** [a3, a2, a1, a0] such that f(t) = a3 t^3 + a2 t^2 + a1 t + a0 */
  x: [number, number, number, number];
  y: [number, number, number, number];
  z: [number, number, number, number];
}

const DEFAULT_COEFFICIENTS: CubicCoefficients = {
  x: [1, 0, -2, 0],
  y: [0.4, -1, 0, 0],
  z: [0.6, 0, 1, 0],
};

/**
 * A generic component-wise cubic polynomial curve:
 *   r(t) = (Px(t), Py(t), Pz(t)),  Pi(t) = a3 t^3 + a2 t^2 + a1 t + a0
 *
 * Included as a simple, fully generic analytic curve (arbitrary,
 * non-constant third derivative) to exercise the engine outside of the
 * trigonometric special cases.
 */
export class PolynomialCurve3D implements ParametricCurve3D {
  readonly id = 'polynomial';
  readonly name = '3D Polynomial Curve';
  readonly domain: [number, number] = [-1.5, 1.5];

  private readonly coefficients: CubicCoefficients;

  constructor(coefficients: CubicCoefficients = DEFAULT_COEFFICIENTS) {
    this.coefficients = coefficients;
  }

  private evaluate(t: number): THREE.Vector3 {
    const { x, y, z } = this.coefficients;
    const f = (c: [number, number, number, number]) =>
      c[0] * t ** 3 + c[1] * t ** 2 + c[2] * t + c[3];
    return new THREE.Vector3(f(x), f(y), f(z));
  }

  private evaluateDerivative(t: number): THREE.Vector3 {
    const { x, y, z } = this.coefficients;
    const f = (c: [number, number, number, number]) => 3 * c[0] * t ** 2 + 2 * c[1] * t + c[2];
    return new THREE.Vector3(f(x), f(y), f(z));
  }

  private evaluateSecondDerivative(t: number): THREE.Vector3 {
    const { x, y, z } = this.coefficients;
    const f = (c: [number, number, number, number]) => 6 * c[0] * t + 2 * c[1];
    return new THREE.Vector3(f(x), f(y), f(z));
  }

  private evaluateThirdDerivative(): THREE.Vector3 {
    const { x, y, z } = this.coefficients;
    const f = (c: [number, number, number, number]) => 6 * c[0];
    return new THREE.Vector3(f(x), f(y), f(z));
  }

  position(t: number): THREE.Vector3 {
    return this.evaluate(t);
  }

  derivative(t: number): THREE.Vector3 {
    return this.evaluateDerivative(t);
  }

  secondDerivative(t: number): THREE.Vector3 {
    return this.evaluateSecondDerivative(t);
  }

  thirdDerivative(_t: number): THREE.Vector3 {
    return this.evaluateThirdDerivative();
  }
}
