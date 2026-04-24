import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { BottomNav } from "@/features/discovery/components/BottomNav";

export default function MyAlertsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-4 font-headline">Meus Alertas</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-body">Personalize como e quando você deseja ser notificado sobre novos editais e oportunidades culturais no Nordeste.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Section */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">timer</span>
                <h2 className="text-2xl font-bold font-headline">Filtros de Monitoramento</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Prazo de Inscrição Mínimo</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Qualquer", "7+ dias", "15+ dias", "30+ dias"].map((p) => (
                      <button 
                        key={p} 
                        className={`px-4 py-3 rounded-xl border-2 transition-all font-body ${
                          p === 'Qualquer' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant/20 hover:border-primary/50 text-on-surface-variant font-medium'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Tipo de Edital</label>
                  <div className="flex flex-wrap gap-3">
                    {["Lei Paulo Gustavo", "Aldir Blanc 2", "Fundos Estaduais", "Editais Privados", "Internacionais"].map((t) => (
                      <label key={t} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full cursor-pointer hover:bg-surface-container transition-all">
                        <input defaultChecked={['Lei Paulo Gustavo', 'Aldir Blanc 2', 'Editais Privados'].includes(t)} className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                        <span className="text-sm font-semibold font-body">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-lg">notifications_active</span>
                <h2 className="text-2xl font-bold font-headline">Canais de Notificação</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'Email', icon: 'get_app', sub: 'Resumo diário', active: true },
                  { id: 'WhatsApp', icon: 'chat', sub: 'Alertas instantâneos', active: false },
                  { id: 'Push', icon: 'notifications', sub: 'Notificações no navegador', active: true },
                ].map((c) => (
                  <div key={c.id} className="p-6 rounded-2xl bg-surface-container-low border border-transparent hover:border-secondary/30 transition-all flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-4xl text-secondary mb-4">{c.id === 'Email' ? 'mail' : c.icon}</span>
                    <h3 className="font-bold text-lg mb-1 font-headline">{c.id}</h3>
                    <p className="text-[10px] text-on-surface-variant mb-6 font-body uppercase tracking-wider font-bold">{c.sub}</p>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <div className={`w-11 h-6 rounded-full transition-colors ${c.active ? 'bg-secondary' : 'bg-slate-300'}`}>
                        <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${c.active ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-primary-container p-8 rounded-xl text-on-primary-container shadow-lg flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-2 font-headline">Salvar Configurações</h3>
              <p className="text-sm opacity-90 mb-4 font-medium font-body">Suas preferências serão atualizadas instantaneamente em nossa rede de monitoramento.</p>
              <button className="w-full bg-on-primary-container text-surface-container-lowest py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-md font-label uppercase tracking-wide">
                Salvar Preferências
              </button>
              <button className="w-full bg-white/20 border-2 border-white/30 text-on-primary-container py-4 rounded-full font-bold text-lg hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2 font-label uppercase tracking-wide">
                <span className="material-symbols-outlined">send</span>
                Testar Alerta
              </button>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border-2 border-dashed border-outline-variant/30">
              <h4 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Status de Monitoramento</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium font-body"><span className="w-2 h-2 rounded-full bg-green-500"></span> Monitorando Editais</span>
                  <span className="font-bold font-headline">142</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium font-body"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Próximos de Fechar</span>
                  <span className="font-bold font-headline">12</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
