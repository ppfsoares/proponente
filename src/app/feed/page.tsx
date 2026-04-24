import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { BottomNav } from "@/features/discovery/components/BottomNav";
import { OpportunityCard } from "@/features/discovery/components/OpportunityCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const grants = await prisma.grant.findMany({
    orderBy: { deadline: 'asc' },
    take: 10
  });

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-7xl w-full px-6 py-24">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block font-label">Central de Oportunidades</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight font-headline">
                Seu próximo projeto <br/>começa aqui.
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-lowest p-2 rounded-2xl shadow-sm border border-outline-variant/10">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div className="pr-4">
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider font-label">IA Ativada</p>
                <p className="text-sm font-bold text-on-surface font-headline">Match Personalizado</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-surface-container-low p-6 rounded-3xl sticky top-28">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                Filtros
              </h3>
              
              <div className="mb-8">
                <label className="text-xs font-bold text-outline uppercase tracking-widest mb-4 block font-label">Região Nordeste</label>
                <div className="space-y-3">
                  {["Bahia", "Pernambuco", "Ceará"].map((state) => (
                    <label key={state} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
                        <div className={`w-2.5 h-2.5 bg-primary rounded-sm transition-opacity ${state === 'Bahia' ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface font-body">{state}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-outline uppercase tracking-widest mb-4 block font-label">Tipo de Edital</label>
                <div className="space-y-3">
                  {["Todos", "Lei Paulo Gustavo", "Aldir Blanc II"].map((type) => (
                    <label key={type} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
                        <div className={`w-2.5 h-2.5 bg-primary rounded-full transition-opacity ${type === 'Todos' ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                      <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface font-body">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-3 bg-surface-container-highest rounded-2xl text-on-surface font-bold text-sm hover:bg-surface-variant transition-colors font-label uppercase tracking-wide">
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Feed Content */}
          <section className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grants.map((grant, index) => (
                <OpportunityCard 
                  key={grant.id} 
                  grant={grant} 
                  matchScore={index === 0 ? 98 : 85 - (index * 2)} 
                />
              ))}

              {/* Match CTA */}
              <div className="group bg-gradient-to-br from-[#FF5D4E] to-[#b61424] rounded-[2rem] p-8 transition-all duration-300 flex flex-col justify-between text-white relative overflow-hidden md:col-span-2">
                <div className="absolute -bottom-10 -right-10 opacity-20 transform rotate-12">
                  <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-4 leading-tight font-headline">Não encontrou o que buscava?</h3>
                  <p className="text-white/80 font-body text-sm mb-6 max-w-md">Nossa Inteligência Artificial pode monitorar editais específicos para o seu perfil e te avisar em tempo real.</p>
                </div>
                <Link 
                  href="/alertas"
                  className="w-fit bg-white text-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-orange-50 transition-all active:scale-95 font-label uppercase tracking-wide"
                >
                  Configurar Alerta Personalizado
                </Link>
              </div>
            </div>
            
            {/* Pagination Placeholder */}
            {grants.length > 0 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm font-body">1</button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant font-bold text-sm hover:bg-surface-variant transition-all font-body">2</button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
