import { useState } from "react";
import { type Article, type ArticleStatus } from "@/types/article";
import { 
  Calendar, ArrowRight, BookText, Search as SearchIcon, 
  Loader2, AlertCircle, Newspaper, User as UserIcon, ShieldCheck 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGetArticles } from "./hooks/queries/article";
import { Link } from "@tanstack/react-router";

export function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isPending, isError } = useGetArticles();

  const articles: Article[] = Array.isArray(data) ? data : data ? [data] : [];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getStatusBadge = (status: ArticleStatus) => {
    const configs: Record<ArticleStatus, { label: string, classes: string }> = {
      submitted: { label: "Soumis", classes: "bg-blue-50 text-blue-700" },
      under_review: { label: "En Révision", classes: "bg-amber-50 text-amber-700" },
      accepted: { label: "Accepté", classes: "bg-indigo-50 text-indigo-700" },
      published: { label: "Publié", classes: "bg-emerald-50 text-emerald-700" },
      rejected: { label: "Refusé", classes: "bg-red-50 text-red-700" },
    };
    const config = configs[status];
    return (
      <Badge variant="outline" className={`rounded-lg border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest ${config.classes}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 selection:bg-indigo-100">
      
      {/* Header Section */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[4px] text-indigo-600 mb-2">Archive Numérique</p>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
            Bibliothèque <span className="text-indigo-600">SciFlow.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-medium">
            Parcourez les manuscrits et publications scientifiques traitées par notre infrastructure.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative group">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <Input 
              placeholder="Titre, mots-clés, résumé..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-80 h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus-visible:ring-indigo-600 transition-all"
            />
          </div>
        </div>
      </div>

      <hr className="mb-12 border-slate-100" />

      {/* States Handling */}
      {isPending && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-slate-500">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="font-bold uppercase tracking-widest text-[10px]">Chargement des manuscrits...</p>
        </div>
      )}

      {isError && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-[2rem] border border-red-100 bg-red-50 text-red-600 p-8">
          <AlertCircle size={40} />
          <p className="font-bold">Erreur de synchronisation avec la base de données.</p>
        </div>
      )}

      {/* Articles Grid */}
      <section className="grid gap-6">
        {!isPending && !isError && filteredArticles.length === 0 && (
          <div className="text-center py-20 text-slate-400 italic">
            <Newspaper size={48} className="mx-auto mb-4 text-slate-300" />
            Aucun résultat correspondant à votre recherche.
          </div>
        )}

        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group relative flex flex-col gap-6 rounded-[2.5rem] border border-slate-100 bg-white p-8 transition-all duration-500 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 md:flex-row md:items-start md:gap-10"
          >
            {/* Visual Indicator */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-slate-50 text-slate-400 transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-3">
              <BookText size={32} strokeWidth={1.5} />
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {getStatusBadge(article.status)}
                
                {article.ai_decision && (
                  <Badge className="rounded-lg bg-slate-900 text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest flex gap-1 items-center">
                    <ShieldCheck size={12} className="text-indigo-400" /> IA Scanned
                  </Badge>
                )}

                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight text-slate-400 ml-auto">
                  <Calendar size={14} className="text-indigo-400" />
                  {article.published_at 
                    ? new Date(article.published_at).toLocaleDateString("fr-FR", { year: 'numeric', month: 'short', day: 'numeric' })
                    : "Créé le " + new Date(article.created_at).toLocaleDateString("fr-FR")
                  }
                </div>
              </div>

              <Link 
                to={`/articles/${article.id}` as any}
                className="block group-hover:cursor-pointer"
              >
                <h2 className="text-2xl font-black tracking-tighter text-slate-900 transition-colors group-hover:text-indigo-600 md:text-3xl leading-tight">
                  {article.title}
                </h2>
              </Link>

              <p className="mt-4 text-slate-500 text-sm leading-relaxed line-clamp-2">
                {article.abstract}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <UserIcon size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Auteur</span>
                    <span className="text-xs font-bold text-slate-700">{article.author?.name || "Chercheur SciFlow"}</span>
                  </div>
                </div>

                <Link
                  to={`/articles/${article.id}` as any}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 transition-all hover:gap-4 bg-indigo-50/50 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white"
                >
                  Consulter <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}