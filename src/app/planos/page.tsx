import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-32 pb-24 overflow-x-hidden">
        {/* Hero Header */}
        <header className="max-w-7xl mx-auto px-8 text-center mb-24 relative">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[120px] -z-10"></div>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-label">Preços Transparentes</div>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-on-surface leading-tight">
            Planos e <span className="text-primary italic">Preços</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-body">
            Encontre o ajuste perfeito para sua jornada cultural. Democratizando o acesso a editais com foco na potência criativa do Nordeste.
          </p>
        </header>

        {/* Pricing Bento Grid */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {[
              { 
                icon: 'palette', 
                title: 'Proponente', 
                sub: '(Preciso de recursos)', 
                features: [
                  'Alertas personalizados de editais.',
                  'Filtros por região e linguagem.',
                  'Guia básico de prestação de contas.'
                ]
              },
              { 
                icon: 'diversity_3', 
                title: 'Mentor', 
                sub: '(Ajudo a captar)', 
                features: [
                  'Dashboards para múltiplos clientes.',
                  'Relatórios de prospecção.',
                  'Timeline de prazos centralizada.'
                ],
                featured: true
              },
              { 
                icon: 'account_balance', 
                title: 'Gestor Gov', 
                sub: '(Publico editais)', 
                features: [
                  'Publicação e transparência.',
                  'Análise de dados de impacto.',
                  'Conformidade com LPG e PAB.'
                ]
              },
              { 
                icon: 'corporate_fare', 
                title: 'Gestor B2B', 
                sub: '(Iniciativa privada)', 
                features: [
                  'Curadoria alinhada ao ESG.',
                  'Gestão de editais de patrocínio.',
                  'Monitoramento de contrapartidas.'
                ]
              }
            ].map((plan) => (
              <div key={plan.title} className={`bg-surface-container-lowest p-8 rounded-[40px] flex flex-col transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl group border ${plan.featured ? 'border-primary shadow-xl shadow-primary/5' : 'border-outline-variant/10 shadow-sm'}`}>
                <div className="mb-8">
                  <span className={`material-symbols-outlined text-5xl mb-6 group-hover:scale-110 transition-transform block ${plan.featured ? 'text-primary' : 'text-primary/60'}`}>{plan.icon}</span>
                  <h3 className="font-headline text-3xl font-black mb-2 tracking-tight">{plan.title}</h3>
                  <p className="text-xs font-bold text-on-surface-variant font-label uppercase tracking-widest">{plan.sub}</p>
                </div>
                
                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-sm font-semibold font-body leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <div className="text-center py-4 bg-surface-container-low rounded-2xl">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest font-label">Em Breve</span>
                  </div>
                  <button className={`w-full py-5 px-6 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 font-label uppercase tracking-widest ${plan.featured ? 'bg-gradient-to-r from-primary to-primary-container text-on-primary' : 'bg-surface-container-highest text-on-surface'}`}>
                    Me Avise no Lançamento
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Focus Section */}
        <section className="max-w-7xl mx-auto px-8 mt-48">
          <div className="bg-surface-container-low rounded-[60px] overflow-hidden flex flex-col lg:flex-row items-center border border-outline-variant/5">
            <div className="w-full lg:w-1/2 min-h-[500px] relative">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUG0Mm5ikj4w9oGV7QaRw_qevuzTvyl1d5DKfIGNUQ8rRHJZ3qLt_bQIvepKIF_Bq0O1r0sb2vnhHENsRFs8mQf2vAuLpPYG1f1xxRHW7Oahnb8TW1SIwbZq3LmQ0Th0RtJw0jBjKbsNygJ2DXOkKxpysexhZOgmw-ak3B0rTtIHrqE2zNdV_9mqxY0qs5itATRQneG1tk87ZV00ZIArvIH_tsmg_Fbkdq13-5ll3W84PEg73m6UrW4QpmLBU9yAfevYtYJG1wP_-O" 
                alt="Nordeste Culture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>
            <div className="w-full lg:w-1/2 p-16 lg:p-24">
              <h2 className="font-headline text-5xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tighter italic">Cultura que transborda o <span className="text-primary not-italic">Nordeste</span></h2>
              <p className="text-xl text-on-surface-variant mb-12 leading-relaxed font-body">
                Nascemos na Paraíba com o propósito de conectar talentos locais a oportunidades globais. Nossa tecnologia é o curador digital que entende o sotaque, a urgência e a potência da nossa gente.
              </p>
              <div className="flex flex-wrap items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary font-headline">Paraíba</span>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 font-label">Sede Principal</span>
                </div>
                <div className="w-px h-16 bg-outline-variant/20 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-secondary font-headline">SomaINOVA</span>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 font-label">Parceiro Inovação</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
