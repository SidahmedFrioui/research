import { 
  ShieldCheck, 
  Scale, 
  FileSearch, 
  Users, 
  AlertCircle, 
  Fingerprint,
  BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "#/lib/utils";

const principles = [
  {
    title: "Intégrité Scientifique",
    description: "Toute recherche doit être menée avec honnêteté, rigueur et objectivité, sans manipulation de données.",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Originalité & Plagiat",
    description: "Les manuscrits doivent être des travaux originaux. Le plagiat, sous toutes ses formes, est strictement interdit.",
    icon: Fingerprint,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Transparence",
    description: "Divulgation complète des sources de financement et des conflits d'intérêts potentiels.",
    icon: FileSearch,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Équité de Relecture",
    description: "Les évaluateurs doivent juger les travaux uniquement sur leur mérite intellectuel, sans biais personnel.",
    icon: Scale,
    color: "text-violet-600",
    bg: "bg-violet-50"
  }
];

export function EthicalGuide() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6">
            <BookOpen size={12} /> Standards de Publication
          </div>
          <h1 className="text-5xl font-black tracking-tighter md:text-7xl leading-[0.9]">
            Guide d' <span className="text-indigo-500">Éthique.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-slate-400">
            SciFlow s'engage à maintenir les plus hauts standards d'intégrité dans la communication scientifique. 
            Ce guide définit les responsabilités des auteurs, des éditeurs et des relecteurs.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="container mx-auto max-w-6xl px-6 -mt-12 relative z-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Card key={i} className="group rounded-[2rem] border-none p-8 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className={cn("mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110", p.bg)}>
                <p.icon className={p.color} size={28} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-slate-900">{p.title}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{p.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Detailed Guidelines */}
      <section className="container mx-auto max-w-4xl px-6 mt-24">
        <div className="space-y-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-sm">01</span>
              Responsabilités des Auteurs
            </h2>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-600 font-medium">
              <p>
                Les auteurs doivent présenter une description précise de leur travail ainsi qu'une discussion objective de son importance. 
                Les données sous-jacentes doivent être représentées fidèlement dans le manuscrit.
              </p>
              <ul className="space-y-3 list-none pl-0">
                {["Soumission multiple interdite", "Attribution correcte des sources", "Signalement d'erreurs fondamentales"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl">
                    <AlertCircle className="text-indigo-600" size={18} />
                    <span className="text-slate-800 font-bold text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-sm">02</span>
              Processus de Relecture
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              La relecture par les pairs est un élément essentiel de la communication savante formelle. 
              SciFlow utilise un système de relecture en simple aveugle (Single-Blind Review) où l'identité des relecteurs est protégée.
            </p>
            <div className="rounded-[2.5rem] bg-indigo-50 p-8 border border-indigo-100">
               <div className="flex items-start gap-4">
                 <Users className="text-indigo-600 mt-1" size={24} />
                 <div>
                   <h4 className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Engagement des relecteurs</h4>
                   <p className="text-indigo-700/80 text-sm font-medium">
                     Tout manuscrit reçu pour révision doit être traité comme un document confidentiel. 
                     Ils ne doivent pas être montrés ou discutés avec d'autres personnes sans l'autorisation de l'éditeur.
                   </p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}