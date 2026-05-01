import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

interface Props {
    theme?: 'light' | 'dark';
}

export const Logo = ({ theme = 'light' }: Props) => {
    return (
        <Link to='/' className="group flex items-center gap-2.5">
            <div className="relative overflow-hidden rounded-xl bg-indigo-600 p-2 transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="relative z-10 text-white" size={22} />
            </div>
            <span className={`text-xl font-bold tracking-tighter ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                SciFlow
            </span>
        </Link>
    );
}
