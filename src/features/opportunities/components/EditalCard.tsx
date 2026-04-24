import Link from "next/link";
import { Calendar, DollarSign, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditalProps {
  edital: {
    id: string;
    title: string;
    value: number;
    deadline: string;
    matchScore: number;
    area: string;
    location: string;
  }
}

export function EditalCard({ edital }: EditalProps) {
  return (
    <div className="group bg-white rounded-[2rem] p-8 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-black/[0.03] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-surface-container-low text-on-surface/50 text-[10px] font-black uppercase tracking-widest">
            {edital.area}
          </span>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-display font-black text-secondary">
              {edital.matchScore}%
            </div>
            <div className="text-[10px] font-bold text-on-surface/30 uppercase">Match</div>
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-on-surface mb-8 leading-snug group-hover:text-primary transition-colors">
          {edital.title}
        </h3>

        <div className="grid grid-cols-2 gap-y-4 mb-10">
          <InfoItem 
            icon={<DollarSign className="w-4 h-4" />} 
            label="Investimento" 
            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(edital.value)} 
          />
          <InfoItem 
            icon={<Calendar className="w-4 h-4" />} 
            label="Inscrições" 
            value={edital.deadline} 
          />
          <InfoItem 
            icon={<MapPin className="w-4 h-4" />} 
            label="Abrangência" 
            value={edital.location} 
          />
        </div>
      </div>

      <Link 
        href={`/editais/${edital.id}`}
        className="w-full py-4 rounded-2xl bg-surface-container-low text-on-surface font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-on-primary transition-all"
      >
        Ver Detalhes e Guia
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface/30 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold text-on-surface/30 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold text-on-surface/70">{value}</div>
      </div>
    </div>
  );
}
