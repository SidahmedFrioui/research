import { Shield, Lock, Eye, Database } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from '#/components/ui/badge';

export const PrivacyPolicy = () => {
  const sections = [
    { id: 'data-collection', title: 'Collecte des données', icon: <Database size={20} /> },
    { id: 'usage', title: 'Utilisation des informations', icon: <Eye size={20} /> },
    { id: 'protection', title: 'Protection et Sécurité', icon: <Lock size={20} /> },
    { id: 'rights', title: 'Vos Droits (RGPD)', icon: <Shield size={20} /> },
  ];

  return (
    <main className="min-h-screen bg-slate-50/30 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-4 bg-indigo-50 text-indigo-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            Mise à jour : 01 Mai 2026
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            Politique de <span className="text-indigo-600">Confidentialité.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl font-medium">
            Chez SciFlow, la protection de vos travaux de recherche et de vos données personnelles est notre priorité absolue.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-[250px_1fr] gap-12">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-white hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
                {s.icon} {s.title}
              </a>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <Card className="rounded-[2.5rem] border-slate-100 bg-white p-8 md:p-16 shadow-sm">
          <div className="space-y-16">
            
            <section id="data-collection" className="scroll-mt-28">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900">
                <Database className="text-indigo-600" /> 1. Données Collectées
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>Nous collectons les informations nécessaires au bon fonctionnement du cycle de publication :</p>
                <ul className="grid md:grid-cols-2 gap-4 mt-4 list-none p-0">
                  <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <strong className="text-slate-900">Identité :</strong> Nom, email, affiliation institutionnelle et rôle.
                  </li>
                  <li className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <strong className="text-slate-900">Manuscrits :</strong> Fichiers PDF, métadonnées et historiques de versions.
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-slate-50" />

            <section id="usage" className="scroll-mt-28">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900">
                <Eye className="text-indigo-600" /> 2. Utilisation des données
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Vos données sont utilisées exclusivement pour gérer le processus de peer-review, 
                vous notifier des décisions éditoriales et, en cas d'acceptation, 
                publier vos travaux sous licence libre. <strong>Nous ne vendons jamais vos données à des tiers.</strong>
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
};