import * as THREE from 'three';
import type { ParametricCurve3D } from '../curves/ParametricCurve3D';
import { cross, dot, length, normalize, projectOrthogonal } from './vector';
import { EPS_SPEED, EPS_CURVATURE_CROSS, EPS_TORSION_DENOM } from './tolerance';

/**
 * The complete differential-geometry state of a curve at a single
 * parameter value t. This is the one object the renderer and UI ever
 * consume — neither is allowed to compute T/N/B/curvature/torsion itself.
 *
 * tangent/normal/binormal/torsion are nullable rather than always present,
 * because at degenerate parameter values they are genuinely undefined
 * mathematical quantities. The `*Valid` flags make that explicit instead of
 * requiring callers to guess from `null` vs `NaN` vs `0`.
 */
export interface FrenetFrame {
  t: number;
  position: THREE.Vector3;

  firstDerivative: THREE.Vector3;
  secondDerivative: THREE.Vector3;
  thirdDerivative: THREE.Vector3;

  tangent: THREE.Vector3 | null;
  normal: THREE.Vector3 | null;
  binormal: THREE.Vector3 | null;

  curvature: number;
  torsion: number | null;

  tangentValid: boolean;
  normalValid: boolean;
  binormalValid: boolean;
  curvatureValid: boolean;
  torsionValid: boolean;

  /** Human-readable notes explaining any degenerate/invalid state above. */
  diagnostics: string[];
}

/**
 * Computes the Frenet frame of `curve` at parameter `t`.
 *
 * Formulation notes:
 *
 *   T = r'(t) / ||r'(t)||
 *
 *   κ = ||r'(t) x r''(t)|| / ||r'(t)||^3
 *
 *   τ = ((r'(t) x r''(t)) . r'''(t)) / ||r'(t) x r''(t)||^2
 *
 *   N: rather than computing T'(t) via finite differences (numerically
 *   fragile, and doubly so near degenerate points), we use the standard
 *   fact that the component of r''(t) orthogonal to T(t) points in the
 *   same direction as T'(t):
 *
 *       N = normalize( r''(t) - (r''(t) . T) * T )
 *
 *   This is exact (not an approximation) whenever curvature is non-zero,
 *   and it only ever needs r'(t) and r''(t), which the curve already
 *   provides analytically.
 *
 *   B = T x N
 *
 * Degenerate cases are handled explicitly rather than left to propagate
 * as NaN/Infinity — see the tolerance constants in ./tolerance.ts.
 */
export function computeFrenetFrame(curve: ParametricCurve3D, t: number): FrenetFrame {
  const position = curve.position(t);
  const firstDerivative = curve.derivative(t);
  const secondDerivative = curve.secondDerivative(t);
  const thirdDerivative = curve.thirdDerivative(t);

  const diagnostics: string[] = [];
  const speed = length(firstDerivative);

  // --- Tangent -----------------------------------------------------------
  let tangent: THREE.Vector3 | null = null;
  let tangentValid = false;
  if (speed > EPS_SPEED) {
    tangent = normalize(firstDerivative);
    tangentValid = true;
  } else {
    diagnostics.push(
      `Tangent undefined at t=${t.toFixed(4)}: ||r'(t)|| ~ 0 (speed=${speed.toExponential(3)}).`,
    );
  }

  // --- Curvature -----------------------------------------------------------
  const r1xr2 = cross(firstDerivative, secondDerivative);
  const r1xr2Length = length(r1xr2);

  let curvature = 0;
  let curvatureValid = false;
  if (speed > EPS_SPEED) {
    curvature = r1xr2Length / speed ** 3;
    curvatureValid = true;
  } else {
    diagnostics.push(`Curvature undefined at t=${t.toFixed(4)}: zero speed.`);
  }

  // --- Principal normal ----------------------------------------------------
  let normal: THREE.Vector3 | null = null;
  let normalValid = false;
  if (tangentValid) {
    if (r1xr2Length > EPS_CURVATURE_CROSS) {
      const orthogonalComponent = projectOrthogonal(secondDerivative, tangent!);
      const orthogonalLength = length(orthogonalComponent);
      if (orthogonalLength > EPS_SPEED) {
        normal = normalize(orthogonalComponent);
        normalValid = true;
      } else {
        diagnostics.push(
          `Normal undefined at t=${t.toFixed(4)}: r''(t) has (numerically) no component orthogonal to T(t).`,
        );
      }
    } else {
      diagnostics.push(
        `Normal undefined at t=${t.toFixed(4)}: curvature ~ 0, so the classical Frenet frame does not ` +
          `determine a principal normal direction here (e.g. straight segment or inflection point).`,
      );
    }
  }

  // --- Binormal ------------------------------------------------------------
  let binormal: THREE.Vector3 | null = null;
  let binormalValid = false;
  if (tangentValid && normalValid) {
    binormal = cross(tangent!, normal!);
    binormalValid = true;
  }

  // --- Torsion ---------------------------------------------------------------
  let torsion: number | null = null;
  let torsionValid = false;
  if (r1xr2Length > EPS_TORSION_DENOM) {
    torsion = dot(r1xr2, thirdDerivative) / (r1xr2Length * r1xr2Length);
    torsionValid = true;
  } else {
    diagnostics.push(
      `Torsion undefined at t=${t.toFixed(4)}: ||r'(t) x r''(t)|| ~ 0, denominator degenerate.`,
    );
  }

  return {
    t,
    position,
    firstDerivative,
    secondDerivative,
    thirdDerivative,
    tangent,
    normal,
    binormal,
    curvature,
    torsion,
    tangentValid,
    normalValid,
    binormalValid,
    curvatureValid,
    torsionValid,
    diagnostics,
  };
}
