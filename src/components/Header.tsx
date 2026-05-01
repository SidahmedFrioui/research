import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Articles', href: '/articles' },
    { name: 'À propos', href: '/about' },
    // { name: 'Revues', href: '/reviews' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 group"
            >
              {item.name}
              <span className="absolute inset-x-4 bottom-1 h-0.5 scale-x-0 bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button 
            onClick={() => router.navigate({ to: '/auth/sign-in' })} 
            className="cursor-pointer px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
          >
            Se connecter
          </button>
          <button
            onClick={() => router.navigate({ to: '/auth/sign-up' })}
            className="cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:ring-4 hover:ring-indigo-100">
            S'inscrire
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="p-2 text-slate-600 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <hr className="my-2 border-slate-100" />
            <button 
              onClick={() => { router.navigate({ to: '/auth/sign-in' }); setIsOpen(false); }}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 font-bold text-slate-900"
            >
              Se connecter <ArrowRight size={18} />
            </button>
            <button className="w-full rounded-xl bg-indigo-600 p-4 font-bold text-white shadow-lg shadow-indigo-100">
              S'inscrire gratuitement
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}