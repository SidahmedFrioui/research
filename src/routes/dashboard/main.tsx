import { 
  LayoutDashboard, FileText, Users, Send, Bell, 
  CheckCircle2, Clock, MoreVertical, Plus, 
  BookOpen
} from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold">SciFlow</span>
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<FileText size={20}/>} label="My Submissions" />
          <NavItem icon={<Users size={20}/>} label="Peer Reviews" />
          <NavItem icon={<Send size={20}/>} label="Inboxes" />
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Storage</p>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mb-2">
            <div className="bg-indigo-600 h-1.5 rounded-full w-2/3"></div>
          </div>
          <p className="text-xs text-slate-600">12.4 GB of 20 GB used</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Author Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><Bell size={22} /></button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm font-bold text-indigo-700">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Welcome & Stats */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome back, Professor!</h1>
              <p className="text-slate-500">Here’s what’s happening with your publications today.</p>
            </div>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
              <Plus size={20} /> New Submission
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard icon={<FileText className="text-blue-600"/>} label="Total Papers" value="12" color="bg-blue-50" />
            <StatCard icon={<Clock className="text-orange-600"/>} label="Under Review" value="03" color="bg-orange-50" />
            <StatCard icon={<CheckCircle2 className="text-emerald-600"/>} label="Published" value="09" color="bg-emerald-50" />
          </div>

          {/* Recent Submissions Table */}
          <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Active Submissions</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">Article Title</th>
                  <th className="px-6 py-4">Submission Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TableRow 
                  title="Neural Architecture Search in Edge Computing" 
                  date="Apr 20, 2026" 
                  status="Under Review" 
                  statusColor="bg-orange-100 text-orange-700" 
                />
                <TableRow 
                  title="Quantum Cryptography in Banking Systems" 
                  date="Mar 12, 2026" 
                  status="Revision Required" 
                  statusColor="bg-indigo-100 text-indigo-700" 
                />
                <TableRow 
                  title="Sustainable AI: Power Efficiency Models" 
                  date="Feb 05, 2026" 
                  status="Accepted" 
                  statusColor="bg-emerald-100 text-emerald-700" 
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active = false }: any) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition font-medium ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon}
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>{icon}</div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const TableRow = ({ title, date, status, statusColor }: any) => (
  <tr className="hover:bg-slate-50/50 transition cursor-pointer">
    <td className="px-6 py-4">
      <p className="text-slate-800 font-semibold truncate max-w-xs">{title}</p>
    </td>
    <td className="px-6 py-4 text-slate-500 text-sm">{date}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>{status}</span>
    </td>
    <td className="px-6 py-4">
      <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
    </td>
  </tr>
);


export const Route = createFileRoute('/dashboard/main')({
  component: Dashboard,
})