// components/ModelLoader.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};

function SwordModel({ modelPath }: { modelPath: string }) {
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;
  
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
  // Implemente loaders específicos para cada modelo ou use um loader genérico
  switch(modelPath) {
    case '/models/Apartamento.glb':
      return <SwordModel modelPath={modelPath} />;
    // Adicione casos para outros modelos
    default:
      return (
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      );
  }
}