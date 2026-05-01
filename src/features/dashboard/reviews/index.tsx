import { useSearch } from "@tanstack/react-router";
import { 
  User, Calendar, ShieldCheck, AlertCircle, 
  Loader2, Quote, LayoutDashboard, ChevronRight, 
  FileText, BarChart3, CheckCircle2, CheckCircle,
  ArrowRight, PartyPopper
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetReviews } from "./hooks/queries/review";
import { useValidate } from "./hooks/mutations/review";
import { useGetArticleById } from "#/features/articles/details/hooks/queries/article";

export function Reviews() {
  const search = useSearch({ from: '/dashboard/reviews' });
  const articleId = (search as any).articleId; 

  const { data: reviews, isPending, isError } = useGetReviews(articleId);
  const { data: article } = useGetArticleById(articleId);
  const { mutate: validate, isPending: isValidating } = useValidate();

  // Helper to check if already validated
  const isAlreadyValidated = article?.status === 'accepted' || article?.status === 'published' || article?.status === 'submitted';

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <div className="absolute inset-0 blur-2xl bg-indigo-500/20 animate-pulse" />
        </div>
        <p className="text-xs font-black uppercase tracking-[3px] text-slate-400">Compilation des rapports...</p>
      </div>
    );
  }

  if (isError || !reviews) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="p-12 border-2 border-dashed border-red-100 rounded-[3rem] bg-red-50/30 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900">Erreur de chargement</h3>
          <p className="text-sm font-medium text-red-600/70 max-w-sm mx-auto">
            Nous n'avons pas pu récupérer les rapports d'expertise.
          </p>
        </div>
      </main>
    );
  }

  const reviewList = Array.isArray(reviews) ? reviews : [reviews];
  const completedReviews = reviewList.filter(r => r.status === 'completed').length;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- VALIDATION BANNER --- */}
      {isAlreadyValidated && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-[2rem] flex items-center justify-center gap-3 animate-in zoom-in duration-500">
          <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <CheckCircle size={18} />
          </div>
          <p className="text-sm font-black uppercase tracking-widest text-emerald-700">
            Ce manuscrit a été officiellement validé
          </p>
        </div>
      )}

      {/* --- REFINED HEADER SECTION --- */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/80">
              <LayoutDashboard size={12} />
              <span>Dashboard</span>
              <ChevronRight size={10} className="text-slate-300" />
              <span className="text-slate-400">Manuscrit #{articleId}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Revue <span className="text-indigo-600">Scientifique.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl">
               Décision finale basée sur les expertises du comité de lecture.
            </p>
          </div>

          {/* ACTION AREA: Toggle between Button and Validated Badge */}
          {!isAlreadyValidated ? (
            <Button 
              onClick={() => validate(Number(articleId))}
              disabled={isValidating}
              className="group relative overflow-hidden bg-slate-900 hover:bg-indigo-600 text-white rounded-[1.5rem] px-8 py-8 h-auto transition-all duration-500 shadow-2xl shadow-indigo-200 active:scale-95"
            >
              <div className="relative z-10 flex flex-col items-start text-left">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Action Requise</span>
                <span className="flex items-center gap-2 font-black text-sm tracking-tight">
                  {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  Valider le manuscrit
                </span>
              </div>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20 group-hover:right-2 transition-all duration-500 h-12 w-12" />
            </Button>
          ) : (
            <div className="bg-white border-2 border-emerald-500/20 p-6 rounded-[2rem] shadow-xl shadow-emerald-100 flex flex-col items-center md:items-end gap-1">
              <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                Processus Terminé
              </Badge>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                Validé par la rédaction
              </span>
            </div>
          )}
        </div>

        {/* QUICK STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Rapports</p>
              <p className="text-xl font-black text-slate-900">{reviewList.length}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Finalisés</p>
              <p className="text-xl font-black text-slate-900">{completedReviews}</p>
            </div>
          </div>
          <div className="sm:col-span-2 bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex flex-col justify-center gap-2">
            <div className="flex justify-between items-center px-1">
               <span className="text-[10px] font-black uppercase text-slate-400">Progression de la revue</span>
               <span className="text-[10px] font-black text-indigo-600">{Math.round((completedReviews / reviewList.length) * 100) || 0}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-indigo-600 transition-all duration-1000" 
                 style={{ width: `${(completedReviews / reviewList.length) * 100}%` }} 
               />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* --- CONTENT LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Review Feed */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center gap-4 px-2">
            <div className="h-2 w-2 rounded-full bg-indigo-600" />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Flux des expertises</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-8 before:w-px before:bg-slate-100">
            {reviewList.length === 0 ? (
              <div className="ml-14 p-20 bg-slate-50 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                <FileText className="mx-auto text-slate-200 mb-4" size={48} />
                <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">Aucun rapport</h3>
              </div>
            ) : (
              reviewList.map((review, index) => (
                <div key={review.id} className="relative pl-14 group">
                  <div className={cn(
                    "absolute left-[26px] top-10 h-3 w-3 rounded-full border-2 border-white ring-4 transition-all duration-500",
                    review.status === 'completed' ? "bg-indigo-600 ring-indigo-50" : "bg-slate-300 ring-slate-50"
                  )} />

                  <Card className="border-slate-200/60 shadow-xl shadow-slate-200/10 rounded-[2.5rem] overflow-hidden bg-white transition-all hover:border-indigo-100">
                    <CardHeader className="bg-slate-50/30 border-b border-slate-100 px-8 py-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                            <User size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Expert Scientifique #{index + 1}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                              <Calendar size={12} /> {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge className={cn(
                          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                          review.status === 'completed' 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        )}>
                          {review.status === 'completed' ? 'Finalisé' : 'En Rédaction'}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-10">
                      {review.status === 'completed' ? (
                        <div className="space-y-8">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Décision :</span>
                            <Badge className="bg-slate-900 text-white border-none px-4 py-1.5 rounded-lg text-xs font-black uppercase">
                              {review.decision}
                            </Badge>
                          </div>
                          
                          <div className="relative">
                            <Quote className="absolute -left-4 -top-4 text-indigo-50 h-12 w-12 -z-0" />
                            <p className="text-base text-slate-600 leading-relaxed font-medium relative z-10 pl-6 border-l-4 border-indigo-600/20">
                              {review.comments}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 p-8 bg-slate-50/80 rounded-[2rem] border border-slate-100">
                          <div className="h-3 w-3 rounded-full bg-amber-400 animate-ping" />
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Rapport en cours...
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <Card className={cn(
            "border-none rounded-[2.5rem] p-8 text-white shadow-2xl transition-colors duration-500",
            isAlreadyValidated ? "bg-emerald-600 shadow-emerald-200" : "bg-slate-900 shadow-slate-200"
          )}>
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
              {isAlreadyValidated ? <PartyPopper size={24} /> : <ShieldCheck size={24} />}
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">
              {isAlreadyValidated ? "Manuscrit Archivé" : "Review Integrity"}
            </h3>
            <p className="opacity-80 text-sm leading-relaxed mb-6 font-medium">
              {isAlreadyValidated 
                ? "Le processus de révision est terminé. Ce document est désormais verrouillé et prêt pour la publication."
                : "Ce manuscrit suit le protocole de révision en double aveugle. Toutes les expertises sont immuables."
              }
            </p>
            {isAlreadyValidated && (
              <div className="p-4 bg-black/10 rounded-2xl border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider text-center">
                Statut : Publication Approuvée
              </div>
            )}
          </Card>
          
          <div className="p-8 rounded-[2.5rem] bg-indigo-50/30 border border-indigo-100 flex flex-col items-center text-center">
             <BarChart3 className="text-indigo-600/20 mb-4" size={40} />
             <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Impact du Score</h4>
             <p className="text-[11px] text-slate-500 mt-2 font-medium leading-relaxed">
               Les commentaires qualitatifs ont plus de poids que la décision binaire.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}