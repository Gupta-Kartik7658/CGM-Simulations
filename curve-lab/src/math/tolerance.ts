/**
 * Centralized numerical tolerances for the differential-geometry engine.
 *
 * Every "is this approximately zero / approximately orthogonal / approximately
 * unit length" check in the math layer should reference one of these
 * constants instead of a magic number, so tuning tolerance behavior is a
 * one-file change.
 */

/** Below this speed, r'(t) is treated as the zero vector (tangent undefined). */
export const EPS_SPEED = 1e-8;

/**
 * Below this magnitude, ||r'(t) x r''(t)|| is treated as zero. This is the
 * threshold at which curvature is considered ~0 and the principal normal /
 * binormal become undefined for the classical Frenet frame (straight lines,
 * inflection points, etc).
 */
export const EPS_CURVATURE_CROSS = 1e-8;

/**
 * Below this magnitude, the torsion denominator ||r' x r''||^2 is treated as
 * zero and torsion is reported as undefined rather than as +/-Infinity or NaN.
 */
export const EPS_TORSION_DENOM = 1e-10;

/** Tolerance used when validating unit length / orthogonality of T, N, B. */
export const EPS_FRAME_VALIDATION = 1e-4;
