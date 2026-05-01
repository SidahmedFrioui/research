import { FileUp, Search } from "lucide-react"
import { useRouter } from "@tanstack/react-router"

export const Hero = () => {
    const router = useRouter();

    return (
        <section className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                Cycle de vie complet des articles
            </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-slate-950">
            La science en mouvement, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                de la soumission à la publication.
            </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            SciFlow simplifie la gestion de votre journal informatique. Automatisez l'évaluation, 
            suivez les versions en temps réel et diffusez le savoir sans friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.navigate({ to: '/dashboard/submit' })} className="cursor-pointer bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                Soumettre un article <FileUp size={20} />
            </button>
            <button onClick={() => router.navigate({ to: '/articles' })} className="cursor-pointer bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                Consulter les archives <Search size={20} />
            </button>
            </div>
        </section>
    )
}