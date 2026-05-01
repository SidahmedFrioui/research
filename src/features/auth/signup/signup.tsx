import { Mail, Lock, User, Image as Briefcase, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from '@tanstack/react-router';

export const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12 selection:bg-indigo-100">
      <Card className="gap-0 w-full max-w-6xl rounded-[32px] overflow-hidden shadow-2xl border-none flex flex-col md:flex-row min-h-[750px] py-0">
        
        {/* Visual Side (Left) */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-16 group cursor-default">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md transition-transform group-hover:scale-110">
                <BookOpen size={28} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">SciFlow</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              L'excellence académique <br />
              <span className="text-indigo-200">commence ici.</span>
            </h2>
            <p className="text-indigo-100/80 text-lg max-w-md leading-relaxed font-medium">
              Gérez vos soumissions, suivez les évaluations par les pairs et publiez vos recherches en toute simplicité.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
            <p className="italic text-indigo-50 leading-relaxed">
              "SciFlow a transformé notre flux de travail. La transparence du cycle de vie des articles est un atout majeur pour nos chercheurs."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-400/30 border border-white/20" />
              <div>
                <p className="font-bold text-sm text-white">Dr. Sarah Chen</p>
                <p className="text-xs text-indigo-200/70 uppercase tracking-widest font-semibold">Directrice de recherche, MIT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side (Right) */}
        <CardContent className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Créer un compte</h3>
              <p className="text-slate-500 mt-2 font-medium">Remplissez les détails pour rejoindre la plateforme.</p>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-bold ml-1">Nom complet</Label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input id="name" placeholder="Dr. Jean Dupont" className="pl-11 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500" />
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Email institutionnel</Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input id="email" type="email" placeholder="jean.dupont@universite.fr" className="pl-11 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500" />
                </div>
              </div>

              {/* Password */}
              <div className="md:col-span-1 space-y-2">
                <Label htmlFor="pass" className="text-slate-700 font-bold ml-1">Mot de passe</Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input id="pass" type="password" placeholder="••••••••" className="pl-11 h-12 rounded-2xl bg-slate-50 border-slate-200 focus-visible:ring-indigo-500" />
                </div>
              </div>

              {/* Role Select */}
              <div className="md:col-span-1 space-y-2">
                <Label htmlFor="role" className="text-slate-700 font-bold ml-1">Rôle</Label>
                <Select defaultValue="author">
                  <SelectTrigger className="text-gray-900 py-4 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:ring-indigo-500 w-full">
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-900 rounded-xl border-slate-200">
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="editor">Éditeur</SelectItem>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="author">Auteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Background/Bio */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="bg" className="text-slate-700 font-bold ml-1">Parcours académique</Label>
                <div className="relative group">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input id="bg" placeholder="Spécialité / Université" className="pl-11 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-indigo-500" />
                </div>
              </div>

              <Button className="md:col-span-2 mt-4 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base transition-all shadow-xl shadow-indigo-100 group">
                S'inscrire maintenant
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            
            <p className="mt-8 text-center text-slate-500 font-medium">
              Déjà inscrit ? {" "}
              <Link to="/auth/sign-in" className="text-indigo-600 font-bold hover:text-indigo-700 transition underline underline-offset-4 decoration-2 decoration-indigo-100">
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};