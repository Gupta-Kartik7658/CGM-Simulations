import { describe, expect, it } from 'vitest';
import { CircularHelix } from '../../curves/CircularHelix';
import { length } from '../../math/vector';

describe('CircularHelix', () => {
  const radius = 1;
  const pitch = 0.4;
  const helix = new CircularHelix(radius, pitch);
  const samples = [0, 0.5, 1.3, Math.PI, 4.2];

  it('has constant speed sqrt(R^2 + c^2)', () => {
    const expectedSpeed = Math.sqrt(radius ** 2 + pitch ** 2);
    for (const t of samples) {
      expect(length(helix.derivative(t))).toBeCloseTo(expectedSpeed, 10);
    }
  });

  it('projects onto a circle of radius R in the xy-plane', () => {
    for (const t of samples) {
      const p = helix.position(t);
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(radius, 10);
    }
  });

  it('rises linearly in z at rate c (pitch)', () => {
    const p0 = helix.position(0);
    const p1 = helix.position(1);
    expect(p1.z - p0.z).toBeCloseTo(pitch, 10);
  });
});
