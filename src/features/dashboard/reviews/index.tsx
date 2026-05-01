import { useSearch } from "@tanstack/react-router";
import { 
  User, Calendar, 
  Clock, ShieldCheck, AlertCircle, 
  Loader2, Quote, LayoutDashboard,
  ChevronRight, FileText, BarChart3,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetReviews } from "./hooks/queries/review";

export function Reviews() {
  // Pulling articleId from Search Params
  const search = useSearch({ from: '/dashboard/reviews' });
  const articleId = (search as any).articleId; 

  const { data: reviews, isPending, isError } = useGetReviews(articleId);

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
            Nous n'avons pas pu récupérer les rapports d'expertise pour ce manuscrit. Veuillez réessayer ultérieurement.
          </p>
        </div>
      </main>
    );
  }

  const reviewList = Array.isArray(reviews) ? reviews : [reviews];
  const completedReviews = reviewList.filter(r => r.status === 'completed').length;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-700">
      
      {/* --- DASHBOARD HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
            <LayoutDashboard size={14} />
            <span>Panneau de Révision</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-400">Manuscrit #{articleId}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Rapports <span className="text-indigo-600">d'Expertise.</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            Consultez les évaluations détaillées et les recommandations formulées par le comité de lecture pour ce travail scientifique.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="flex gap-3">
          <div className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Complétés</p>
              <p className="text-xl font-black text-slate-900">{completedReviews}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">En attente</p>
              <p className="text-xl font-black text-slate-900">{reviewList.length - completedReviews}</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* --- CONTENT LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Timeline & Reviews */}
        <div className="lg:col-span-8 space-y-8 relative before:absolute before:inset-y-0 before:left-8 before:w-px before:bg-slate-100">
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

                <Card className="border-slate-200/60 shadow-2xl shadow-slate-200/20 rounded-[2.5rem] overflow-hidden bg-white transition-all hover:translate-y-[-4px]">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
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
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-none" 
                          : "bg-amber-50 text-amber-600 border-amber-100 shadow-none"
                      )}>
                        {review.status === 'completed' ? 'Rapport Finalisé' : 'En Rédaction'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-10">
                    {review.status === 'completed' ? (
                      <div className="space-y-8">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Décision :</span>
                          <Badge variant="outline" className="bg-slate-900 text-white border-none px-3 py-1 rounded-lg text-xs font-bold">
                            {review.decision?.toUpperCase()}
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
                          Le rapport est en cours de traitement par l'expert...
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 sticky top-8">
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2">Processus de Qualité</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6 font-medium">
              Chaque manuscrit est soumis à une évaluation en double aveugle pour garantir l'impartialité et l'excellence académique.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-2xl border border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest">Taux de réponse</span>
                <span className="font-black text-lg">
                  {Math.round((completedReviews / reviewList.length) * 100) || 0}%
                </span>
              </div>
            </div>
          </Card>
          
          <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center">
             <ShieldCheck className="text-slate-200 mb-4" size={40} />
             <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Confidentialité</h4>
             <p className="text-[11px] text-slate-400 mt-2 font-medium">
               L'identité des réviseurs reste strictement anonyme conformément aux protocoles de publication.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}