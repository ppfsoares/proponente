import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { handleOnboarding } from "@/features/onboarding/actions";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 md:p-12 bg-surface-container-low">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Stepper Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight font-headline tracking-tight">Crie seu perfil cultural</h1>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">Personalize sua experiência para receber alertas de editais que realmente importam para você.</p>
            </div>

            <div className="space-y-6">
              {[
                { step: 1, title: 'Identificação', sub: 'Dados básicos e porte', active: true },
                { step: 2, title: 'Atuação', sub: 'Áreas e localização', active: false },
                { step: 3, title: 'Interesses', sub: 'Público e match IA', active: false },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-5 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all shadow-sm ${s.active ? 'bg-primary text-on-primary ring-4 ring-primary/10' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    {s.step}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-bold font-headline ${s.active ? 'text-on-surface text-lg' : 'text-on-surface-variant'}`}>{s.title}</span>
                    <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest font-label">{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-secondary-container/20 border border-secondary-fixed/10 hidden lg:block">
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <p className="text-sm text-on-secondary-container leading-relaxed font-medium font-body">
                  <strong className="block mb-1 font-bold font-headline">Dica do Curador:</strong> 
                  Preencher todos os campos aumenta em 85% a precisão do nosso sistema de Match IA.
                </p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[40px] p-10 md:p-14 shadow-xl shadow-black/5 border border-outline-variant/10">
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary font-label">Passo 1 de 3</span>
                <span className="text-sm font-bold text-on-surface-variant font-headline">33% concluído</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container w-1/3 rounded-full transition-all duration-700 ease-out"></div>
              </div>
            </div>

            <form action={handleOnboarding} className="space-y-10">
              <section className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant ml-1 font-label uppercase tracking-wide">Nome ou Razão Social</label>
                    <input 
                      name="name"
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all placeholder:text-outline text-on-surface font-semibold font-body" 
                      placeholder="Ex: Cia de Teatro Arte Viva" 
                      type="text" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-on-surface-variant ml-1 font-label uppercase tracking-wide">CNPJ (Opcional)</label>
                    <input 
                      name="cnpj"
                      className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all placeholder:text-outline text-on-surface font-semibold font-body" 
                      placeholder="00.000.000/0000-00" 
                      type="text" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-on-surface-variant ml-1 font-label uppercase tracking-wide">Porte da Organização / Agente</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'Individual', sub: 'MEI / Autônomo' },
                      { id: 'Pequeno', sub: 'Até 10 pessoas' },
                      { id: 'Médio/Grande', sub: 'Mais de 10 pessoas' },
                    ].map((porte) => (
                      <label key={porte.id} className="relative flex items-center p-6 rounded-2xl bg-surface-container-low cursor-pointer hover:bg-white hover:shadow-md transition-all group">
                        <input className="hidden peer" name="organizationSize" type="radio" value={porte.id} defaultChecked={porte.id === 'Individual'} />
                        <div className="peer-checked:border-primary peer-checked:bg-white absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none transition-all"></div>
                        <div className="relative z-10 flex flex-col">
                          <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors font-headline">{porte.id}</span>
                          <span className="text-xs font-semibold text-on-surface-variant/80 font-body">{porte.sub}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface-variant ml-1 font-label uppercase tracking-wide">Localização Principal (Nordeste)</label>
                  <select 
                    name="state"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all text-on-surface font-semibold font-body appearance-none"
                  >
                    <option disabled value="">Selecione seu estado</option>
                    {["Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe"].map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-5">
                  <label className="text-sm font-bold text-on-surface-variant ml-1 font-label uppercase tracking-wide">Áreas Culturais de Atuação</label>
                  <input type="hidden" name="area" value="Cultura Popular" /> {/* Default for this demo */}
                  <div className="flex flex-wrap gap-2">
                    {["Música", "Artes Cênicas", "Audiovisual", "Artesanato", "Patrimônio Cultural", "Literatura", "Gastronomia"].map((area) => (
                      <button 
                        key={area}
                        type="button"
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all border-2 ${
                          area === 'Artesanato' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant/10 bg-white text-on-surface-variant hover:border-primary/50 hover:text-primary'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-between pt-12 border-t border-outline-variant/10">
                <button className="px-8 py-4 text-on-surface-variant font-bold hover:text-on-surface transition-all font-label uppercase tracking-widest text-xs" type="button">Pular por enquanto</button>
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-12 py-5 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 font-label uppercase tracking-widest text-sm" type="submit">
                  Finalizar Cadastro
                  <span className="material-symbols-outlined font-bold text-xl">check</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
