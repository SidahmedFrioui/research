import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  FileUp, Info, Loader2, 
  ArrowRight, FileText, CheckCircle2, X 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import type { Article } from '#/types/article';
import { useCreateArticle } from "./hooks/mutations/article";
import { uploadToSupabase } from "#/integrations/supabase";

type SubmitFormData = Pick<Article, 'title' | 'abstract' | 'file_path'>;

export const SubmitArticle = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { mutate: createArticle, isPending: isMutationPending } = useCreateArticle();
  
  const { register, handleSubmit, reset } = useForm<SubmitFormData>({
    defaultValues: { title: "", abstract: "", file_path: "" }
  });

  const onSubmit = async (data: SubmitFormData) => {
    try {
      let finalFilePath = data.file_path;

      // 1. If a local file is selected, upload it first
      if (file) {
        setIsUploading(true);
        const publicUrl = await uploadToSupabase(file, 'manuscripts');
        finalFilePath = publicUrl;
      }

      // 2. Trigger the creation mutation with the Supabase URL
      createArticle({ ...data, file_path: finalFilePath }, {
        onSuccess: () => {
          reset();
          setFile(null);
        },
        onSettled: () => setIsUploading(false)
      });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const isPending = isMutationPending || isUploading;

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
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
          
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden">
              <CardHeader className="border-b border-slate-50 bg-white p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-900">
                  <Info size={22} className="text-indigo-600" /> Contenu du manuscrit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Title Input */}
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Titre</Label>
                  <Input 
                    {...register("title", { required: "Titre requis" })}
                    placeholder="Entrez le titre..." 
                    className="h-14 border-slate-200 rounded-2xl text-lg font-bold"
                  />
                </div>

                {/* Abstract Input */}
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Résumé</Label>
                  <Textarea 
                    {...register("abstract", { required: "Résumé requis" })}
                    placeholder="Décrivez vos recherches..." 
                    className="min-h-[200px] border-slate-200 rounded-[1.5rem]"
                  />
                </div>

                {/* FILE UPLOAD ZONE */}
                <div className="space-y-3">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Manuscrit (PDF, DOCX)
                  </Label>
                  
                  {!file ? (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-[1.5rem] bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="text-slate-300 group-hover:text-indigo-500 transition-colors mb-2" size={32} />
                        <p className="text-sm font-bold text-slate-500">Cliquez pour téléverser votre fichier</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Format PDF privilégié</p>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-6 border border-indigo-100 bg-indigo-50/30 rounded-[1.5rem] animate-in fade-in zoom-in duration-300">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-md">{file.name}</p>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase">Prêt pour l'envoi</p>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setFile(null)}
                        className="h-10 w-10 p-0 rounded-full hover:bg-white text-slate-400 hover:text-red-500"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 px-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Ou lien externe :</span>
                    <Input 
                      {...register("file_path")}
                      placeholder="https://..." 
                      className="h-8 border-none bg-transparent text-xs text-indigo-600 focus-visible:ring-0 p-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={18} /> Statut du transfert
              </h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Fichier sélectionné</span>
                    <span className={file ? "text-emerald-600" : "text-slate-300"}>{file ? "OUI" : "NON"}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Upload Supabase</span>
                    <span className={isUploading ? "text-indigo-600 animate-pulse" : "text-slate-300"}>
                      {isUploading ? "EN COURS..." : "ATTENTE"}
                    </span>
                 </div>
              </div>
            </div>

            <div className="sticky top-24">
              <Button 
                type="submit" 
                disabled={isPending || (!file && !register('file_path'))}
                className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] shadow-2xl shadow-indigo-500/20 font-black uppercase tracking-[2px] text-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isPending ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    <span>{isUploading ? "Transfert fichier..." : "Envoi article..."}</span>
                  </div>
                ) : (
                  <>Soumettre le manuscrit <ArrowRight size={20} /></>
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};