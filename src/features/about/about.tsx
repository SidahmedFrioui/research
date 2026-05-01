import { Target, ShieldCheck, Zap, Users2, Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-700">
      {/* Hero Section: The Vision */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 max-w-7xl mx-auto">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/4 transform">
          <div className="h-[600px] w-[600px] rounded-full bg-indigo-50/50 blur-[120px]" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-indigo-600" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Notre Mission
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] text-slate-950 max-w-4xl">
            Redéfinir les standards de la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              publication académique.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-xl text-slate-500 leading-relaxed font-medium">
            SciFlow n'est pas qu'un outil de gestion. C'est un écosystème conçu pour 
            propulser la recherche informatique dans une nouvelle ère de rapidité et de transparence.
          </p>
        </div>
      </section>

      {/* Narrative Section: The Problem & Solution */}
      <section className="px-6 py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Les processus traditionnels, saturés d'échanges d'emails et de fichiers éparpillés, 
              freinent l'innovation. <strong className="text-slate-900 font-bold">SciFlow centralise chaque interaction</strong>, 
              offrant aux auteurs, reviewers et éditeurs un environnement structuré pour collaborer sans friction.
            </p>
            <p>
              De la première soumission PDF à l'attribution finale du DOI, chaque étape est 
              gravée dans un pipeline de données clair, garantissant une 
              <span className="text-indigo-600 font-semibold"> traçabilité totale </span> 
              et une intégrité scientifique sans compromis.
            </p>
          </div>
          
          {/* Visual Card / Bento Feature */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Zap className="text-amber-500" />, label: "Rapidité", desc: "Flux de travail optimisés" },
              { icon: <ShieldCheck className="text-emerald-500" />, label: "Sécurité", desc: "Données protégées" },
              { icon: <Users2 className="text-indigo-500" />, label: "Collab", desc: "Espace centralisé" },
              { icon: <Target className="text-violet-500" />, label: "Précision", desc: "Suivi en temps réel" },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm rounded-3xl bg-white p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-bold text-slate-900">{item.label}</h4>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section: Why SciFlow */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            Pourquoi choisir SciFlow ?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold">Modernité</h3>
            <p className="text-slate-500 leading-relaxed">
              Une interface épurée qui élimine le bruit visuel, permettant aux chercheurs 
              de se concentrer sur l'essentiel : le contenu scientifique.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-violet-50 text-violet-600">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold">Transparence</h3>
            <p className="text-slate-500 leading-relaxed">
              Chaque décision éditoriale et chaque retour de review est documenté, 
              mettant fin à l'opacité des processus de publication.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Fiabilité</h3>
            <p className="text-slate-500 leading-relaxed">
              Conçu pour les journaux informatiques, notre système gère les versions 
              et les révisions sans risque de perte de données.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};