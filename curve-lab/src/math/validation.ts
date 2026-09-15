import type { FrenetFrame } from './frenetFrame';
import { dot, length } from './vector';
import { EPS_FRAME_VALIDATION } from './tolerance';

/**
 * Structured diagnostics for whether a computed FrenetFrame actually
 * satisfies the properties of an orthonormal, right-handed frame:
 *   ||T|| = ||N|| = ||B|| = 1
 *   T . N = T . B = N . B = 0
 *   B = T x N  (right-handedness / internal consistency)
 */
export interface FrenetFrameValidation {
  isComplete: boolean;
  isOrthonormal: boolean;
  isRightHanded: boolean;
  isValid: boolean;
  messages: string[];
}

function approxEquals(a: number, b: number, tolerance: number): boolean {
  return Math.abs(a - b) <= tolerance;
}

export function validateFrenetFrame(
  frame: FrenetFrame,
  tolerance: number = EPS_FRAME_VALIDATION,
): FrenetFrameValidation {
  const messages: string[] = [];

  if (!frame.tangentValid || !frame.normalValid || !frame.binormalValid) {
    messages.push('Frame is incomplete: T, N, or B is undefined at this parameter value.');
    return {
      isComplete: false,
      isOrthonormal: false,
      isRightHanded: false,
      isValid: false,
      messages,
    };
  }

  const T = frame.tangent!;
  const N = frame.normal!;
  const B = frame.binormal!;

  const unitT = approxEquals(length(T), 1, tolerance);
  const unitN = approxEquals(length(N), 1, tolerance);
  const unitB = approxEquals(length(B), 1, tolerance);
  if (!unitT) messages.push(`||T|| = ${length(T).toFixed(6)}, expected 1.`);
  if (!unitN) messages.push(`||N|| = ${length(N).toFixed(6)}, expected 1.`);
  if (!unitB) messages.push(`||B|| = ${length(B).toFixed(6)}, expected 1.`);

  const tnOrthogonal = approxEquals(dot(T, N), 0, tolerance);
  const tbOrthogonal = approxEquals(dot(T, B), 0, tolerance);
  const nbOrthogonal = approxEquals(dot(N, B), 0, tolerance);
  if (!tnOrthogonal) messages.push(`T . N = ${dot(T, N).toFixed(6)}, expected 0.`);
  if (!tbOrthogonal) messages.push(`T . B = ${dot(T, B).toFixed(6)}, expected 0.`);
  if (!nbOrthogonal) messages.push(`N . B = ${dot(N, B).toFixed(6)}, expected 0.`);

  const crossTN = T.clone().cross(N);
  const rightHanded = approxEquals(crossTN.distanceTo(B), 0, tolerance);
  if (!rightHanded) {
    messages.push('B is not consistent with T x N (frame is not right-handed as computed).');
  }

  const isOrthonormal = unitT && unitN && unitB && tnOrthogonal && tbOrthogonal && nbOrthogonal;
  const isValid = isOrthonormal && rightHanded;

  return {
    isComplete: true,
    isOrthonormal,
    isRightHanded: rightHanded,
    isValid,
    messages,
  };
}
