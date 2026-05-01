import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Mail, 
  BookOpen, 
  ShieldCheck,
  Save, 
  Loader2, 
  FileText,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEditUser } from "./hooks/use-update-user";
import type { User } from "#/types/user";
import { useAuth } from "#/contexts/auth";

export const Profile = () => {
  const { user, isPending: isLoadingUser } = useAuth();
  const { mutate: updateUser, isPending: isUpdating } = useEditUser();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      background: "",
      profile_picture: ""
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        background: user.background,
        profile_picture: user.profile_picture
      });
    }
  }, [user, reset]);

  const onSubmit = (formData: Partial<User>) => {
    updateUser({ data: formData, id: user?.id || 0 });
  };

  if (isLoadingUser) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Institutional Header Strip */}
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 rounded-lg border-2 border-slate-100 shadow-sm">
              <AvatarImage src={user?.profile_picture} className="object-cover" />
              <AvatarFallback className="bg-slate-100 text-[var(--primary)] text-3xl font-serif">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] hover:bg-[var(--primary)] px-4 py-1 border-2 border-white text-white">
              {user?.role?.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
              {user?.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-sm italic">
                <Mail size={16} className="text-[var(--primary)]" /> {user?.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <ShieldCheck size={16} className="text-emerald-600" /> Identité Vérifiée
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
        {/* Main Content: Registry Form */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="border-slate-200 shadow-sm rounded-xl">
            <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FileText className="text-[var(--primary)]" /> Registre de l'Expert
                </CardTitle>
                <p className="text-sm text-slate-400 mt-1">Mise à jour des informations du dossier académique.</p>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-black text-slate-500 tracking-wider">Nom du chercheur</Label>
                    <Input 
                      {...register("name")} 
                      className="h-12 border-slate-200 focus:ring-[var(--primary)] focus:border-[var(--primary)] rounded-md" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-black text-slate-500 tracking-wider">Email Institutionnel</Label>
                    <Input 
                      {...register("email")} 
                      className="h-12 border-slate-200 bg-slate-50/50 rounded-md" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-black text-slate-500 tracking-wider flex items-center gap-2">
                    <BookOpen size={14} /> Curriculum & Parcours Scientifique
                  </Label>
                  <textarea
                    {...register("background")}
                    rows={6}
                    className="w-full p-4 rounded-md border border-slate-200 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none bg-white text-sm leading-relaxed font-serif"
                    placeholder="Détaillez vos spécialités de recherche et affiliations universitaires..."
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="cursor-pointer bg-[var(--primary)] hover:brightness-110 text-white px-10 h-12 font-bold rounded-md transition-all uppercase tracking-widest text-xs"
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Signer et Enregistrer
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar: Academic Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="border-[var(--primary)]/20 bg-[var(--primary)]/[0.02] shadow-none">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white rounded-md border border-[var(--primary)]/20 shadow-sm">
                  <Fingerprint className="text-[var(--primary)]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--primary)] uppercase">Système d'approbation</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Votre compte est configuré avec les privilèges <strong>{user?.role}</strong>. 
                    Vous pouvez soumettre et réviser des manuscrits selon les protocoles SciFlow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};