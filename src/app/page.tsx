'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { motion } from 'framer-motion';
import { ThemeWrapper } from '../../components/ThemeWrapper';

interface ModelOption {
  id: string;
  label: string;
  description: string;
  modelPath: string;
  texturePath?: string;
}

export default function MedievalGallery() {
  const [selectedModel, setSelectedModel] = useState<string>('sword');
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  
  const modelOptions: ModelOption[] = [
    {
      id: 'sword',
      label: 'Apartamento',
      description: 'Aqui você vai ver o apartamento ao todo, para identificar quantos quartos existentes.',
      modelPath: '/models/Apartamento.glb',
      texturePath: '/textures/sword_metal.jpg'
    },
    {
      id: 'shield',
      label: 'Quarto do Tiago',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb',
      texturePath: '/textures/shield_wood.jpg'
    },
    {
      id: 'helmet',
      label: 'Quarto da Quezia',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb'
    },
    {
      id: 'castle',
      label: 'Quarto dos Pais',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb'
    },
    {
      id: 'dragon',
      label: 'Sala',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb'
    },
    {
      id: 'corse',
      label: 'Cozinha',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb'
    },
    {
      id: 'rat',
      label: 'Banheiro',
      description: 'Comprimento = 2,60m / Largura = 2,50m / Altura = 2,40m / Porta = 2,10m × 0,75m',
      modelPath: '/models/Apartamento.glb'
    }
  ];

  const ModelViewer = ({ modelPath }: { modelPath: string }) => {
    const { scene } = useGLTF(modelPath);
    return (
      <group>
        <primitive
          object={scene}
          scale={[0.2, 0.2, 0.2]}       // Ajuste de escala (50% do tamanho original)
          position={[0.5, -1, -1]}         // Ajuste de posição (move 1 unidade para baixo)
          rotation={[10, Math.PI / 2, 0]} // Ajuste de rotação (45 graus no eixo Y)
        />
      </group>
    );
  };

  useGLTF.preload('/models/Apartamento.glb');

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };

  const currentModel = modelOptions.find(option => option.id === selectedModel) || modelOptions[0];

  return (
    <ThemeWrapper>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-stone-100 dark:bg-stone-900"
      >
        {/* Cabeçalho Medieval */}
        <header className="py-6 text-center border-b border-stone-300 dark:border-stone-700">
          <h1 className="text-4xl font-medieval text-stone-800 dark:text-stone-200">
            Centro de Maquetes Real
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Imerja no seu Reino através de três dimensões
          </p>
        </header>

        {/* Área do Modelo 3D */}
        <div className="relative h-[75vh] w-full border-b border-stone-300 dark:border-stone-700">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Suspense fallback={null}>
              <ModelViewer modelPath={currentModel.modelPath} />
              <Environment preset="dawn" />
            </Suspense>
            <OrbitControls
              ref={orbitControlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Canvas>
        </div>

        {/* Descrição do Modelo */}
        <div className="px-4 py-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-medieval text-stone-800 dark:text-stone-200">
            {currentModel.label}
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            {currentModel.description}
          </p>
        </div>

        {/* Opções de Modelos */}
        <div className="fixed bottom-0 left-0 right-0 bg-stone-200 dark:bg-stone-800 border-t border-stone-300 dark:border-stone-700 py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-7 gap-4">
              {modelOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleModelChange(option.id)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-2 rounded-lg text-center transition-all ${selectedModel === option.id
                    ? 'bg-stone-800 dark:bg-stone-600 text-stone-100 shadow-lg'
                    : 'bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-400 dark:hover:bg-stone-600'
                    }`}
                >
                  <div className="text-sm font-medieval">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </ThemeWrapper>
  );
}