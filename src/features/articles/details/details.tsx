import { 
  FileText, Calendar, Download, Share2, 
  MessageSquare, ChevronLeft, Award, ExternalLink, 
  Clock, Hash, Eye, Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";

export function ArticleDetails() {
  const router = useRouter();
  // Mock data - In a real app, fetch this based on the ID from the URL
  const article = {
    title: "Deep Learning pour la détection des incendies via Edge Computing",
    authors: ["Dr. Jean Dupont", "Pr. Marie Curie", "Lucas Bernard"],
    date: "2026-03-10",
    status: "Publié",
    category: "Informatique",
    doi: "10.5555/sciflow.2026.042",
    citations: 24,
    views: 1240,
    abstract: "Cette étude présente une nouvelle architecture de réseau neuronal convolutif optimisée pour les dispositifs à ressources limitées. En utilisant la quantification des poids et l'élagage des neurones, nous parvenons à une détection en temps réel avec une précision de 98% tout en réduisant la consommation énergétique de 40% par rapport aux modèles standards.",
    conclusion: "Nos résultats démontrent que le déploiement local de l'intelligence artificielle est non seulement viable mais essentiel pour la sécurité civile en zone rurale."
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Navigation Bar */}
      <div className="sticky top-[64px] z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Button onClick={() => {
            router.history.back();
          }} variant="ghost" className="cursor-pointer gap-2 text-slate-600 hover:text-indigo-600">
            <ChevronLeft size={18} /> Retour aux articles
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="cursor-pointer gap-2 rounded-xl border-slate-200 font-bold">
              <Share2 size={16} /> Partager
            </Button>
            <Button size="sm" className="cursor-pointer gap-2 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100">
              <Download size={16} /> Télécharger PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
          
          {/* LEFT COLUMN: The Paper */}
          <div className="space-y-12">
            {/* Header Area */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="rounded-lg bg-indigo-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  {article.category}
                </Badge>
                <Badge variant="outline" className="rounded-lg border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  Peer Reviewed
                </Badge>
              </div>

              <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-6xl leading-[1.1]">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200">
                    JD
                  </div>
                  <span className="text-slate-900 font-bold">{article.authors[0]}</span>
                  <span className="text-slate-400">et al.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-slate-300" />
                  <span>Publié le {new Date(article.date).toLocaleDateString("fr-FR", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Main Content Sections */}
            <section className="space-y-6 rounded-[2.5rem] bg-white p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <FileText className="text-indigo-600" /> Abstract
                </h2>
                <p className="text-lg leading-relaxed text-slate-600 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-600">
                  {article.abstract}
                </p>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Points clés</h3>
                <ul className="grid gap-4 md:grid-cols-2">
                  {[
                    "Optimisation pour le matériel embarqué",
                    "Précision de détection accrue",
                    "Efficacité énergétique (LPWAN)",
                    "Architecture open-source"
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600 border border-slate-100/50">
                      <Award className="text-indigo-600 shrink-0" size={18} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <h2 className="text-2xl font-black tracking-tight mb-4">Conclusion</h2>
                <p className="text-slate-600 leading-relaxed italic border-l-4 border-indigo-100 pl-6 py-2">
                  "{article.conclusion}"
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar Stats & Metadata */}
          <aside className="space-y-6">
            {/* Impact Card */}
            <Card className="rounded-[2rem] border-none bg-slate-900 p-8 text-white shadow-2xl">
              <h4 className="mb-6 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Impact de l'article</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Quote size={16} />
                    <span className="text-2xl font-black leading-none">{article.citations}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Citations</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-violet-400">
                    <Eye size={16} />
                    <span className="text-2xl font-black leading-none">{article.views}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Vues</p>
                </div>
              </div>
              <Button className="mt-8 w-full rounded-xl bg-white/10 font-bold text-white backdrop-blur-md hover:bg-white/20">
                Statistiques détaillées
              </Button>
            </Card>

            {/* Metadata Detail Card */}
            <Card className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h4 className="mb-6 font-bold text-slate-900">Informations</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Hash className="mt-1 text-slate-300" size={18} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">DOI</p>
                    <p className="text-sm font-medium text-slate-900 break-all">{article.doi}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 text-slate-300" size={18} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lecture estimée</p>
                    <p className="text-sm font-medium text-slate-900">12 Minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ExternalLink className="mt-1 text-slate-300" size={18} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Éditeur</p>
                    <p className="text-sm font-medium text-slate-900 underline underline-offset-4 cursor-pointer hover:text-indigo-600 transition">Journal d'Informatique SciFlow</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feedback / Review Widget (Role Specific Feel) */}
            <div className="rounded-[2rem] bg-indigo-50 p-8 border border-indigo-100">
              <h4 className="mb-2 font-bold text-indigo-900">Discussion</h4>
              <p className="text-sm text-indigo-700/70 mb-6">Participez à la peer-review ou posez une question à l'auteur.</p>
              <Button className="w-full rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-100 gap-2">
                <MessageSquare size={16} /> 12 Commentaires
              </Button>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}