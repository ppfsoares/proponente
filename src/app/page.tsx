import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { BottomNav } from "@/features/discovery/components/BottomNav";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredGrants = await prisma.grant.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pb-24 pt-12 overflow-hidden">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10 text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold mb-6 tracking-wider uppercase font-label">
                Monitoramento Regional Nordeste
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-background leading-[1.1] mb-6">
                A cultura do <span className="text-gradient">Nordeste</span> em movimento.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed font-body mx-auto lg:mx-0">
                Encontre editais, leis de incentivo e oportunidades culturais em todos os 9 estados da região. Otimize sua busca com inteligência artificial.
              </p>

              {/* Quick Search Container */}
              <div className="bg-surface-container-lowest p-2 rounded-3xl shadow-2xl shadow-primary/5 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 flex items-center px-4 py-3 bg-surface-container-low rounded-2xl">
                    <span className="material-symbols-outlined text-outline mr-3">search</span>
                    <input className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline font-body" placeholder="Palavra-chave (ex: Teatro, Música)" type="text" />
                  </div>
                  <div className="md:w-48 flex items-center px-4 py-3 bg-surface-container-low rounded-2xl">
                    <span className="material-symbols-outlined text-outline mr-3">location_on</span>
                    <select className="bg-transparent border-none focus:ring-0 w-full text-on-surface appearance-none font-body">
                      <option>Todos Estados</option>
                      <option>Bahia</option>
                      <option>Ceará</option>
                      <option>Pernambuco</option>
                      <option>Paraíba</option>
                    </select>
                  </div>
                  <Link href="/feed" className="primary-gradient text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 active:scale-95 transition-all font-label uppercase tracking-wide text-center">
                    Buscar
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link href="/cadastro" className="w-full sm:w-auto primary-gradient text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-label uppercase tracking-wide text-center">
                  Cadastre-se Grátis
                </Link>
                <Link href="/feed" className="flex items-center gap-2 text-on-surface font-bold hover:text-primary transition-colors font-label uppercase tracking-wide">
                  Ver Editais Abertos
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img className="w-full h-full object-cover" src="/images/nordeste_hero.png" alt="Nordeste Cultura" />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl shadow-xl z-20 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <span className="font-bold text-sm font-headline">Match IA</span>
                </div>
                <p className="text-xs text-on-surface-variant font-body">3 novos editais encontrados para seu perfil em Pernambuco.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Strategy */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="font-headline text-4xl font-extrabold text-on-background mb-4">Foco Regional Estratégico</h2>
              <p className="text-on-surface-variant max-w-xl font-body mx-auto lg:mx-0">Monitoramos em tempo real as principais fontes de fomento do Nordeste brasileiro.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group border border-outline-variant/10">
                <div className="z-10">
                  <div className="w-14 h-14 rounded-2xl primary-gradient flex items-center justify-center text-white mb-6">
                    <span className="material-symbols-outlined text-3xl">hub</span>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 font-headline">Ecossistema Conectado</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-8 font-body">Centralizamos editais municipais, estaduais e federais em uma única interface inteligente, garantindo que nenhum proponente perca prazos.</p>
                </div>
                <div className="z-10 mt-auto">
                  <Link href="/feed" className="text-primary font-bold inline-flex items-center gap-2 font-label uppercase tracking-wider text-xs">Saiba mais <span className="material-symbols-outlined">trending_flat</span></Link>
                </div>
              </div>

              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-[2rem] flex items-center gap-6 border border-outline-variant/10">
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2 font-headline">9 Estados Cobertos</h4>
                  <p className="text-sm text-on-surface-variant font-body">Do Maranhão à Bahia, mapeamos todas as secretarias de cultura.</p>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-4xl text-on-secondary-container">map</span>
                </div>
              </div>

              <div className="md:col-span-1 bg-surface-container-lowest p-8 rounded-[2rem] flex flex-col justify-between border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">notifications_active</span>
                <div>
                  <h4 className="font-bold mb-1 font-headline">Alertas IA</h4>
                  <p className="text-xs text-on-surface-variant font-body">Notificações personalizadas via WhatsApp e e-mail.</p>
                </div>
              </div>

              <div className="md:col-span-1 primary-gradient p-8 rounded-[2rem] flex flex-col justify-between text-white">
                <span className="material-symbols-outlined text-4xl mb-4">groups</span>
                <div>
                  <h4 className="font-bold mb-1 font-headline">Comunidade</h4>
                  <p className="text-xs text-white/80 font-body">Mais de 5.000 fazedores de cultura conectados.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Opportunities */}
        <section className="py-24 px-6 bg-surface">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline text-4xl font-extrabold text-on-background mb-4">Editais em Destaque</h2>
                <p className="text-on-surface-variant font-body">Oportunidades com inscrições abertas esta semana.</p>
              </div>
              <Link href="/feed" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline font-label uppercase tracking-wide text-xs">
                Ver todos os editais
                <span className="material-symbols-outlined">open_in_new</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredGrants.map((grant) => (
                <Link href={`/editais/${grant.id}`} key={grant.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden group border border-transparent hover:border-primary/10 transition-all shadow-sm">
                  <div className="relative h-48 overflow-hidden bg-surface-variant">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                      src={`https://picsum.photos/seed/${grant.id}/800/600`} 
                      alt={grant.title} 
                    />
                    <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">
                      Ativo
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label">
                        {grant.state || 'Geral'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline"></span>
                      <span className="text-[10px] text-on-surface-variant font-body">
                        {grant.description ? grant.description.split(' ').slice(0, 2).join(' ') : 'Cultura'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-4 line-clamp-2 font-headline">
                      {grant.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 font-body">
                      {grant.description}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-surface-container">
                      <div>
                        <p className="text-[10px] text-outline uppercase font-bold font-label">Inscrições até</p>
                        <p className="text-sm font-bold text-on-surface font-body">
                          {grant.deadline ? new Date(grant.deadline).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) : 'Em breve'}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

