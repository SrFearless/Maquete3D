'use client';

import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh, MeshStandardMaterial, Object3D, BufferGeometry } from 'three';

// Tipo mais compatível com o que useGLTF retorna
type GLTFNode = Object3D & {
  geometry?: BufferGeometry;
  material?: MeshStandardMaterial;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

type GLTFMaterial = MeshStandardMaterial;

type GLTFResult = GLTF & {
  nodes: Record<string, GLTFNode>;
  materials: Record<string, GLTFMaterial>;
};

function SwordModel({ modelPath }: { modelPath: string }) {
  const { nodes, materials } = useGLTF(modelPath) as unknown as GLTFResult;
  
  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.apartamento.geometry}
        material={materials.metal}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={1}
        castShadow
      />
    </group>
  );
}

export function ModelLoader({ modelPath }: { modelPath: string }) {
  switch(modelPath) {
    case '/models/Apartamento.glb':
      return <SwordModel modelPath={modelPath} />;
    default:
      return (
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      );
  }
}