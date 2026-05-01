import { Link } from "@tanstack/react-router"
import { Logo } from "./Logo"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--secondary)] px-6 pb-12 pt-16">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--sea-ink-soft)] to-transparent opacity-30" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-12">
          
          {/* Branding - Spans 5 columns */}
          <div className="sm:col-span-5">
            {/* Logo Section */}
            <Logo theme="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white">
              Propulser la recherche scientifique grâce à une gestion fluide du cycle de vie des articles : 
              de la soumission à la consécration.
            </p>
          </div>

          {/* Navigation - Spans 3 columns */}
          <div className="sm:col-span-3">
            <h4 className="mb-4 text-xs font-uppercase tracking-widest text-white opacity-90">
              EXPLORER
            </h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/articles" className="hover:translate-x-1 text-white transition-all duration-200">
                Articles publiés
              </Link>
              <Link to="/auth/sign-in" className="hover:translate-x-1 text-white transition-all duration-200">
                Espace auteur
              </Link>
              <Link to="/auth/sign-up" className="hover:translate-x-1 text-white transition-all duration-200">
                Soumission
              </Link>
            </nav>
          </div>

          {/* Legal & Newsletter - Spans 4 columns */}
          <div className="sm:col-span-4">
            <h4 className="mb-4 text-xs font-uppercase tracking-widest text-white opacity-90">
              LÉGAL
            </h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/privacy-policy" className="text-white transition">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-white transition">
                Conditions d'utilisation
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-[var(--line)] pt-8 sm:flex-row">
          <p className="text-xs text-white opacity-90">
            &copy; {year} SciFlow. Conçu pour la communauté scientifique.
          </p>
          <div className="mt-6 flex gap-4 sm:mt-0">
            {/* LinkedIn Button */}
            <a 
              href="https://linkedin.com/company/sci_flow" 
              aria-label="LinkedIn"
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:-translate-y-1"
            >
              <svg className="z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
              </svg>
              {/* Animated Background Pulse */}
              <span className="absolute inset-0 rounded-xl bg-indigo-400 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-20" />
            </a>

            {/* X (Twitter) Button */}
            <a 
              href="https://x.com/sci_flow" 
              aria-label="X"
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-300 hover:bg-slate-900 hover:text-white hover:shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:-translate-y-1"
            >
              <svg className="z-10 w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
              </svg>
              {/* Animated Background Pulse */}
              <span className="absolute inset-0 rounded-xl bg-slate-400 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}