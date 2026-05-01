import { Bell } from "lucide-react";

export const Roles = () => {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="p-12 md:w-1/2 text-white">
            <h2 className="text-4xl font-bold mb-6">Un tableau de bord pour chaque rôle.</h2>
            <div className="space-y-6">
              {[
                { role: "Éditeur", task: "Gère les soumissions et supervise les reviewers." },
                { role: "Reviewer", task: "Accède aux articles anonymisés pour évaluation." },
                { role: "Auteur", task: "Suit l'état (en cours, accepté, rejeté) en temps réel." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-l-2 border-indigo-400/30 pl-6">
                  <div>
                    <div className="font-bold text-indigo-200">{item.role}</div>
                    <div className="text-sm text-indigo-50/80">{item.task}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md md:w-1/2 p-8 flex items-center justify-center">
             {/* Visual Placeholder for App Interface */}
             <div className="w-full aspect-video bg-white/90 rounded-2xl shadow-2xl overflow-hidden border border-white/20 relative p-4">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-20 w-full bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Auteur : Tableau de bord des versions
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 bg-indigo-50 rounded border border-indigo-100" />
                    <div className="h-8 bg-indigo-50 rounded border border-indigo-100" />
                    <div className="h-8 bg-indigo-50 rounded border border-indigo-100" />
                  </div>
                </div>
                <Bell className="absolute top-6 right-6 text-indigo-600 animate-bounce" size={20} />
             </div>
          </div>
        </div>
      </section>
  );
};