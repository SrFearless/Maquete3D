"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const topRunners = [
  {name: "Aqui você vai encontrar meus trabalhos que são requisitados para conclusão de módulos, eles são básicos apenas para os alunos entender a lógica."},
]

export default function RankingMarquee() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(!pathname.includes("/configuracoes"))
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className="bg-stone-800/90 border-y-2 border-amber-700 py-2 text-amber-100 font-pixel shadow-lg">
      <div className="flex w-full items-center overflow-hidden">
        <div className="flex min-w-full animate-[marquee_30s_linear_infinite] items-center gap-8 px-4">
          {/* Ícone decorativo */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-amber-400">⚔️</span>
            <span className="text-amber-300">Anúncio:</span>
          </div>
          
          {/* Texto do marquee */}
          {topRunners.map((runner, index) => (
            <div key={index} className="flex items-center gap-4 whitespace-nowrap">
              <span className="text-amber-200">{runner.name}</span>
              {/* Separador decorativo */}
              <span className="text-amber-700">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}