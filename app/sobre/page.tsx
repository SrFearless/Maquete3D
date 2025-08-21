"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h bg-stone-900 bg-[url('/images/medieval-bg.jpg')] bg-cover bg-fixed">
      {/* NavBar e RankingMarquee seriam inseridos aqui automaticamente */}

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-pixel text-amber-400 mb-4 tracking-wider">
            📜 Sobre o Artesão
          </h1>
          <div className="w-32 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="font-pixel text-amber-200 max-w-2xl mx-auto">
            Conheça o criador por trás das maquetes e a jornada nesta arte digital
          </p>
        </div>

        {/* Seção biográfica */}
        <div className="bg-stone-800/90 border-4 border-amber-700 rounded-lg p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-amber-600 rounded-full transform rotate-6"></div>
                <img 
                  src="/icons/Eu.png" 
                  alt="Retrato do Artista" 
                  className="relative z-10 w-48 h-48 rounded-full object-cover border-4 border-stone-700"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-pixel text-amber-300 mb-4">Olá, sou Tiago da Esquadramer!</h2>
              <p className="font-pixel text-amber-100 mb-4">
              Estou começando a explorar o mundo dimensional visando
              criar decorações para jogos e maquetes de apartamentos
              como também casas.
              </p>
              <p className="font-pixel text-amber-100">
              Aqui começei a criar os quartos e o apartamento no qual
              eu e minha familia vamos aderir.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de metodologia */}
        <div className="grid md:grid-cols-1 gap-8 mb-12">
          <div className="bg-stone-800/90 border-4 border-amber-700 rounded-lg p-6 shadow-xl">
            <h3 className="text-xl font-pixel text-amber-300 mb-4 flex items-center">
              <span className="mr-3">🛠️</span> Ferramentas
            </h3>
            <ul className="font-pixel text-amber-100 space-y-2">
              <li className="flex items-center">
                <span className="text-amber-400 mr-2">✦</span> Blender (principal)
              </li>
              <li className="flex items-center">
                <span className="text-amber-400 mr-2">✦</span> Unreal Engine 5 (visualização imersiva)
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de contato */}
        <div className="bg-stone-800/90 border-4 border-amber-700 rounded-lg p-8 text-center shadow-xl">
          <h2 className="text-2xl font-pixel text-amber-300 mb-6">Interessado em trabalhar juntos?</h2>
          <p className="font-pixel text-amber-100 mb-6 max-w-2xl mx-auto">
            Estou disponível para comissões de pixel art, criação de assets para jogos
            ou tutoriais personalizados. Envie uma mensagem através dos canais abaixo:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="font-pixel bg-amber-700 hover:bg-amber-600 text-stone-100">
              <Link href="mailto:tiagofreitasmachado@hotmail.com">📩 E-mail</Link>
            </Button>
            <Button asChild className="font-pixel bg-blue-700 hover:bg-blue-600 text-stone-100">
              <Link href="https://www.instagram.com/__freitasmachado.index__/" target="_blank">🐦 Instagram</Link>
            </Button>
            <Button asChild className="font-pixel bg-purple-700 hover:bg-purple-600 text-stone-100">
              <Link href="https://discord.gg/5aF9AtPKqu" target="_blank">🎮 Discord</Link>
            </Button>
          </div>
        </div>

        {/* Voltar para galeria */}
        <div className="mt-12 text-center">
          <Button asChild className="font-pixel bg-stone-700 hover:bg-stone-600 text-amber-300 border border-amber-700">
            <Link href="/">↩ Voltar para as Maquetes</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}