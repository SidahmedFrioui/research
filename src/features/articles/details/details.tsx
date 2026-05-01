import { 
  FileText, Calendar, Download, Share2, 
  ChevronLeft, Award, ExternalLink, 
  Clock, Hash, Eye, Loader2, AlertTriangle, ShieldCheck,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter, useParams } from "@tanstack/react-router";
import { useGetArticleById } from "./hooks/queries/article";
import { type ArticleStatus } from "@/types/article";
import { useState } from "react";
import { ArticleDiscussion } from "./components/article-discussion";

export function ArticleDetails() {
  const router = useRouter();
  const [isShared, setIsShared] = useState(false);
  const { articleId } = useParams({ from: '/articles/$articleId' });
  
  const { data: article, isPending, isError } = useGetArticleById(articleId);

  // Status mapping for visual consistency
  const getStatusDisplay = (status: ArticleStatus) => {
    const map: Record<ArticleStatus, { label: string, classes: string }> = {
      submitted: { label: "Soumis", classes: "border-blue-200 bg-blue-50 text-blue-700" },
      under_review: { label: "En Évaluation", classes: "border-amber-200 bg-amber-50 text-amber-700" },
      accepted: { label: "Accepté", classes: "border-indigo-200 bg-indigo-50 text-indigo-700" },
      rejected: { label: "Refusé", classes: "border-red-200 bg-red-50 text-red-700" },
      published: { label: "Publié", classes: "border-emerald-200 bg-emerald-50 text-emerald-700" },
    };
    return map[status] || { label: status, classes: "bg-slate-50 text-slate-700" };
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8FAFC]">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Récupération du manuscrit...</p>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F8FAFC]">
        <div className="rounded-full bg-red-50 p-6 text-red-500">
          <AlertTriangle size={48} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Article introuvable</h2>
          <p className="text-slate-500">Le document que vous recherchez n'existe pas ou a été déplacé.</p>
        </div>
        <Button onClick={() => router.history.back()} variant="outline" className="rounded-xl">
          Retour à la bibliothèque
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Trigger the "sexy" feedback loop
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      // Fail silently or handle cancel
    }
  };

  const statusInfo = getStatusDisplay(article.status);

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Button onClick={() => router.history.back()} variant="ghost" className="cursor-pointer gap-2 text-slate-600 hover:text-indigo-600">
            <ChevronLeft size={18} /> Retour
          </Button>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleShare}
              variant="outline" 
              size="sm" 
              className={`
                relative cursor-pointer gap-2 rounded-xl border-slate-200 font-bold transition-all duration-300
                ${isShared ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "hover:border-indigo-600 hover:text-indigo-600"}
              `}
            >
              <div className="flex items-center gap-2 transition-all duration-300">
                {isShared ? (
                  <>
                    <Check size={16} className="animate-in zoom-in duration-300" />
                    <span>Lien Copié</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} className="animate-in fade-in duration-300" />
                    <span>Partager</span>
                  </>
                )}
              </div>
            </Button>
            {article.file_path && (
              <Button size="sm" className="cursor-pointer gap-2 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100">
                <Download size={16} /> PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
          
          {/* LEFT COLUMN: The Paper */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="rounded-lg bg-indigo-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  Science & Tech
                </Badge>
                <Badge variant="outline" className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusInfo.classes}`}>
                  {statusInfo.label}
                </Badge>
                {article.ai_decision && (
                  <Badge className="rounded-lg bg-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white flex gap-1 items-center">
                    <ShieldCheck size={12} className="text-indigo-400" /> IA Evaluated
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl lg:text-6xl leading-[1.1]">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200">
                    {article.author?.name?.charAt(0) || 'A'}
                  </div>
                  <span className="text-slate-900 font-bold">{article.author?.name || 'Auteur SciFlow'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-slate-300" />
                  <span>
                    {new Date(article.created_at).toLocaleDateString("fr-FR", { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            <section className="space-y-6 rounded-[2.5rem] bg-white p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 text-slate-900">
                  <FileText className="text-indigo-600" /> Résumé
                </h2>
                <p className="text-lg leading-relaxed text-slate-600 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-600">
                  {article.abstract}
                </p>
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Métadonnées du manuscrit</h3>
                <ul className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Status Actuel", value: statusInfo.label },
                    { label: "Dernière Mise à jour", value: new Date(article.updated_at).toLocaleDateString() },
                    { label: "Décision IA", value: article.ai_decision || "En attente" },
                    { label: "Date de Publication", value: article.published_at ? new Date(article.published_at).toLocaleDateString() : "Non publié" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm border border-slate-100/50">
                      <Award className="text-indigo-600 shrink-0" size={18} />
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">{item.label}</p>
                        <p className="font-bold text-slate-700">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar Stats & Metadata */}
          <aside className="space-y-6">
            <Card className="rounded-[2rem] border-none bg-slate-900 p-8 text-white shadow-2xl">
              <h4 className="mb-6 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Référence</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Hash className="text-indigo-400" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Manuscript ID</p>
                    <span className="text-xl font-black leading-none">#{article.id}</span>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center gap-3">
                  <Eye className="text-violet-400" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Visibilité</p>
                    <span className="text-xl font-black leading-none">
                      {article.status === 'published' ? 'Publique' : 'Privée'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h4 className="mb-6 font-bold text-slate-900">Actions & Info</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 text-slate-300" size={18} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Délai de traitement</p>
                    <p className="text-sm font-medium text-slate-900">Normal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ExternalLink className="mt-1 text-slate-300" size={18} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chemin du fichier</p>
                    <p className="text-sm font-medium text-slate-900 truncate max-w-[180px]">
                      {article.file_path || "Aucun fichier joint"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
      <ArticleDiscussion articleId={articleId} />
    </main>
  );
}