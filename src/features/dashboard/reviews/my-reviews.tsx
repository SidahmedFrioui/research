import * as React from "react";
import { 
  Calendar, 
  User, ExternalLink, Loader2, 
  Star
} from "lucide-react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { useGetArticles } from "../article/hooks/queries/article";
import { type Article } from "@/types/article";
import { cn } from "@/lib/utils";
import type { Review } from "#/types/review";
import { useAuth } from "#/contexts/auth";

export function MyReviews() {
  const { user } = useAuth();
  const { data: articlesData, isPending } = useGetArticles();

  // Filter to only include articles that have a review by the current user
  const myReviewsData = React.useMemo(() => {
    const all = Array.isArray(articlesData) ? articlesData : articlesData ? [articlesData] : [];
    
    return all.reduce((acc: any[], article: Article) => {
      const review = article.reviews?.find((r: any) => r.reviewer_id === user?.id);
      if (review) {
        acc.push({ ...review, articleTitle: article.title, articleId: article.id, authorName: article.author?.name });
      }
      return acc;
    }, []);
  }, [articlesData, user?.id]);

  const getRecommendationStyle = (recommendation: string) => {
    const styles: Record<string, string> = {
      accepted: "bg-emerald-50 text-emerald-600 border-emerald-100",
      minor_revision: "bg-blue-50 text-blue-600 border-blue-100",
      major_revision: "bg-amber-50 text-amber-600 border-amber-100",
      rejected: "bg-red-50 text-red-600 border-red-100",
    };
    return styles[recommendation] || "bg-slate-50 text-slate-600 border-slate-100";
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-xs font-black uppercase tracking-[2px] text-slate-400">Récupération de vos archives...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Historique des <span className="text-indigo-600">Révisions.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Consultez vos décisions passées et le statut final des manuscrits évalués.
          </p>
        </div>
      </div>


          {myReviewsData.length === 0 ? (
            <div className="p-20 text-center">
              <div className="mx-auto w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-200">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Aucun historique</h3>
              <p className="text-slate-400 font-medium max-w-xs mx-auto mt-2">
                Vous n'avez pas encore soumis de rapports de révision.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-slate-100">
                  <TableHead className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Manuscrit</TableHead>
                  <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Commentaire</TableHead>
                  <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Decision</TableHead>
                  <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date de Soumission</TableHead>
                  <TableHead className="py-4 text-right px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Détails</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myReviewsData.map((review: Partial<Review> & { articleId: string; articleTitle: string; authorName: string }) => (
                  <TableRow key={review.id} className="group transition-all hover:bg-slate-50/50 border-b border-slate-50">
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shadow-inner group-hover:text-indigo-600 transition-all">
                          <span className="text-[10px] font-black">#{review.articleId}</span>
                        </div>
                        <div className="max-w-[350px]">
                          <p className="text-sm font-bold text-slate-900 truncate tracking-tight mb-1">{review.articleTitle}</p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <User size={12} /> Par {review.authorName || "Auteur Inconnu"}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {review.comments ? <Badge variant="outline" className={cn(
                        "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tight border shadow-sm",
                        getRecommendationStyle(review.comments || '')
                      )}>
                        {review.comments?.replace('_', ' ')}
                      </Badge> : <span className="text-slate-400">-</span>}
                    </TableCell>

                    <TableCell>
                      {review.decision ? <Badge variant="outline" className={cn(
                        "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tight border shadow-sm",
                        getRecommendationStyle(review.decision || '')
                      )}>
                        {review.decision?.replace('_', ' ')}
                      </Badge> : <span className="text-slate-400">-</span>}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(review.created_at || '').toLocaleDateString()}
                      </div>
                    </TableCell>

                    <TableCell className="text-right px-8">
                      <Button variant="ghost" size="sm" asChild className="rounded-xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                        <Link to={`/articles/${review.articleId}` as any}>
                          <ExternalLink size={14} className="mr-2" /> Voir l'article
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

      {/* Summary Footer */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="space-y-2 relative z-10">
          <h3 className="text-2xl font-black tracking-tight">Contribution Scientifique</h3>
          <p className="text-indigo-100 font-medium max-w-md">
            Merci pour votre rigueur. Vos {myReviewsData.length} évaluations ont contribué à maintenir les standards d'excellence de notre publication.
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
            <div className="text-center bg-white/10 px-6 py-4 rounded-3xl border border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Total</p>
                <p className="text-3xl font-black">{myReviewsData.length}</p>
            </div>
        </div>
      </div>
    </main>
  );
}