import { FileUp, Users, CheckCircle, Database, ChevronRight } from 'lucide-react';

export const Workflow = () => {
  const steps = [
    { 
      icon: <FileUp size={24} />, 
      title: "Soumission", 
      desc: "Dépôt PDF sécurisé, métadonnées structurées et gestion collaborative des co-auteurs.",
      badge: "Étape 01",
      color: "indigo"
    },
    { 
      icon: <Users size={24} />, 
      title: "Évaluation", 
      desc: "Double-blind peer review avec affectation intelligente selon les domaines d'expertise.",
      badge: "Étape 02",
      color: "violet"
    },
    { 
      icon: <CheckCircle size={24} />, 
      title: "Décision", 
      desc: "Arbitrage transparent par l'Éditeur en chef : acceptation, révision ou rejet.",
      badge: "Étape 03",
      color: "emerald"
    },
    { 
      icon: <Database size={24} />, 
      title: "Publication", 
      desc: "Indexation automatique, attribution de DOI et archivage en accès libre (Open Access).",
      badge: "Étape 04",
      color: "blue"
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tighter text-slate-950 md:text-5xl">
              Le cycle de vie <span className="text-indigo-600">SciFlow.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Un pipeline automatisé conçu pour les journaux scientifiques modernes, 
              garantissant l'intégrité et la rapidité de la recherche informatique.
            </p>
          </div>
          <div className="hidden h-px flex-1 bg-slate-100 md:block mx-8 mb-4" />
        </div>

        {/* Grid Container */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-8 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2"
            >
              {/* Connector for Desktop (Hidden on last item) */}
              {i < steps.length - 1 && (
                <div className="absolute right-[-20px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-200 lg:block">
                  <ChevronRight size={32} strokeWidth={1} />
                </div>
              )}

              {/* Icon & Badge Row */}
              <div className="mb-8 flex items-center justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600`}>
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {step.badge}
                </span>
              </div>

              {/* Content */}
              <div className="mt-auto">
                <h4 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="mt-8 h-1 w-0 rounded-full bg-indigo-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};