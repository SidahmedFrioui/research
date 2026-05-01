import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  Menu, 
  X, 
  ArrowRight, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import { Logo } from "./Logo";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGetUser } from "#/features/auth/profile/hooks/use-get-user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

  const navItems = [
    { name: 'Articles', href: '/articles' },
    { name: 'À propos', href: '/about' },
  ];

  const { data: user } = useGetUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.navigate({ to: '/auth/sign-in' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
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

        {/* Desktop Actions - CONDITIONAL */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer flex items-center gap-2 rounded-full">
                  <Avatar className="h-10 w-10 rounded-lg border-2 border-slate-100 shadow-sm">
                    <AvatarImage src={user?.profile_picture} className="object-cover" />
                    <AvatarFallback className="bg-slate-100 text-[var(--primary)] text-3xl font-serif">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white w-56 rounded-2xl p-2 shadow-xl border-slate-100">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Navigation
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.navigate({ to: '/dashboard' })} className="rounded-xl cursor-pointer py-2.5 hover:bg-slate-100">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Tableau de bord</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.navigate({ to: '/auth/profile' })} className="rounded-xl cursor-pointer py-2.5 hover:bg-slate-100">
                  <UserIcon className="mr-2 h-4 w-4 text-slate-500" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-slate-100" />
                <DropdownMenuItem onClick={handleLogout} className="rounded-xl cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="cursor-pointer p-2 text-slate-600 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - CONDITIONAL */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <hr className="my-2 border-slate-100" />

            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => { router.navigate({ to: '/auth/sign-in' }); setIsOpen(false); }}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 font-bold text-slate-900"
                >
                  Se connecter <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => { router.navigate({ to: '/auth/sign-up' }); setIsOpen(false); }}
                  className="w-full rounded-xl bg-indigo-600 p-4 font-bold text-white shadow-lg shadow-indigo-100"
                >
                  S'inscrire gratuitement
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { router.navigate({ to: '/dashboard' }); setIsOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <LayoutDashboard size={20} className="text-indigo-600" /> Dashboard
                </button>
                <button 
                  onClick={() => { router.navigate({ to: '/auth/profile' }); setIsOpen(false); }}
                  className="flex items-center gap-3 rounded-xl p-3 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <UserIcon size={20} className="text-indigo-600" /> Profil
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl p-3 font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} /> Se déconnecter
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}