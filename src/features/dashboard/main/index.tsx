import * as React from "react";
import { 
  FileText, CheckCircle, Clock, AlertCircle, 
  Send, ArrowUpRight, Plus, BookOpen, Layers, Loader2, 
  User, ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { type Article, type ArticleStatus } from "@/types/article";
import { useGetArticles } from "../article/hooks/queries/article";
import { cn } from "@/lib/utils";
import { useAuth } from "#/contexts/auth";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, isPending } = useGetArticles();
  
  const role = user?.role || 'reader';
  const allArticles: Article[] = Array.isArray(data) ? data : data ? [data] : [];

  // --- LOGIC: ROLE-BASED FILTERING ---
  const articles = React.useMemo(() => {
    if (role === 'reviewer') {
      return allArticles.filter(article => article.reviews.some((review: any) => review.reviewer_id === user?.id));
    }
    if (role === 'author') {
      return allArticles.filter(article => article.author_id === user?.id);
    }
    return allArticles;
  }, [allArticles, role, user?.id]);

  const statsCount = {
    total: articles.length,
    pending: articles.filter(a => ['submitted', 'under_review'].includes(a.status)).length,
    published: articles.filter(a => a.status === 'published').length,
    accepted: articles.filter(a => a.status === 'accepted').length,
  };

  const getStatusConfig = (status: ArticleStatus) => {
    const configs: Record<ArticleStatus, { label: string, color: string }> = {
      submitted: { label: "Soumis", color: "bg-blue-50 text-blue-600 border-blue-100" },
      under_review: { label: "En évaluation", color: "bg-amber-50 text-amber-600 border-amber-100" },
      accepted: { label: "Accepté", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
      published: { label: "Publié", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      rejected: { label: "Refusé", color: "bg-red-50 text-red-600 border-red-100" },
    };
    return configs[status] || { label: status, color: "bg-slate-50 text-slate-600 border-slate-100" };
  };

  const dashboardConfig = {
    admin: {
      title: "Administration du Journal",
      stats: [
        { label: "Articles Totaux", value: statsCount.total, icon: FileText, color: "text-blue-600" },
        { label: "Décisions IA", value: articles.filter(a => a.ai_decision).length, icon: Layers, color: "text-purple-600" },
        { label: "Prêts pour Publication", value: statsCount.accepted, icon: CheckCircle, color: "text-emerald-600" },
      ],
      actions: [
        { label: "Valider les décisions", path: "/dashboard/articles/articles" },
        { label: "Gérer les utilisateurs", path: "/dashboard/manage/users" }
      ]
    },
    editor: {
      title: "Gestion des Soumissions",
      stats: [
        { label: "Nouvelles Soumissions", value: articles.filter(a => a.status === 'submitted').length, icon: AlertCircle, color: "text-amber-500" },
        { label: "En Évaluation", value: statsCount.pending, icon: Clock, color: "text-indigo-600" },
        { label: "Articles Publiés", value: statsCount.published, icon: BookOpen, color: "text-slate-600" },
      ],
      actions: [
        { label: "Affecter des Reviewers", path: "/dashboard/articles/articles" }
      ]
    },
    reviewer: {
      title: "Espace d'Évaluation",
      stats: [
        { label: "Mes Assignations", value: articles.length, icon: FileText, color: "text-violet-600" },
        { label: "À réviser", value: statsCount.pending, icon: Clock, color: "text-amber-500" },
        { label: "Invitations", value: "1", icon: Send, color: "text-blue-500" },
      ],
      actions: [
        { label: "Consulter les articles", path: "/dashboard/assigned-articles" },
        { label: "Consulter mes révisions", path: "/dashboard/my-reviews" },
        { label: "Guide d'éthique", path: "/dashboard/ethical-guide" }
      ]
    },
    author: {
      title: "Mes Publications",
      stats: [
        { label: "Mes Articles", value: statsCount.total, icon: FileText, color: "text-indigo-600" },
        { label: "En attente", value: statsCount.pending, icon: Clock, color: "text-amber-500" },
        { label: "Publiés", value: statsCount.published, icon: CheckCircle, color: "text-emerald-600" },
      ],
      actions: [
        { label: "Soumettre un article", path: "/dashboard/submit" }
      ]
    },
    reader: {
      title: "Bibliothèque Scientifique",
      stats: [
        { label: "Articles Disponibles", value: statsCount.published, icon: BookOpen, color: "text-slate-700" },
        { label: "Dernier Volume", value: "V.12", icon: Layers, color: "text-indigo-600" },
      ],
      actions: [
        { label: "Recherche avancée", path: "/dashboard/search" },
        { label: "Téléchargements", path: "/dashboard/downloads" }
      ]
    }
  };

  const currentConfig = dashboardConfig[role as keyof typeof dashboardConfig];

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-12 animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-[2px] text-indigo-600 border border-indigo-100">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Tableau de bord • {role}
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
                {currentConfig.title}
              </h1>
            </div>
            {role === 'author' && (
              <Button asChild size="lg" className="bg-indigo-600 rounded-2xl px-8 font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                <Link to="/dashboard/submit">
                  <Plus className="mr-2 h-5 w-5" /> Soumettre un Article
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-10">
        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentConfig.stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-xl shadow-slate-200/40 rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                  </div>
                  <div className={cn("p-4 rounded-[1.5rem] bg-slate-50 transition-all group-hover:scale-110 group-hover:rotate-3", stat.color)}>
                    <stat.icon size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* --- MAIN FEED --- */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between px-8 py-6">
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                      <Layers size={16} />
                   </div>
                   <CardTitle className="text-xl font-black tracking-tight">Flux des Articles</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 font-bold hover:text-indigo-600" asChild>
                  <Link to="/dashboard/articles/articles">Tout voir <ChevronRight size={14} /></Link>
                </Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {isPending && (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="animate-spin text-indigo-600" size={40} />
                      <p className="text-sm font-black uppercase tracking-widest text-slate-300">Synchronisation des données...</p>
                    </div>
                  )}

                  {!isPending && articles.length === 0 && (
                    <div className="p-20 text-center">
                      <div className="mx-auto w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-200">
                         <FileText size={32} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Aucun manuscrit</h3>
                      <p className="text-slate-400 font-medium max-w-xs mx-auto mt-2">
                        {role === 'reviewer' 
                          ? "Félicitations ! Vous n'avez aucune révision en attente." 
                          : "Votre bibliothèque est vide pour le moment."}
                      </p>
                    </div>
                  )}

                  {articles.slice(0, 6).map((article) => {
                    const statusInfo = getStatusConfig(article.status);
                    return (
                      <Link 
                        key={article.id} 
                        to={`/articles/${article.id}` as any}
                        className="px-8 py-6 flex items-center justify-between hover:bg-slate-50/80 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
                            <span className="text-xs font-black">#{article.id}</span>
                          </div>
                          <div className="max-w-[320px] md:max-w-[450px] space-y-1">
                            <p className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors tracking-tight">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              <span className="flex items-center gap-1.5 text-slate-600">
                                <User size={12} /> {article.author?.name || 'Auteur'}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} /> {new Date(article.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tight border",
                            statusInfo.color
                          )}>
                            {statusInfo.label}
                          </span>
                          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight size={16} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- SIDEBAR ACTIONS --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <Card className="border-none bg-slate-950 text-white shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px] rounded-full" />
              
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-[10px] font-black uppercase tracking-[3px] text-slate-500">Actions Prioritaires</CardTitle>
              </CardHeader>
              
              <CardContent className="p-0 space-y-4">
                {currentConfig.actions.map((action, i) => (
                  <Button 
                    key={i}
                    variant="ghost"
                    asChild
                    className="w-full h-auto flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 transition-all group"
                  >
                    <Link to={action.path}>
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm font-black tracking-tight">{action.label}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Accéder maintenant</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 group-hover:bg-indigo-600 transition-all">
                        <Plus size={16} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};