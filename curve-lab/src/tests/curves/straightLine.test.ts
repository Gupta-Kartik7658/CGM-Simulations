import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { StraightLine } from '../../curves/StraightLine';

describe('StraightLine', () => {
  const direction = new THREE.Vector3(2, 0, 0);
  const line = new StraightLine(new THREE.Vector3(0, 0, 0), direction);

  it('has a constant tangent direction equal to the direction vector', () => {
    const d0 = line.derivative(0);
    const d1 = line.derivative(1);
    const d2 = line.derivative(-5);
    expect(d0.toArray()).toEqual(direction.toArray());
    expect(d1.toArray()).toEqual(direction.toArray());
    expect(d2.toArray()).toEqual(direction.toArray());
  });

  it('has zero second and third derivatives everywhere', () => {
    expect(line.secondDerivative(0.5).length()).toBe(0);
    expect(line.thirdDerivative(0.5).length()).toBe(0);
  });

  it('position moves linearly along the direction', () => {
    const p0 = line.position(0);
    const p1 = line.position(1);
    expect(p1.clone().sub(p0).toArray()).toEqual(direction.toArray());
  });
});
