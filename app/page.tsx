          'use client';

          import { useState, useRef, Suspense } from 'react';
          import { Canvas } from '@react-three/fiber';
          import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
          import { motion } from 'framer-motion';
          import { ThemeWrapper } from '../components/ThemeWrapper';
          
          interface ModelOption {
            id: string;
            label: string;
            description: string;
            modelPath: string;
            texturePath?: string;
            scale?: [number, number, number];
            position?: [number, number, number];
            dimensions?: string;
          }
          
          export default function MedievalGallery() {
            const [selectedModel, setSelectedModel] = useState<string>('sword');
            const orbitControlsRef = useRef<any>(null);
          
            const modelOptions: ModelOption[] = [
              {
                id: 'sword',
                label: 'Apartamento',
                description: 'Visão completa do apartamento',
                modelPath: '/models/Apartamento.glb',
                texturePath: '/textures/sword_metal.jpg',
                scale: [0.2, 0.2, 0.2],
                position: [0.7, 0, 1.5],
                dimensions: 'Área total: 85m² | 2 Quartos | 1 Banheiro'
              },
              {
                id: 'shield',
                label: 'Quarto do Tiago',
                description: 'Dimensões técnicas do ambiente',
                modelPath: '/models/Quarto do Tiago.glb',
                texturePath: '/textures/shield_wood.jpg',
                scale: [0.2, 0.2, 0.2],
                position: [-0.5, -3, -5],
                dimensions: 'Quarto: 2.60m x 2.50m | Janela: 1.20m x 1.10m | Porta: 0.75m x 1.88m'
              },
              {
                id: 'helmet',
                label: 'Quarto do Quezia',
                description: 'Detalhes estruturais e medidas',
                modelPath: '/models/Apartamento.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, -2.5, 0],
                dimensions: 'Pé-direito: 2.40m | Espessura de paredes: 0.15m'
              },
              {
                id: 'castle',
                label: 'Quarto dos Pais',
                description: 'Visualização das plantas baixas',
                modelPath: '/models/Apartamento.glb',
                scale: [0.12, 0.12, 0.12],
                position: [0, -1.8, 0],
                dimensions: 'Sala: 4.20m x 3.80m | Cozinha: 2.70m x 2.50m'
              },
              {
                id: 'dragon',
                label: 'Cozinha',
                description: 'Visualização em corte',
                modelPath: '/models/Apartamento.glb',
                scale: [0.18, 0.18, 0.18],
                position: [0, -2.2, 0],
                dimensions: 'Altura total: 2.40m | Espessura de laje: 0.20m'
              },
              {
                id: 'serpe',
                label: 'Banheiro',
                description: 'Visualização em corte',
                modelPath: '/models/Apartamento.glb',
                scale: [0.18, 0.18, 0.18],
                position: [0, -2.2, 0],
                dimensions: 'Altura total: 2.40m | Espessura de laje: 0.20m'
              },
              {
                id: 'rat',
                label: 'Sala',
                description: 'Visualização em corte',
                modelPath: '/models/Apartamento.glb',
                scale: [0.18, 0.18, 0.18],
                position: [0, -2.2, 0],
                dimensions: 'Altura total: 2.40m | Espessura de laje: 0.20m'
              }
            ];
          
            const ModelViewer = ({ 
              modelPath, 
              scale = [1, 1, 1], 
              position = [0, 0, 0] 
            }: { 
              modelPath: string;
              scale?: [number, number, number];
              position?: [number, number, number];
            }) => {
              const { scene } = useGLTF(modelPath);
              return (
                <group>
                  <primitive
                    object={scene}
                    scale={scale}
                    position={position}
                    rotation={[10, Math.PI / 2, 0]}
                  />
                </group>
              );
            };
          
            // Pré-carrega todos os modelos
            modelOptions.forEach(model => {
              useGLTF.preload(model.modelPath);
            });
          
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
                  <header className="py-1 text-center border-b border-stone-300 dark:border-stone-700">
                    <h1 className="text-4xl font-medieval text-stone-800 dark:text-stone-200">
                      Visualização Arquitetônica
                    </h1>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                      Explore o apartamento em três dimensões com medidas técnicas
                    </p>
                  </header>
          
                  {/* Área do Modelo 3D */}
                  <div className="relative h-[75vh] w-full border-b border-stone-300 dark:border-stone-700">
                    <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
                      <ambientLight intensity={0.7} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} castShadow />
                      <Suspense fallback={null}>
                        <ModelViewer 
                          modelPath={currentModel.modelPath}
                          scale={currentModel.scale}
                          position={currentModel.position}
                        />
                        <Environment preset="city" />
                      </Suspense>
                      <OrbitControls
                        ref={orbitControlsRef}
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={15}
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
                    {currentModel.dimensions && (
                      <div className="mt-4 p-3 bg-stone-200 dark:bg-stone-700 rounded-lg inline-block">
                        <div className="font-semibold text-stone-800 dark:text-stone-200">Medidas:</div>
                        <div className="text-sm text-stone-700 dark:text-stone-300">{currentModel.dimensions}</div>
                      </div>
                    )}
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