import { Hero, Stats, Workflow, Roles } from './components';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* 1. HERO SECTION: Scientific Impact */}
      <Hero />
      {/* 2. STATS BAR: Transparency */}
      <Stats />
      {/* 3. CORE WORKFLOW: From Project Specs */}
      <Workflow />
      {/* 4. ROLES SECTION: Based on 'Utilisateurs et rôles' */}
      <Roles />
    </div>
  );
};