import { useForm } from "react-hook-form";
import { 
  FileUp, Info, Loader2, 
  ArrowRight, ShieldCheck, FileText 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import type { Article } from '#/types/article';
import { useCreateArticle } from "./hooks/mutations/article";

type SubmitFormData = Pick<Article, 'title' | 'abstract' | 'file_path'>;

export const SubmitArticle = () => {
  const { mutate: createArticle, isPending } = useCreateArticle();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubmitFormData>({
    defaultValues: { title: "", abstract: "", file_path: null }
  });

  const onSubmit = (data: SubmitFormData) => {
    createArticle(data, {
      onSuccess: () => reset()
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 mb-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <FileUp className="text-indigo-600" size={24} />
            </div>
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-none uppercase tracking-[2px] text-[10px] font-black">
              Espace Auteur
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
            Soumettre un <span className="text-indigo-600">Article.</span>
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl text-lg font-medium leading-relaxed">
            Partagez vos recherches avec la communauté. Une fois envoyé, notre équipe 
            <span className="text-slate-900 font-bold"> vérifiera votre contenu</span> pour validation et publication.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
          
          {/* Main Form */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="border-b border-slate-50 bg-white p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-900">
                  <Info size={22} className="text-indigo-600" /> Contenu du manuscrit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Titre de l'article
                  </Label>
                  <Input 
                    {...register("title", { required: "Veuillez donner un titre à votre travail" })}
                    placeholder="Entrez le titre complet..." 
                    className="h-14 border-slate-200 rounded-2xl focus:ring-indigo-600 text-lg font-bold tracking-tight"
                  />
                  {errors.title && <p className="text-red-500 text-xs font-bold">{errors.title.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Résumé des travaux
                  </Label>
                  <Textarea 
                    {...register("abstract", { required: "Un court résumé est nécessaire" })}
                    placeholder="Décrivez brièvement vos recherches et vos conclusions..." 
                    className="min-h-[250px] border-slate-200 rounded-[1.5rem] focus:ring-indigo-600 leading-relaxed text-slate-600"
                  />
                  {errors.abstract && <p className="text-red-500 text-xs font-bold">{errors.abstract.message}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Lien vers le document complet
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <Input 
                      {...register("file_path")}
                      placeholder="Lien Dropbox, Drive ou serveur..." 
                      className="pl-12 h-14 border-slate-200 rounded-2xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={18} /> Prochaines étapes
              </h4>
              <ul className="space-y-6">
                {[
                  "Réception de votre document",
                  "Vérification par nos modérateurs",
                  "Validation de la conformité",
                  "Mise en ligne officielle"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold">
                    <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 border border-slate-100">
                      {i + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sticky top-24">
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] shadow-2xl shadow-indigo-500/20 font-black uppercase tracking-[2px] text-sm transition-all flex items-center justify-center gap-3"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Envoyer pour approbation <ArrowRight size={20} />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-slate-400 mt-6 font-bold uppercase tracking-wider leading-relaxed">
                Notre équipe reviendra vers vous rapidement après vérification de votre manuscrit.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};