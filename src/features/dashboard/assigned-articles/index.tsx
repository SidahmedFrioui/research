import * as React from "react";
import { 
  Clock, CheckCircle, 
  ChevronRight, Calendar, User, MessageSquare, 
  ExternalLink, Loader2, FileText
} from "lucide-react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { useGetArticles } from "../article/hooks/queries/article";
import { type Article } from "@/types/article";
import { cn } from "@/lib/utils";
import { useAuth } from "#/contexts/auth";

export function AssignedArticles() {
  const { user } = useAuth();
  const { data: articlesData, isPending } = useGetArticles();

  const assignedArticles = React.useMemo(() => {
    const all = Array.isArray(articlesData) ? articlesData : articlesData ? [articlesData] : [];
    return all.filter((article: Article) => 
      article.reviews?.some((review: any) => review.reviewer_id === user?.id)
    );
  }, [articlesData, user?.id]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-[2px] text-slate-400">Chargement de vos assignations...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Mes <span className="text-indigo-600">Assignations.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Soumettez vos rapports d'expertise pour les manuscrits ci-dessous.
          </p>
        </div>
      </div>

      <Card className="border-slate-200/60 shadow-xl shadow-slate-200/30 rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <FileText size={16} />
            </div>
            <CardTitle className="text-lg font-black tracking-tight">Travaux en cours</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {assignedArticles.length === 0 ? (
            <div className="p-20 text-center">
              <div className="mx-auto w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-200">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Tout est à jour !</h3>
              <p className="text-slate-400 font-medium max-w-xs mx-auto mt-2">
                Aucun manuscrit en attente de révision.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-slate-100">
                  <TableHead className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Manuscrit</TableHead>
                  <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Auteur</TableHead>
                  <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">État</TableHead>
                  <TableHead className="py-4 text-right px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedArticles.map((article) => {
                  // FIND THE SPECIFIC REVIEW ID FOR THIS USER
                  const myReview = article.reviews?.find((r: any) => r.reviewer_id === user?.id);
                  const isDone = myReview?.status === 'completed';

                  return (
                    <TableRow key={article.id} className="group transition-all hover:bg-slate-50/50 border-b border-slate-50">
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:text-indigo-600 transition-all">
                            <span className="text-[10px] font-black">#{article.id}</span>
                          </div>
                          <div className="max-w-[300px]">
                            <p className="text-sm font-bold text-slate-900 truncate tracking-tight mb-1">{article.title}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              <Calendar size={12} /> {new Date(article.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <User size={14} className="text-slate-400" />
                          {article.author?.name || "Auteur"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                          isDone ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                        )}>
                          {isDone ? "Révisé" : "À Évaluer"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild className="rounded-xl font-bold">
                            <Link to={`/articles/${article.id}` as any}>
                              <ExternalLink size={14} className="mr-2" /> Lire
                            </Link>
                          </Button>
                          
                          {!isDone && myReview && (
                            <Button size="sm" asChild className="bg-indigo-600 rounded-xl px-4 font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
                              {/* PASS THE REVIEW ID INSTEAD OF ARTICLE ID */}
                              <Link to={`/dashboard/submit-decision?reviewId=${myReview.id}&articleId=${article.id}` as any}>
                                Décider <ChevronRight size={14} className="ml-1" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-2xl text-indigo-400">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="font-black tracking-tight mb-2">Guide d'évaluation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Vos commentaires seront transmis anonymement. Soyez constructif et rigoureux dans vos retours.
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-200 bg-white rounded-[2rem] p-8 border-2 border-dashed flex flex-col items-center justify-center text-center">
           <Clock className="text-amber-500 mb-3" size={32} />
           <h4 className="font-black text-slate-900 tracking-tight">Délai</h4>
           <p className="text-sm text-slate-500 mt-1">Veuillez soumettre vos décisions sous 14 jours.</p>
        </Card>
      </div>
    </main>
  );
}