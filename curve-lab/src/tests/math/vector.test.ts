import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { add, cross, dot, length, normalize, projectOrthogonal, scale, subtract } from '../../math/vector';

describe('vector helpers', () => {
  it('length computes euclidean norm', () => {
    expect(length(new THREE.Vector3(3, 4, 0))).toBeCloseTo(5);
  });

  it('normalize returns a unit vector without mutating the input', () => {
    const v = new THREE.Vector3(0, 3, 4);
    const n = normalize(v);
    expect(length(n)).toBeCloseTo(1);
    expect(v.y).toBe(3); // input untouched
    expect(v.z).toBe(4);
  });

  it('dot product matches known values', () => {
    expect(dot(new THREE.Vector3(1, 2, 3), new THREE.Vector3(4, 5, 6))).toBeCloseTo(32);
  });

  it('cross product of orthogonal unit vectors gives the third axis', () => {
    const x = new THREE.Vector3(1, 0, 0);
    const y = new THREE.Vector3(0, 1, 0);
    const z = cross(x, y);
    expect(z.x).toBeCloseTo(0);
    expect(z.y).toBeCloseTo(0);
    expect(z.z).toBeCloseTo(1);
  });

  it('add/subtract/scale are pure (do not mutate inputs)', () => {
    const a = new THREE.Vector3(1, 1, 1);
    const b = new THREE.Vector3(2, 2, 2);
    const sum = add(a, b);
    const diff = subtract(b, a);
    const scaled = scale(a, 3);
    expect(sum.toArray()).toEqual([3, 3, 3]);
    expect(diff.toArray()).toEqual([1, 1, 1]);
    expect(scaled.toArray()).toEqual([3, 3, 3]);
    expect(a.toArray()).toEqual([1, 1, 1]);
    expect(b.toArray()).toEqual([2, 2, 2]);
  });

  it('projectOrthogonal removes the component along the given unit direction', () => {
    const v = new THREE.Vector3(1, 1, 0);
    const unitX = new THREE.Vector3(1, 0, 0);
    const orth = projectOrthogonal(v, unitX);
    expect(dot(orth, unitX)).toBeCloseTo(0);
    expect(orth.y).toBeCloseTo(1);
  });
});
