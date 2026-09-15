import * as THREE from 'three';

/**
 * Common abstraction for every 3D parametric curve r(t) in the application.
 *
 * This interface is the single seam between "curve mathematics" and
 * everything else (differential-geometry engine, renderer, UI). It must
 * never import React or Three.js *rendering* concerns (materials, meshes,
 * scenes) — only the plain vector type.
 *
 * Implementations are expected to provide analytic (closed-form)
 * derivatives rather than finite-difference approximations, since the
 * curvature/torsion formulas are sensitive to derivative accuracy.
 */
export interface ParametricCurve3D {
  /** Stable identifier, used for lookup/selection (e.g. "circle"). */
  readonly id: string;
  /** Human-readable display name (e.g. "Circle"). */
  readonly name: string;
  /** Inclusive parameter domain [tMin, tMax] over which the curve is defined. */
  readonly domain: [number, number];

  /** r(t) */
  position(t: number): THREE.Vector3;
  /** r'(t) */
  derivative(t: number): THREE.Vector3;
  /** r''(t) */
  secondDerivative(t: number): THREE.Vector3;
  /** r'''(t) */
  thirdDerivative(t: number): THREE.Vector3;
}
