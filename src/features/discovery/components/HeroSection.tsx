import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4">
          <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
          INTELIGÊNCIA CULTURAL NO NORDESTE
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-on-surface mb-8 leading-[1.1]">
          O edital certo para sua <br /> 
          <span className="bg-gradient-curator bg-clip-text text-transparent">
            arte prosperar.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Monitoramento inteligente, tradução de editais para linguagem simples e notificações personalizadas para artistas e produtores independentes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-gradient-curator text-on-primary px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all">
            Cadastre-se Agora
          </button>
          <button className="w-full sm:w-auto bg-white text-on-surface hover:bg-surface-container-low px-8 py-4 rounded-full text-lg font-bold transition-all">
            Ver Editais Abertos
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
}
