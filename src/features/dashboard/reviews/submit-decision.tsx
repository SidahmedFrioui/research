import * as React from "react";
import { useSearch } from "@tanstack/react-router";
import { 
  FileCheck, AlertTriangle, XCircle, 
  MessageSquare, Send, ArrowLeft, Loader2,
  Sparkles, ShieldAlert, Cpu
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useCreateAIReview, useCreateReview } from "./hooks/mutations/review";
import { cn } from "@/lib/utils";
import { Badge } from "#/components/ui/badge";

type DecisionType = 'accepted' | 'rejected' | 'major_revision' | 'minor_revision';

export function SubmitDecision() {
  const search = useSearch({ from: '/dashboard/submit-decision' });
  const reviewId = (search as any).reviewId;
  const articleId = (search as any).articleId; // Ensure articleId is passed in search params

  const [decision, setDecision] = React.useState<DecisionType | null>(null);
  const [comment, setComment] = React.useState("");
  const [aiResult, setAiResult] = React.useState<any>(null);

  const { mutate: submitReview, isPending } = useCreateReview({ id: reviewId });
  const { mutate: generateAI, isPending: isAiGenerating } = useCreateAIReview({ id: reviewId });

  const handleGenerateAI = () => {
    generateAI(Number(articleId), {
      onSuccess: (data) => {
        setAiResult(data);
        // Optional: auto-fill comment if empty
        if (!comment) setComment(data.message);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision || !comment) return;

    submitReview({
      decision: decision,
      comments: comment,
    });
  };

  const decisions: { id: DecisionType; label: string; icon: any; color: string; hover: string }[] = [
    { id: 'accepted', label: 'Accepter', icon: FileCheck, color: 'border-emerald-200 text-emerald-700 bg-emerald-50/50', hover: 'peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white' },
    { id: 'minor_revision', label: 'Révisions Mineures', icon: MessageSquare, color: 'border-blue-200 text-blue-700 bg-blue-50/50', hover: 'peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white' },
    { id: 'major_revision', label: 'Révisions Majeures', icon: AlertTriangle, color: 'border-amber-200 text-amber-700 bg-amber-50/50', hover: 'peer-checked:border-amber-600 peer-checked:bg-amber-600 peer-checked:text-white' },
    { id: 'rejected', label: 'Refuser', icon: XCircle, color: 'border-red-200 text-red-700 bg-red-50/50', hover: 'peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-white' },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <Link 
          to="/dashboard/assigned-articles" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour
        </Link>

        <Button 
          onClick={handleGenerateAI}
          disabled={isAiGenerating || !articleId}
          variant="outline"
          className="rounded-2xl border-indigo-100 bg-[var(--secondary)] text-white font-bold hover:bg-indigo-600 hover:text-white transition-all gap-2"
        >
          {isAiGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          Assistant IA
        </Button>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            Soumettre votre <span className="text-indigo-600">Décision.</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Analysez le manuscrit et finalisez votre rapport d'expertise.</p>
        </div>

        {/* AI Insight Card */}
        {aiResult && (
          <Card className="border-indigo-100 rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-300">
            <CardHeader className="flex flex-row items-center justify-between border-b border-indigo-100/50 p-6">
              <div className="flex items-center gap-3">
                <Cpu className="text-indigo-600" size={20} />
                <CardTitle className="text-sm font-black uppercase tracking-widest text-indigo-900">Analyse de l'Assistant</CardTitle>
              </div>
              <Badge className="bg-indigo-600 text-[10px] text-white">IA Suggestion: {aiResult.decision}</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-indigo-100/50">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Probabilité IA</p>
                  <p className="text-2xl font-black text-indigo-600">{(aiResult.ai_probability * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-indigo-100/50">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Probabilité Humaine</p>
                  <p className="text-2xl font-black text-emerald-600">{(aiResult.human_probability * 100).toFixed(1)}%</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic font-medium">"{aiResult.message}"</p>
              <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-tight">
                <ShieldAlert size={12} /> {aiResult.disclaimer}
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.map((item) => (
              <label key={item.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="decision"
                  value={item.id}
                  className="peer sr-only"
                  onChange={() => setDecision(item.id)}
                />
                <div className={cn(
                  "flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all duration-200",
                  item.color,
                  item.hover,
                  decision === item.id ? "ring-4 ring-indigo-50 shadow-lg scale-[1.02]" : "opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                )}>
                  <item.icon size={24} />
                  <span className="font-black uppercase text-xs tracking-widest">{item.label}</span>
                </div>
              </label>
            ))}
          </div>

          <Card className="border-slate-200/60 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <CardTitle className="text-lg font-black tracking-tight">Rapport d'expertise</CardTitle>
              <CardDescription className="font-medium text-slate-400">Rédigez vos conclusions finales ci-dessous.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 px-1">Commentaires</Label>
                <Textarea
                  id="comment"
                  placeholder="Écrivez votre analyse ici..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[250px] rounded-2xl border-slate-100 focus-visible:ring-indigo-600 font-medium p-6"
                  required
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isPending || !decision || !comment}
                  className="w-full h-14 bg-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                >
                  {isPending ? <Loader2 className="animate-spin" size={20} /> : <>Envoyer la décision <Send size={16} className="ml-2" /></>}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="p-6 bg-amber-50 rounded-[1.5rem] border border-amber-100 flex items-start gap-4">
          <AlertTriangle className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            <strong>Rappel :</strong> Les rapports d'expertise sont cruciaux pour l'intégrité académique. Prenez le temps de vérifier vos conclusions.
          </p>
        </div>
      </div>
    </main>
  );
}