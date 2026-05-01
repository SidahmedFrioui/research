import { useState } from "react";
import { 
  FileUp, 
  BookOpen,
  Tags, 
  Info, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "#/components/ui/badge";

export const SubmitArticle = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 mb-10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
              <FileUp className="text-[var(--primary)]" size={24} />
            </div>
            <Badge variant="outline" className="border-[var(--primary)] text-[var(--primary)] uppercase tracking-widest text-[10px]">
              Nouveau Manuscrit
            </Badge>
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Soumission d'Article Scientifique
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl font-medium">
            Veuillez remplir les détails rigoureusement. Tous les articles subissent un processus d'examen par les pairs en double aveugle.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
          
          {/* Main Form Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Metadata Section */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Info size={18} className="text-[var(--primary)]" /> Informations de l'Article
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-black text-slate-500 tracking-wider">Titre Complet du Manuscrit</Label>
                  <Input 
                    placeholder="ex: Impact de l'IA sur la recherche en biotechnologie" 
                    className="h-12 border-slate-200 focus:ring-[var(--primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-black text-slate-500 tracking-wider">Résumé (Abstract)</Label>
                  <Textarea 
                    placeholder="Synthèse des objectifs, méthodologie et résultats..." 
                    className="min-h-[200px] border-slate-200 focus:ring-[var(--primary)] font-serif italic"
                  />
                  <p className="text-[10px] text-slate-400 text-right">Maximum 500 mots</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-2">
                      <Tags size={14} /> Mots-clés
                    </Label>
                    <Input placeholder="Séparez par des virgules" className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-black text-slate-500 tracking-wider">Discipline</Label>
                    <Select>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Sélectionner un domaine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bio">Sciences de la Vie</SelectItem>
                        <SelectItem value="tech">Informatique & IA</SelectItem>
                        <SelectItem value="phys">Physique & Chimie</SelectItem>
                        <SelectItem value="soc">Sciences Sociales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload Section */}
            <Card className="border-dashed border-2 border-[var(--primary)]/30 bg-[var(--primary)]/[0.01]">
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <BookOpen size={32} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Télécharger le Manuscrit</h3>
                  <p className="text-sm text-slate-500 max-w-xs mt-2 mb-6">
                    Formats acceptés : PDF, DOCX. Assurez-vous que l'article est anonymisé pour l'examen.
                  </p>
                  <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 px-8 rounded-full">
                    Sélectionner le fichier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Submission Guidelines */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-slate-600">
                  <ShieldAlert size={18} className="text-[var(--secondary)]" /> Checklist de Conformité
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    "Manuscrit original et non publié",
                    "Formatage conforme aux normes IEEE/APA",
                    "Toutes les références sont citées",
                    "Absence de données identifiant les auteurs",
                    "Déclaration de conflit d'intérêts incluse"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="sticky top-24">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 bg-[var(--primary)] hover:brightness-110 text-white rounded-xl shadow-xl shadow-[var(--primary)]/20 font-bold uppercase tracking-[2px] text-xs transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Soumettre pour Examen <ArrowRight size={18} />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed px-4 uppercase tracking-tighter">
                En cliquant, vous acceptez les conditions de publication et les droits de transfert de SciFlow.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};