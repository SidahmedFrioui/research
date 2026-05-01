import { useState } from "react";
import { 
  Shield, MoreHorizontal, Search, 
  Loader2, AlertCircle,
  UserIcon,
} from "lucide-react";
import { type Role } from "@/types/user";
import { useGetUsers } from "./hooks/queries/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isPending, isError } = useGetUsers();

  const users = Array.isArray(data) ? data : [];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleStyles: Record<Role, { label: string, color: string }> = {
    admin: { label: "Admin", color: "text-red-600 bg-red-50 border-red-100" },
    editor: { label: "Éditeur", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    reviewer: { label: "Reviewer", color: "text-amber-600 bg-amber-50 border-amber-100" },
    author: { label: "Auteur", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    reader: { label: "Lecteur", color: "text-slate-600 bg-slate-50 border-slate-100" },
  };

  return (
    <main className="mx-auto max-w-7xl px-8 py-12 bg-white min-h-screen">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Utilisateurs</h1>
          <p className="text-sm text-slate-500">Gérez les membres de l'équipe et leurs niveaux d'accès.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Filtrer par nom ou email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 h-10 border-slate-200 text-sm focus-visible:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[80px] font-bold text-slate-600">ID</TableHead>
              <TableHead className="font-bold text-slate-600">Utilisateur</TableHead>
              <TableHead className="font-bold text-slate-600">Rôle</TableHead>
              <TableHead className="font-bold text-slate-600 hidden md:table-cell">Date d'inscription</TableHead>
              <TableHead className="text-right font-bold text-slate-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-red-500 font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle size={18} /> Erreur de chargement
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-400 italic">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            ) : filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-slate-400">
                  #{user.id.toString().padStart(3, '0')}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                      {user.profile_picture ? (
                        <img src={user.profile_picture} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <UserIcon size={18} className="m-auto mt-2 text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-sm">{user.name}</span>
                      <span className="text-xs text-slate-500 font-medium">{user.email}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase border ${roleStyles[user.role as Role]?.color}`}>
                    {roleStyles[user.role as Role]?.label || user.role}
                  </Badge>
                </TableCell>

                <TableCell className="text-slate-500 text-sm hidden md:table-cell font-medium">
                   {/* Fallback to local string if created_at exists */}
                   {user.created_at ? new Date(user.created_at).toLocaleDateString() : '--/--/----'}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-lg shadow-xl border-slate-200">
                      <DropdownMenuLabel className="text-xs text-slate-400">Options de contrôle</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-sm font-semibold cursor-pointer">
                        <Shield size={14} className="text-slate-400" /> Changer le rôle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination Placeholder */}
      <div className="mt-4 flex items-center justify-between px-2">
        <p className="text-xs text-slate-400 font-bold uppercase">
          Total: {filteredUsers.length} utilisateur(s)
        </p>
      </div>
    </main>
  );
}