import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface OpportunityCardProps {
  grant: {
    id: string;
    title: string;
    description: string;
    value: number | null;
    deadline: Date;
    state: string;
    category: string;
    isUrgent: boolean;
  };
  matchScore?: number;
}

export function OpportunityCard({ grant, matchScore = 85 }: OpportunityCardProps) {
  const formattedDeadline = format(new Date(grant.deadline), "dd MMM", { locale: ptBR });
  const formattedValue = grant.value 
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(grant.value)
    : "Sob consulta";

  return (
    <div className="group bg-surface-container-lowest rounded-[2rem] p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 border border-transparent hover:border-primary/10 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 p-6">
        <div className={`${matchScore >= 90 ? 'bg-secondary-container text-on-secondary-container animate-pulse' : 'bg-surface-container-high text-on-surface-variant'} px-4 py-2 rounded-full flex items-center gap-2`}>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: matchScore >= 90 ? "'FILL' 1" : "" }}>{matchScore >= 90 ? 'star' : 'psychology'}</span>
          <span className="text-xs font-black font-label">{matchScore}% Match</span>
        </div>
      </div>
      
      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-bold uppercase tracking-wider mb-4 font-label">
          {grant.category} • {grant.state}
        </span>
        <h3 className="text-xl font-bold text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors font-headline">
          {grant.title}
        </h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 font-body">
          {grant.description}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-low/50 p-4 rounded-2xl">
            <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1 font-label">Valor</p>
            <p className="text-lg font-extrabold text-on-surface font-body">{formattedValue}</p>
          </div>
          <div className="bg-surface-container-low/50 p-4 rounded-2xl">
            <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1 font-label">Prazo</p>
            <p className={`text-lg font-extrabold font-body ${grant.isUrgent ? 'text-error' : 'text-on-surface'}`}>{formattedDeadline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href={`/editais/${grant.id}`}
            className="flex-grow bg-on-background text-surface-container-lowest py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 font-label uppercase tracking-wide text-center"
          >
            Ver Detalhes
          </Link>
          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container-low text-outline hover:text-primary hover:bg-primary/10 transition-all">
            <span className="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
}
