import { useMemo, useState } from 'react';
import * as THREE from 'three';
import type { FrenetFrame } from '../../math/frenetFrame';
import {
  getCharacteristicPlane,
  type CharacteristicPlaneType,
} from '../../math/characteristicPlanes';
import { HoverLabel } from './HoverLabel';

interface CharacteristicPlanesProps {
  frame: FrenetFrame;
  showOsculating: boolean;
  showNormal: boolean;
  showRectifying: boolean;
  size?: number;
}

const PLANE_COLORS: Record<CharacteristicPlaneType, string> = {
  osculating: '#ffb74d',
  normal: '#81c784',
  rectifying: '#64b5f6',
};

const PLANE_LABELS: Record<CharacteristicPlaneType, string> = {
  osculating: 'Osculating Plane (T-N)',
  normal: 'Normal Plane (N-B)',
  rectifying: 'Rectifying Plane (T-B)',
};

function PlaneMesh({
  frame,
  type,
  size,
}: {
  frame: FrenetFrame;
  type: CharacteristicPlaneType;
  size: number;
}) {
  const [hovered, setHovered] = useState(false);
  const plane = getCharacteristicPlane(frame, type);

  const geometry = useMemo(() => {
    if (!plane) return null;
    const half = size / 2;
    const center = plane.origin;
    const u = plane.basisU.clone().multiplyScalar(half);
    const v = plane.basisV.clone().multiplyScalar(half);
    const vertices = new Float32Array([
      center.x - u.x - v.x,
      center.y - u.y - v.y,
      center.z - u.z - v.z,
      center.x + u.x - v.x,
      center.y + u.y - v.y,
      center.z + u.z - v.z,
      center.x + u.x + v.x,
      center.y + u.y + v.y,
      center.z + u.z + v.z,
      center.x - u.x + v.x,
      center.y - u.y + v.y,
      center.z - u.z + v.z,
    ]);
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    result.setIndex([0, 1, 2, 0, 2, 3]);
    result.computeVertexNormals();
    return result;
  }, [plane, size]);

  if (!plane || !geometry) return null;

  return (
    <group>
      <mesh
        geometry={geometry}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial
          color={PLANE_COLORS[type]}
          transparent
          opacity={hovered ? 0.32 : 0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {hovered && (
        <group position={[plane.origin.x, plane.origin.y, plane.origin.z]}>
          <HoverLabel>{PLANE_LABELS[type]}</HoverLabel>
        </group>
      )}
    </group>
  );
}

export function CharacteristicPlanes({
  frame,
  showOsculating,
  showNormal,
  showRectifying,
  size = 1.8,
}: CharacteristicPlanesProps) {
  return (
    <>
      {showOsculating && <PlaneMesh frame={frame} type="osculating" size={size} />}
      {showNormal && <PlaneMesh frame={frame} type="normal" size={size} />}
      {showRectifying && <PlaneMesh frame={frame} type="rectifying" size={size} />}
    </>
  );
}