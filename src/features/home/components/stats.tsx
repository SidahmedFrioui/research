export const Stats = () => {
    const stats = [
        { label: 'Articles Publiés', val: '1,200+' },
        { label: 'Reviewers Actifs', val: '450+' },
        { label: 'Temps Moyen', val: '45j' },
        { label: 'Taux d\'Acceptation', val: '18%' },
    ]
  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-900 rounded-[2.5rem] text-white">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-indigo-400">{stat.val}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
  )
}
