import { Sparkles, FileText, CheckCircle2, HelpCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditalViewer({ id }: { id: string }) {
  return (
    <div className="space-y-10">
      {/* Header Info */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest">
            Edital Aberto
          </span>
          <span className="text-on-surface/30 font-bold text-xs uppercase tracking-widest">Postado há 2 dias</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-on-surface mb-8 leading-[1.1]">
          Lei Paulo Gustavo <br /> 
          <span className="text-primary italic">Audiovisual Pernambuco</span>
        </h1>
        <div className="flex gap-8 border-b border-black/[0.05] pb-10">
          <StatBox label="Valor Máximo" value="R$ 50.000" />
          <StatBox label="Prazo Final" value="15 de Maio, 2026" />
          <StatBox label="Estado" value="Pernambuco" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <div className="space-y-12">
          {/* Soma Assistente (IA Summary) */}
          <section className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-black/5 border border-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles className="w-20 h-20 text-primary" />
            </div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-display font-bold text-on-surface">O que você precisa saber</h2>
            </div>
            
            <div className="space-y-6">
              <SummaryItem 
                title="Quem pode?" 
                content="Produtores independentes e coletivos com atuação comprovada de no mínimo 2 anos no setor audiovisual de PE." 
              />
              <SummaryItem 
                title="Quanto?" 
                content="Fomento direto entre R$ 10.000 e R$ 50.000 para produção de curtas ou finalização de obras." 
              />
              <SummaryItem 
                title="Atenção!" 
                content="Obrigatoriedade de contrapartida social e inclusão de ao menos 20% de profissionais de grupos minoritários na equipe." 
              />
            </div>
          </section>

          {/* Description / Content */}
          <section className="prose prose-on-surface">
             <h3 className="text-2xl font-display font-bold text-on-surface mb-6">Sobre o edital</h3>
             <p className="text-on-surface/70 leading-relaxed font-medium mb-6">
               Este edital visa apoiar a produção e finalização de obras audiovisuais no estado de Pernambuco, como parte da aplicação dos recursos da Lei Paulo Gustavo. O objetivo é fortalecer a cadeia produtiva local e incentivar a diversidade de gêneros e linguagens.
             </p>
             <div className="p-8 bg-surface-container-low rounded-3xl">
               <h4 className="text-lg font-bold text-on-surface mb-4">Itens Financiáveis</h4>
               <ul className="space-y-2 text-on-surface/60 font-medium list-disc ml-6">
                 <li>Cache de equipe técnica e artística</li>
                 <li>Locação de equipamentos e estúdios</li>
                 <li>Serviços de pós-produção (cor, som, masterização)</li>
                 <li>Acessibilidade (Legendas, LIBRAS, Audiodescrição)</li>
               </ul>
             </div>
          </section>
        </div>

        {/* Sidebar / Checklist */}
        <aside className="space-y-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xl font-display font-bold text-on-surface mb-6 flex items-center gap-3">
              <FileText className="w-5 h-5 text-secondary" />
              Checklist de Documentos
            </h3>
            <div className="space-y-4">
              <CheckItem label="Portfolio Atualizado" checked />
              <CheckItem label="Comprovante de Residência (PE)" checked />
              <CheckItem label="Plano de Trabalho" />
              <CheckItem label="Orçamento Detalhado" />
              <CheckItem label="Certidões Negativas" />
            </div>
            
            <button className="w-full mt-10 py-4 rounded-2xl bg-secondary text-on-secondary font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all">
              <Download className="w-5 h-5" />
              Baixar Modelos
            </button>
          </div>

          <div className="bg-surface-container-low rounded-[2rem] p-8">
            <h4 className="text-lg font-display font-bold text-on-surface mb-4 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-on-surface/30" />
              Dúvidas?
            </h4>
            <p className="text-sm text-on-surface/50 font-medium mb-6 leading-relaxed">
              Nosso assistente está pronto para te ajudar com as dúvidas técnicas sobre este edital.
            </p>
            <button className="w-full py-3 rounded-xl border-2 border-on-surface/10 text-on-surface/70 font-bold text-sm hover:bg-white transition-all">
              Falar com o Soma Assistente
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-on-surface/30 uppercase tracking-[0.1em] mb-1">{label}</div>
      <div className="text-xl font-display font-black text-on-surface">{value}</div>
    </div>
  );
}

function SummaryItem({ title, content }: { title: string, content: string }) {
  return (
    <div>
      <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {title}
      </h4>
      <p className="text-on-surface/70 font-bold leading-relaxed">{content}</p>
    </div>
  );
}

function CheckItem({ label, checked = false }: { label: string, checked?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-xl transition-all",
      checked ? "bg-secondary/5" : "bg-surface-container-low opacity-60"
    )}>
      {checked ? <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-on-surface/10 shrink-0" />}
      <span className={cn("text-sm font-bold", checked ? "text-on-surface/80" : "text-on-surface/40")}>{label}</span>
    </div>
  );
}
