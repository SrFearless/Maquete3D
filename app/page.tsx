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
                position: [0.7, 1, 1.5],
                dimensions: 'Área total: 85m² | 3 Quartos | 1 Banheiro | 1 Cozinha | 1 Lavanderia | 1 Sala'
              },
              {
                id: 'shield',
                label: 'Quarto do Tiago',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/Quarto do Tiago.glb',
                texturePath: '/textures/shield_wood.jpg',
                scale: [0.2, 0.2, 0.2],
                position: [-0.5, -2, -5],
                dimensions: 'Quarto: 2.60m x 2.50m | Abertura: 1,35m x 0,50m | Janela: 1.20m x 1.10m | Porta: 2.10m x 0.75m'
              },
              {
                id: 'helmet',
                label: 'Quarto do Quezia',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 3.00m x 2.50m | Janela: 1.20m x 1.10m | Porta: 2.10m x 0.75m'
              },
              {
                id: 'castle',
                label: 'Quarto dos Pais',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 3.00m x 2.50m | Abertura: 1,35m x 0,50m | Janela: 1.20m x 1.10m | Porta: 2.10m x 0.75m'
              },
              {
                id: 'dragon',
                label: 'Cozinha',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 2.60m x 2.65m (Entrada) 1.90m (Fundo) | Janela: 1.20m x 0.80m | Porta: 2.10m x 0.85m'
              },
              {
                id: 'serpe',
                label: 'Banheiro',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 2.20m x 1.20m | Porta: 2.10m x 0.65m'
              },
              {
                id: 'rat',
                label: 'Sala',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 4.00m x 2.90m | Janela: 1.80m x 1.10m | Entrada: 1.30m x 1.15m'
              },
              {
                id: 'cat',
                label: 'Lavanderia',
                description: 'Dimensões Técnicas do Quarto',
                modelPath: '/models/X.glb',
                scale: [0.2, 0.2, 0.2],
                position: [0, 0, 7],
                dimensions: 'Quarto: 1.30m x 1.50m | Janela: 1.00m x 0.80m | Porta: 2.10m x 0.75m'
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
                  className="min-h bg-stone-900"
                >
                  {/* Cabeçalho Medieval */}
                  <header className="py-1 text-center border-b border-stone-900">
                    <h1 className="text-4xl font-medieval text-stone-100 bg-stone-900">
                      Visualização Arquitetônica
                    </h1>
                  </header>
          
                  {/* Área do Modelo 3D */}
                  <div className="relative h-[67vh] w-full border-b border-stone-300 bg-stone-800">
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
                  <div className="px-4 py-2 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-medieval text-stone-100">
                      {currentModel.label}
                    </h2>
                    <p className="mt-2 text-stone-100">
                      {currentModel.description}
                    </p>
                    {currentModel.dimensions && (
                      <div className="mt-2 p-3 bg-stone-300 rounded-lg inline-block border-[3px] border-amber-700">
                        <div className="font-semibold text-stone-800">Medidas:</div>
                        <div className="text-sm text-stone-700">{currentModel.dimensions}</div>
                      </div>
                    )}
                  </div>
          
                  {/* Opções de Modelos */}
                  <div className="fixed bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-300 py-3">
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-4 gap-4">
                        {modelOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleModelChange(option.id)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`py-1 px-2 rounded-lg text-center transition-all ${selectedModel === option.id
                              ? 'bg-stone-800 text-stone-100 shadow-lg'
                              : 'bg-stone-300 text-stone-800 hover:bg-stone-400 border-[3px] border-amber-700'
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