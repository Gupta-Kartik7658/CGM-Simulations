import type { ParametricCurve3D } from './ParametricCurve3D';
import { StraightLine } from './StraightLine';
import { Circle } from './Circle';
import { CircularHelix } from './CircularHelix';
import { SineCurve3D } from './SineCurve3D';
import { TrefoilKnot } from './TrefoilKnot';
import { PolynomialCurve3D } from './PolynomialCurve3D';

export type { ParametricCurve3D } from './ParametricCurve3D';
export { StraightLine } from './StraightLine';
export { Circle } from './Circle';
export { CircularHelix } from './CircularHelix';
export { SineCurve3D } from './SineCurve3D';
export { TrefoilKnot } from './TrefoilKnot';
export { PolynomialCurve3D } from './PolynomialCurve3D';

/**
 * The registry of curves available in Phase 1. Adding a future curve type
 * (Bezier, Hermite, ...) means adding one entry here — nothing else in the
 * math engine or renderer needs to change.
 */
export const curveRegistry: ParametricCurve3D[] = [
  new StraightLine(),
  new Circle(),
  new CircularHelix(),
  new SineCurve3D(),
  new TrefoilKnot(),
  new PolynomialCurve3D(),
];

export function getCurveById(id: string): ParametricCurve3D {
  const curve = curveRegistry.find((c) => c.id === id);
  if (!curve) {
    throw new Error(`Unknown curve id: "${id}"`);
  }
  return curve;
}
