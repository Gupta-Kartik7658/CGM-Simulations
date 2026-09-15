import { describe, expect, it } from 'vitest';
import { Circle } from '../../curves/Circle';
import { dot, length } from '../../math/vector';

describe('Circle', () => {
  const radius = 2;
  const circle = new Circle(radius);
  const samples = [0, Math.PI / 4, Math.PI / 2, Math.PI, 1.9 * Math.PI];

  it('lies at constant radius from the origin', () => {
    for (const t of samples) {
      expect(circle.position(t).length()).toBeCloseTo(radius, 10);
    }
  });

  it('has constant speed ||r\'(t)|| = radius', () => {
    for (const t of samples) {
      expect(length(circle.derivative(t))).toBeCloseTo(radius, 10);
    }
  });

  it("r''(t) points back toward the center (centripetal)", () => {
    for (const t of samples) {
      const p = circle.position(t);
      const r2 = circle.secondDerivative(t);
      // r'' = -p for this parametrization (radius baked into both).
      expect(r2.clone().add(p).length()).toBeCloseTo(0, 8);
    }
  });

  it('is planar: r\', r\'\' always lie in the z=0 plane', () => {
    for (const t of samples) {
      expect(circle.derivative(t).z).toBeCloseTo(0, 10);
      expect(circle.secondDerivative(t).z).toBeCloseTo(0, 10);
      expect(circle.thirdDerivative(t).z).toBeCloseTo(0, 10);
    }
  });

  it("r'(t) is orthogonal to r(t) (as expected for a circle)", () => {
    for (const t of samples) {
      expect(dot(circle.position(t), circle.derivative(t))).toBeCloseTo(0, 8);
    }
  });
});
