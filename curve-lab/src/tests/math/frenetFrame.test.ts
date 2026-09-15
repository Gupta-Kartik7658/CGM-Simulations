import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Circle } from '../../curves/Circle';
import { CircularHelix } from '../../curves/CircularHelix';
import { StraightLine } from '../../curves/StraightLine';
import type { ParametricCurve3D } from '../../curves';
import { computeFrenetFrame } from '../../math/frenetFrame';
import { validateFrenetFrame } from '../../math/validation';

describe('computeFrenetFrame — Circle', () => {
  const radius = 2;
  const circle = new Circle(radius);
  const samples = [0, 0.7, Math.PI / 2, Math.PI, 5.5];

  it('produces a complete, orthonormal, right-handed frame', () => {
    for (const t of samples) {
      const frame = computeFrenetFrame(circle, t);
      const validation = validateFrenetFrame(frame);
      expect(validation.isValid).toBe(true);
    }
  });

  it('has constant curvature equal to 1/R', () => {
    const expected = 1 / radius;
    for (const t of samples) {
      const frame = computeFrenetFrame(circle, t);
      expect(frame.curvatureValid).toBe(true);
      expect(frame.curvature).toBeCloseTo(expected, 8);
    }
  });

  it('has zero torsion everywhere (the curve is planar)', () => {
    for (const t of samples) {
      const frame = computeFrenetFrame(circle, t);
      expect(frame.torsionValid).toBe(true);
      expect(frame.torsion).toBeCloseTo(0, 6);
    }
  });
});

describe('computeFrenetFrame — StraightLine (degenerate curvature)', () => {
  const line = new StraightLine();

  it('has a well-defined, constant tangent', () => {
    const frameA = computeFrenetFrame(line, 0);
    const frameB = computeFrenetFrame(line, 1.5);
    expect(frameA.tangentValid).toBe(true);
    expect(frameB.tangentValid).toBe(true);
    expect(frameA.tangent!.distanceTo(frameB.tangent!)).toBeCloseTo(0, 10);
  });

  it('has curvature approximately zero', () => {
    const frame = computeFrenetFrame(line, 0.3);
    expect(frame.curvatureValid).toBe(true);
    expect(frame.curvature).toBeCloseTo(0, 10);
  });

  it('treats the classical Frenet frame as degenerate (N, B, torsion undefined)', () => {
    const frame = computeFrenetFrame(line, 0.3);
    expect(frame.normalValid).toBe(false);
    expect(frame.binormalValid).toBe(false);
    expect(frame.torsionValid).toBe(false);
    expect(frame.normal).toBeNull();
    expect(frame.binormal).toBeNull();
    expect(frame.torsion).toBeNull();
    expect(frame.diagnostics.length).toBeGreaterThan(0);
  });

  it('reports the frame as incomplete/invalid via validateFrenetFrame', () => {
    const frame = computeFrenetFrame(line, 0.3);
    const validation = validateFrenetFrame(frame);
    expect(validation.isComplete).toBe(false);
    expect(validation.isValid).toBe(false);
  });
});

describe('computeFrenetFrame — CircularHelix', () => {
  const radius = 1;
  const pitch = 0.5;
  const helix = new CircularHelix(radius, pitch);
  const samples = [0, 0.6, Math.PI / 2, 2.2, 5.0];

  const denom = radius ** 2 + pitch ** 2;
  const expectedCurvature = radius / denom;
  const expectedTorsion = pitch / denom;

  it('has constant, nonzero curvature matching R / (R^2 + c^2)', () => {
    for (const t of samples) {
      const frame = computeFrenetFrame(helix, t);
      expect(frame.curvatureValid).toBe(true);
      expect(frame.curvature).toBeCloseTo(expectedCurvature, 8);
    }
  });

  it('has constant, nonzero torsion matching c / (R^2 + c^2)', () => {
    for (const t of samples) {
      const frame = computeFrenetFrame(helix, t);
      expect(frame.torsionValid).toBe(true);
      expect(frame.torsion).toBeCloseTo(expectedTorsion, 8);
    }
  });

  it('produces a valid orthonormal right-handed frame at every sample', () => {
    for (const t of samples) {
      const frame = computeFrenetFrame(helix, t);
      const validation = validateFrenetFrame(frame);
      expect(validation.isValid).toBe(true);
    }
  });
});

describe('degenerate case: zero-speed parametrization', () => {
  const stationary: ParametricCurve3D = {
    id: 'stationary',
    name: 'Stationary point (test double)',
    domain: [0, 1],
    position: () => new THREE.Vector3(1, 2, 3),
    derivative: () => new THREE.Vector3(0, 0, 0),
    secondDerivative: () => new THREE.Vector3(0, 0, 0),
    thirdDerivative: () => new THREE.Vector3(0, 0, 0),
  };

  it("does not propagate NaN/Infinity when r'(t) is the zero vector", () => {
    const frame = computeFrenetFrame(stationary, 0);
    expect(frame.tangentValid).toBe(false);
    expect(frame.normalValid).toBe(false);
    expect(frame.binormalValid).toBe(false);
    expect(frame.curvatureValid).toBe(false);
    expect(frame.torsionValid).toBe(false);
    expect(Number.isNaN(frame.curvature)).toBe(false);
    expect(frame.tangent).toBeNull();
    expect(frame.diagnostics.length).toBeGreaterThan(0);
  });
});
