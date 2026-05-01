import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Send, 
  ArrowUpRight,
  Plus,
  BookOpen,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useGetUser } from "#/features/auth/profile/hooks/use-get-user";

export const Dashboard = () => {
  const { data: user } = useGetUser();
  const role = user?.role || 'reader';

  const dashboardConfig = {
    admin: {
      title: "Administration du Journal",
      stats: [
        { label: "Articles Totaux", value: "124", icon: FileText, color: "text-blue-600" },
        { label: "Éditeurs Actifs", value: "8", icon: Users, color: "text-purple-600" },
        { label: "Décisions Finales", value: "12", icon: CheckCircle, color: "text-emerald-600" },
      ],
      actions: [
        { label: "Valider les décisions", path: "/dashboard/decisions" },
        { label: "Gérer les utilisateurs", path: "/dashboard/users" },
        { label: "Paramètres du journal", path: "/dashboard/settings" }
      ]
    },
    editor: {
      title: "Gestion des Soumissions",
      stats: [
        { label: "Nouvelles Soumissions", value: "14", icon: AlertCircle, color: "text-amber-500" },
        { label: "En Évaluation", value: "32", icon: Clock, color: "text-[var(--primary)]" },
        { label: "Reviewers Libres", value: "21", icon: Users, color: "text-slate-600" },
      ],
      actions: [
        { label: "Affecter des Reviewers", path: "/dashboard/assign-reviews" },
        { label: "Suivre les délais", path: "/dashboard/monitoring" },
        { label: "Envoyer aux auteurs", path: "/dashboard/communications" }
      ]
    },
    reviewer: {
      title: "Espace d'Évaluation",
      stats: [
        { label: "À réviser", value: "3", icon: FileText, color: "text-[var(--secondary)]" },
        { label: "Révisions terminées", value: "45", icon: CheckCircle, color: "text-emerald-600" },
        { label: "Invitations", value: "1", icon: Send, color: "text-blue-500" },
      ],
      actions: [
        { label: "Consulter mes révisions", path: "/dashboard/my-reviews" },
        { label: "Soumettre une décision", path: "/dashboard/submit-decision" },
        { label: "Guide d'éthique", path: "/dashboard/ethics" }
      ]
    },
    author: {
      title: "Mes Publications",
      stats: [
        { label: "Mes Articles", value: "4", icon: FileText, color: "text-[var(--primary)]" },
        { label: "En attente", value: "2", icon: Clock, color: "text-amber-500" },
        { label: "Publiés", value: "2", icon: CheckCircle, color: "text-emerald-600" },
      ],
      actions: [
        { label: "Soumettre un article", path: "/dashboard/submit" },
        { label: "Historique des versions", path: "/dashboard/history" },
        { label: "Certificats", path: "/dashboard/certificates" }
      ]
    },
    reader: {
      title: "Bibliothèque Scientifique",
      stats: [
        { label: "Articles Publiés", value: "892", icon: BookOpen, color: "text-slate-700" },
        { label: "Dernier Volume", value: "V.12", icon: Layers, color: "text-[var(--primary)]" },
      ],
      actions: [
        { label: "Recherche avancée", path: "/dashboard/search" },
        { label: "Parcourir par année", path: "/dashboard/archive" },
        { label: "Téléchargements", path: "/dashboard/downloads" }
      ]
    }
  };

  const currentConfig = dashboardConfig[role as keyof typeof dashboardConfig];

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-12">
      {/* Top Banner */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[var(--primary)] font-bold text-xs uppercase tracking-[2px] mb-2">
                Tableau de bord • {role}
              </p>
              <h1 className="text-3xl font-serif font-bold text-slate-900">
                {currentConfig.title}
              </h1>
            </div>
            {role === 'author' && (
              <Button asChild className="bg-[var(--primary)] rounded-full px-6 shadow-lg shadow-[var(--primary)]/20">
                <Link to="/dashboard/submit">
                  <Plus className="mr-2 h-4 w-4" /> Soumettre un Article
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentConfig.stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Recent Activity / Table Section */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="border-slate-200 shadow-sm rounded-2xl h-full">
              <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between py-5">
                <CardTitle className="text-lg font-bold">Articles Récents</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400">Voir tout</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {/* Empty state / placeholder for data */}
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">Analyse des protocoles de routage dans les réseaux IoT</p>
                          <p className="text-xs text-slate-400">ID: #SF-2026-00{i+1} • Mis à jour il y a 2h</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                          En évaluation
                        </span>
                        <ArrowUpRight className="text-slate-300 group-hover:text-[var(--primary)] transition-colors" size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card className="border-none bg-slate-900 text-white shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentConfig.actions.map((action, i) => (
                  <Button 
                    key={i}
                    variant="ghost"
                    asChild // Critical: this allows the Button to act as a Link
                    className="w-full h-auto flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all text-left group"
                  >
                    <Link to={action.path}>
                      <span className="text-sm font-semibold">{action.label}</span>
                      <div className="p-1 rounded-lg bg-white/5 group-hover:bg-[var(--primary)] transition-colors">
                        <Plus size={14} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};