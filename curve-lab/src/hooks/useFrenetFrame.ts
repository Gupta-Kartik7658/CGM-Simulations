import { useMemo } from 'react';
import type { ParametricCurve3D } from '../curves';
import { computeFrenetFrame, type FrenetFrame } from '../math/frenetFrame';

/**
 * The only place a React component should ever call into the math engine.
 * Renderer components receive the resulting FrenetFrame as a prop — they
 * never call computeFrenetFrame themselves.
 */
export function useFrenetFrame(curve: ParametricCurve3D, t: number): FrenetFrame {
  return useMemo(() => computeFrenetFrame(curve, t), [curve, t]);
}
