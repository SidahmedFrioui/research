import { Badge } from '#/components/ui/badge';
import { Scale, FileCheck, Ban } from 'lucide-react';

export const Terms = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6">
            Conditions d'Utilisation.
          </h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            En utilisant SciFlow, vous acceptez les règles suivantes régissant la soumission et la revue d'articles scientifiques.
          </p>
        </div>

        {/* The "Terms" Bento Stack */}
        <div className="space-y-8">
          
          {/* Section 1: Ownership */}
          <div className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-white shadow-sm text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <FileCheck size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Propriété Intellectuelle</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Les auteurs conservent les droits d'auteur sur leurs manuscrits. En soumettant à SciFlow, 
                  vous accordez au journal une licence non-exclusive pour publier et diffuser le travail validé.
                </p>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-400 font-black text-[9px] uppercase tracking-tighter px-3">
                  TL;DR: Vous gardez vos droits, nous publions l'article.
                </Badge>
              </div>
            </div>
          </div>

          {/* Section 2: Integrity */}
          <div className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-white shadow-sm text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <Scale size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Intégrité Scientifique</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Le plagiat, la manipulation de données ou les soumissions multiples simultanées sont strictement interdits. 
                  Toute infraction entraînera le rejet immédiat et le signalement aux institutions concernées.
                </p>
                <Badge variant="outline" className="bg-white border-amber-200 text-amber-600 font-black text-[9px] uppercase tracking-tighter px-3">
                  TL;DR: Soyez honnêtes. Le plagiat est banni.
                </Badge>
              </div>
            </div>
          </div>

          {/* Section 3: Liability */}
          <div className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-white shadow-sm text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white">
                <Ban size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Responsabilités</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  SciFlow est fourni "en l'état". Bien que nous nous efforcions d'assurer une disponibilité maximale, 
                  nous ne sommes pas responsables des pertes de données dues à des facteurs externes.
                </p>
                <Badge variant="outline" className="bg-white border-rose-200 text-rose-600 font-black text-[9px] uppercase tracking-tighter px-3">
                  TL;DR: Faites des backups, même si on gère la sécurité.
                </Badge>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};