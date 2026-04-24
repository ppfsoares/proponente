import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { BottomNav } from "@/features/discovery/components/BottomNav";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function EditalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const grant = await prisma.grant.findUnique({
    where: { id }
  });

  if (!grant) {
    notFound();
  }

  const formattedDeadline = format(new Date(grant.deadline), "dd MMM yyyy", { locale: ptBR });
  const formattedValue = grant.value 
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(grant.value)
    : "Sob consulta";

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12 text-on-surface">
            <header>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-label">
                  {grant.isUrgent ? 'Urgente' : 'Edital Aberto'}
                </span>
                <span className="text-outline text-sm font-medium font-body">Publicado em {format(new Date(grant.createdAt), "dd MMM yyyy", { locale: ptBR })}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-8 font-headline">
                {grant.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-on-surface-variant font-body">
                <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span>{formattedValue}</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span>Inscrições até {formattedDeadline}</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3 rounded-2xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span>{grant.state}</span>
                </div>
              </div>
            </header>

            <section className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-headline">O que você precisa saber</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-bold text-primary flex items-center gap-2 font-headline text-lg">
                    <span className="material-symbols-outlined text-xl">description</span>
                    Descrição
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">
                    {grant.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2 font-headline text-lg">
                    <span className="material-symbols-outlined text-xl">person_check</span>
                    Categoria
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">
                    Este edital é focado em <strong className="text-on-surface">{grant.category}</strong> no estado de <strong className="text-on-surface">{grant.state}</strong>.
                  </p>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-bold text-primary flex items-center gap-2 font-headline text-lg">
                    <span className="material-symbols-outlined text-xl">verified</span>
                    Dica do Curador Digital
                  </h3>
                  <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary">
                    <p className="text-base font-bold italic text-on-surface font-headline mb-2">Análise Simplificada ➜</p>
                    <p className="text-on-surface-variant font-body">Este edital valoriza a trajetória e o impacto comunitário. Certifique-se de anexar fotos e depoimentos que comprovem sua atuação histórica.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-3xl sticky top-28 border border-outline-variant/10 shadow-sm">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 font-headline">
                <span className="material-symbols-outlined text-secondary">checklist</span>
                Checklist de Documentos
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { title: 'RG e CPF', desc: 'Cópia simples frente e verso.' },
                  { title: 'Residência', desc: 'Contas ou autodeclaração.' },
                  { title: 'Portfólio', desc: 'Mínimo 5 fotos do trabalho.' },
                  { title: 'Banco', desc: 'Extrato ou foto do cartão.' },
                ].map((doc) => (
                  <label key={doc.title} className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl cursor-pointer hover:shadow-md transition-all border border-outline-variant/5">
                    <input className="mt-1 rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                    <div>
                      <p className="text-sm font-bold font-headline">{doc.title}</p>
                      <p className="text-xs text-on-surface-variant font-body">{doc.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                {grant.externalUrl && (
                  <a 
                    href={grant.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-full font-bold hover:scale-[0.98] transition-transform shadow-lg shadow-primary/20 font-label uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined">open_in_new</span>
                    Acessar Edital Oficial
                  </a>
                )}
                <button className="w-full flex items-center justify-center gap-3 bg-secondary text-secondary-container py-4 rounded-full font-bold hover:bg-secondary-dim transition-colors font-label uppercase tracking-wider">
                  <span className="material-symbols-outlined">support_agent</span>
                  Preciso de Ajuda
                </button>
              </div>

              <div className="mt-8 p-6 bg-tertiary-container/10 rounded-2xl border border-tertiary-container/20">
                <div className="flex items-center gap-3 text-on-tertiary-container font-bold mb-3 font-headline">
                  <span className="material-symbols-outlined text-tertiary">psychology</span>
                  Análise Match IA
                </div>
                <p className="text-sm text-on-tertiary-container/90 leading-relaxed font-body">
                  Baseado no seu perfil, você tem <strong className="text-tertiary">85% de aderência</strong> a este edital. Sua experiência regional é um diferencial forte.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
