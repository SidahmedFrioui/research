import { useState } from "react";
import { 
  FileText, Search, Loader2, 
  AlertCircle, ChevronRight, UserCheck, Calendar, 
  Eye
} from "lucide-react";

// Components
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { 
  Command, CommandEmpty, CommandGroup, 
  CommandInput, CommandItem, CommandList 
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetArticles } from "./hooks/queries/article";
import type { Article } from "@/types/article";
import { useGetUsers } from "../users/hooks/queries/user";
import { useAssignReviewer } from "../users/hooks/mutations/review";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "#/contexts/auth";

export function ArticlesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const { data: articlesData, isPending: loadingArticles, isError: articleError } = useGetArticles();
  const { data: usersData } = useGetUsers();
  const { mutate: assignReviewer, isPending: isAssigning } = useAssignReviewer();

  const articles = Array.isArray(articlesData) ? articlesData : [];
  const reviewers = Array.isArray(usersData) ? usersData.filter(u => u.role === 'reviewer') : [];

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = (reviewerId: string) => {
    if (!selectedArticle) return;
    
    assignReviewer({ 
      articleId: selectedArticle.id.toString(), 
      reviewerId 
    }, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setSelectedArticle(null);
      }
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-8 py-12 min-h-screen bg-[#FDFDFD]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Flux de <span className="text-indigo-600">Publication.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Supervisez les manuscrits et assignez des experts pour relecture.</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <Input 
            placeholder="Rechercher un manuscrit..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full md:w-80 h-11 border-slate-200 rounded-xl bg-white shadow-sm focus-visible:ring-indigo-600"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="relative group shadow-2xl shadow-slate-200/50 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[400px]">Manuscrit</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Soumis par</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {loadingArticles ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" /></TableCell></TableRow>
            ) : articleError ? (
              <TableRow><TableCell colSpan={5} className="h-40 text-center text-red-500 font-bold"><AlertCircle className="mx-auto mb-2" /> Erreur de chargement</TableCell></TableRow>
            ) : filteredArticles.map((article) => (
              <TableRow key={article.id} className="group/row transition-all hover:bg-indigo-50/20">
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover/row:bg-white transition-colors">
                      <FileText size={20} className="text-slate-400 group-hover/row:text-indigo-600" />
                    </div>
                    <div className="flex flex-col max-w-[320px]">
                      <span className="font-black text-slate-900 text-sm truncate uppercase tracking-tight">{article.title}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Calendar size={10} /> 12 Mai 2026
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline" className="bg-white border-slate-200 text-slate-500 font-black text-[10px] px-2 py-0.5 uppercase tracking-tighter">
                    En attente
                  </Badge>
                </TableCell>

                <TableCell className="text-sm font-bold text-slate-600">Auteur #12</TableCell>

                <TableCell>
                  {article.reviews && article.reviews.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={article.reviews[0].reviewer.profile_picture} />
                        <AvatarFallback>{article.reviews[0].reviewer.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold text-slate-700">
                        {article.reviews[0].reviewer.name}
                      </span>
                      {article.reviews[0].status === 'pending' && (
                        <Badge className="bg-amber-100 text-amber-700 text-[8px]">In Progress</Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Non assigné</span>
                  )}
                </TableCell>

                <TableCell className="text-right flex gap-2">
                  {/* TOUT LE MONDE peut voir le détail */}
                  <Button onClick={() => router.navigate({ to: '/articles/' + article.id })}>
                    Voir <Eye size={14} />
                  </Button>

                  {/* SEUL l'Éditeur ou l'Admin peut assigner */}
                  {(user?.role === 'editor' || user?.role === 'admin') && (
                    <Button 
                      onClick={() => { setSelectedArticle(article); setIsDialogOpen(true); }}
                      className="bg-indigo-600 text-white"
                    >
                      Assigner <ChevronRight size={14} />
                    </Button>
                  )}

                  {/* SEUL l'Admin peut valider la décision finale */}
                  {user?.role === 'admin' && (
                    <Button onClick={() => router.navigate({ to: '/dashboard/reviews', search: { articleId: article.id } })} className="bg-emerald-600 text-white">
                      Voir Décisions
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-8 border-none shadow-3xl">
          <DialogHeader className="space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
              <UserCheck size={24} />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tighter text-slate-900">Assigner un Expert</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Sélectionnez un reviewer qualifié pour examiner : <br/>
              <span className="text-slate-900 font-black uppercase text-xs">"{selectedArticle?.title}"</span>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <Command className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <CommandInput placeholder="Chercher un reviewer..." className="h-12 font-medium" />
              <CommandList className="max-h-[250px]">
                <CommandEmpty className="py-6 text-center text-sm font-bold text-slate-400">Aucun expert trouvé.</CommandEmpty>
                <CommandGroup heading="Suggestions" className="p-2">
                  {reviewers.map((user) => (
                    <CommandItem 
                      key={user.id} 
                      onSelect={() => handleAssign(user.id.toString())}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer aria-selected:bg-indigo-50 transition-colors"
                    >
                      <Avatar className="h-9 w-9 rounded-lg border-2 border-white shadow-sm">
                        <AvatarImage src={user.profile_picture || ""} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-xs uppercase">
                          {user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900">{user.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-black">{user.role}</span>
                      </div>
                      {isAssigning && <Loader2 className="ml-auto animate-spin text-indigo-600" size={16} />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold text-slate-400">Annuler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}