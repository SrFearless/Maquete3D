"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-900/90 backdrop-blur-sm border-b-2 border-amber-800 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo e título */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="rounded-full border-2 border-amber-700 p-1 group-hover:border-amber-500 transition-colors">
            <img 
              src="/icons/Marca.png" 
              alt="Brasão" 
              className="h-8 w-8 object-contain" 
            />
          </div>
          <span className="font-pixel text-amber-300 text-xl tracking-wider group-hover:text-amber-200 transition-colors">
            Esquadramer
          </span>
        </Link>

        {/* Menu mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md border border-amber-700 text-amber-300 hover:bg-amber-900/50">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-stone-800 border-r-2 border-amber-700">
            <nav className="grid gap-6 text-lg mt-8">
              <Link 
                href="https://portfolio-pessoal-mu-virid.vercel.app" 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md font-pixel text-purple-500 hover:bg-amber-900/50 bg-amber-900/30 border-l-4 border-amber-500",
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>Voltar ao Portifólio</span>
              </Link>
              <Link 
                href="/" 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md font-pixel text-amber-200 hover:bg-amber-900/50",
                  pathname === "/" && "bg-amber-900/30 border-l-4 border-amber-500"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>🏰 Maquetes</span>
              </Link>
              <Link 
                href="/sobre" 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md font-pixel text-amber-200 hover:bg-amber-900/50",
                  pathname === "/sobre" && "bg-amber-900/30 border-l-4 border-amber-500"
                )}
                onClick={() => setIsOpen(false)}
              >
                <span>📜 Sobre</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="https://portfolio-pessoal-mu-virid.vercel.app" 
            className={cn(
              "font-pixel text-purple-500 hover:text-purple-200 px-3 py-1 rounded-md transition-colors bg-amber-900/30 border-l-4 border-amber-500",
            )}
          >
            Voltar ao Portifólio
          </Link>
          <Link 
            href="/" 
            className={cn(
              "font-pixel text-amber-300 hover:text-amber-200 px-3 py-1 rounded-md transition-colors",
              pathname === "/" && "bg-amber-900/30 border-b-2 border-amber-500"
            )}
          >
            🏰 Maquetes
          </Link>
          <Link 
            href="/sobre" 
            className={cn(
              "font-pixel text-amber-300 hover:text-amber-200 px-3 py-1 rounded-md transition-colors",
              pathname === "/sobre" && "bg-amber-900/30 border-b-2 border-amber-500"
            )}
          >
            📜 Sobre
          </Link>
        </nav>
      </div>
    </header>
  )
}