import { type Article } from "@/types/article"
import { Calendar, ArrowRight, BookText, Search as SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Articles() {
  const articles: Article[] = [
    {
      id: 1,
      title: "Deep Learning pour la détection des incendies",
      abstract: "Une approche basée sur les réseaux neuronaux pour détecter les incendies en temps réel via des flux vidéo haute résolution, optimisée pour le edge computing.",
      published_at: "2026-03-10",
    },
    {
      id: 2,
      title: "Optimisation des systèmes distribués",
      abstract: "Analyse comparative des performances dans les architectures distribuées modernes, focalisée sur la réduction de la latence dans les protocoles de consensus.",
      published_at: "2026-02-22",
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 selection:bg-indigo-100">
      
      {/* Header Section */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
            Bibliothèque <span className="text-indigo-600">SciFlow.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-medium">
            Explorez les dernières avancées en informatique validées par notre comité d'experts.
          </p>
        </div>
        
        {/* Quick Search/Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <Input 
              placeholder="Rechercher un titre..." 
              className="pl-10 w-full md:w-64 rounded-xl border-slate-200 bg-white"
            />
          </div>
          {/* <Button variant="outline" className="rounded-xl border-slate-200 gap-2 font-bold text-slate-700">
            <Filter size={18} /> Filtres
          </Button> */}
        </div>
      </div>

      <hr className="mb-12 border-slate-100" />

      {/* Articles Grid */}
      <section className="grid gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group relative flex flex-col gap-6 rounded-[2rem] border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 md:flex-row md:items-start md:gap-10"
          >
            {/* Left: Icon/Visual Placeholder */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <BookText size={32} strokeWidth={1.5} />
            </div>

            {/* Right: Content */}
            <div className="flex flex-1 flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  Informatique
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar size={14} />
                  {new Date(article.published_at).toLocaleDateString("fr-FR", { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </div>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 md:text-3xl">
                {article.title}
              </h2>

              <p className="mt-4 text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3">
                {article.abstract}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200" />
                  <span className="text-xs font-bold text-slate-700">Comité Éditorial SciFlow</span>
                </div>

                <a
                  href={`/articles/${article.id}`}
                  className="flex items-center gap-2 text-sm font-black text-indigo-600 transition-all hover:gap-3"
                >
                  Lire l'article <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}