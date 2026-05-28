"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";
import { BottomNav } from "@/features/discovery/components/BottomNav";
import { supabase } from "@/lib/supabase";
import { getUserAlerts, saveUserAlerts, getMatchingGrants } from "@/features/onboarding/actions";
import { toast } from "sonner";

export default function MyAlertsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Filter States
  const [minDeadline, setMinDeadline] = useState("Qualquer");
  const [grantTypes, setGrantTypes] = useState<string[]>(['Lei Paulo Gustavo', 'Aldir Blanc 2', 'Editais Privados']);
  const [states, setStates] = useState<string[]>([]);
  const [valueRange, setValueRange] = useState("Qualquer");
  const [channels, setChannels] = useState<string[]>(['Email', 'Push']);

  // Dynamic Opportunity Match state
  const [matchingGrants, setMatchingGrants] = useState<any[]>([]);
  const [loadingGrants, setLoadingGrants] = useState(false);
  const [saving, setSaving] = useState(false);

  const northeastStates = ["Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe"];

  // 1. Initial Load: Check auth session and retrieve database alert preferences
  useEffect(() => {
    const loadAlerts = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Por favor, faça login primeiro.");
        router.push('/login');
        return;
      }

      setUserId(session.user.id);

      try {
        const savedAlerts = await getUserAlerts(session.user.id);
        if (savedAlerts) {
          if (savedAlerts.minDeadline !== null) {
            setMinDeadline(savedAlerts.minDeadline === 7 ? "7+ dias" : savedAlerts.minDeadline === 15 ? "15+ dias" : savedAlerts.minDeadline === 30 ? "30+ dias" : "Qualquer");
          }
          if (savedAlerts.grantTypes && savedAlerts.grantTypes.length > 0) {
            setGrantTypes(savedAlerts.grantTypes);
          }
          if (savedAlerts.channels && savedAlerts.channels.length > 0) {
            setChannels(savedAlerts.channels);
          }
          if (savedAlerts.states && savedAlerts.states.length > 0) {
            setStates(savedAlerts.states);
          }
          if (savedAlerts.valueRange) {
            setValueRange(savedAlerts.valueRange);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar preferências de alerta:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, [router]);

  // 2. Dynamic Fetch: Search database for matching grants whenever filters change
  useEffect(() => {
    if (loading) return;

    const fetchMatches = async () => {
      setLoadingGrants(true);
      try {
        const grants = await getMatchingGrants({
          states,
          valueRange,
          grantTypes,
          minDeadline,
        });
        setMatchingGrants(grants);
      } catch (err) {
        console.error("Erro ao carregar editais recomendados:", err);
      } finally {
        setLoadingGrants(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMatches();
    }, 300); // Small debounce to prevent overloading Prisma in case of rapid clicks

    return () => clearTimeout(delayDebounceFn);
  }, [states, valueRange, grantTypes, minDeadline, loading]);

  // 3. Save Handler: Save filters and channels back to PostgreSQL Alert table
  const handleSavePreferences = async () => {
    if (!userId) return;
    setSaving(true);

    const mappedDeadline = minDeadline === "7+ dias" ? 7 : minDeadline === "15+ dias" ? 15 : minDeadline === "30+ dias" ? 30 : null;

    try {
      await saveUserAlerts({
        userId,
        minDeadline: mappedDeadline,
        grantTypes,
        channels,
        states,
        valueRange,
      });
      toast.success('Preferências de monitoramento salvas com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar alertas no banco:", err);
      toast.error('Ocorreu um erro ao salvar as suas preferências.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="grow flex items-center justify-center p-6 bg-surface-container-low">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto animate-duration-1000"></div>
            <p className="text-on-surface-variant font-semibold font-body">Carregando suas preferências...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="grow w-full max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-4 font-headline">Meus Alertas</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-body">Personalize como e quando você deseja ser notificado sobre novos editais e oportunidades culturais no Nordeste.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Section (Left Column) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">tune</span>
                <h2 className="text-2xl font-bold font-headline">Filtros de Monitoramento</h2>
              </div>
              <div className="space-y-8">
                {/* 1. Min Deadline */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Prazo de Inscrição Mínimo</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Qualquer", "7+ dias", "15+ dias", "30+ dias"].map((p) => (
                      <button 
                        key={p} 
                        type="button"
                        onClick={() => setMinDeadline(p)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all font-body ${
                          minDeadline === p ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant/20 hover:border-primary/50 text-on-surface-variant font-medium'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. State Filter */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Estados de Fomento (Nordeste)</label>
                  <div className="flex flex-wrap gap-2">
                    {northeastStates.map((st) => {
                      const isSelected = states.includes(st);
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            if (isSelected) setStates(states.filter(x => x !== st));
                            else setStates([...states, st]);
                          }}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border-2 ${
                            isSelected 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-outline-variant/10 bg-white hover:border-primary/50 hover:text-primary text-on-surface-variant'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Budget Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Faixa de Orçamento (Valor do Apoio)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Qualquer", "Até R$ 50mil", "R$ 50mil - R$ 150mil", "R$ 150mil+"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setValueRange(val)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all font-body ${
                          valueRange === val ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant/20 hover:border-primary/50 text-on-surface-variant font-medium'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Category Type */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider font-label">Tipo de Edital</label>
                  <div className="flex flex-wrap gap-3">
                    {["Lei Paulo Gustavo", "Aldir Blanc 2", "Fundos Estaduais", "Editais Privados", "Internacionais"].map((t) => {
                      const isChecked = grantTypes.includes(t);
                      return (
                        <label key={t} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full cursor-pointer hover:bg-surface-container transition-all">
                          <input 
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) setGrantTypes([...grantTypes, t]);
                              else setGrantTypes(grantTypes.filter(x => x !== t));
                            }}
                            className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4" 
                            type="checkbox" 
                          />
                          <span className="text-sm font-semibold font-body">{t}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Matching opportunities (Left Column replacement of Channels) */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg font-fill animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                <div className="text-left">
                  <h2 className="text-2xl font-bold font-headline">Editais Correspondentes ({matchingGrants.length})</h2>
                  <p className="text-xs text-on-surface-variant font-body">Oportunidades em tempo real que dão match com as suas preferências ativas.</p>
                </div>
              </div>

              {loadingGrants ? (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto animate-duration-1000"></div>
                  <p className="text-xs text-on-surface-variant font-semibold mt-3 font-body">Buscando editais correspondentes...</p>
                </div>
              ) : matchingGrants.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-outline-variant/30 rounded-2xl p-6">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">find_in_page</span>
                  <p className="text-sm font-bold text-on-surface font-headline mb-1">Nenhum edital correspondente</p>
                  <p className="text-xs text-on-surface-variant font-body max-w-sm mx-auto">Tente flexibilizar os seus filtros (ex: selecionar mais estados ou expandir o orçamento) para receber mais recomendações.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchingGrants.map((grant) => (
                    <Link 
                      href={`/feed`} 
                      key={grant.id}
                      className="p-5 rounded-2xl bg-surface-container-low border border-transparent hover:border-primary/20 transition-all flex flex-col justify-between hover:shadow-md group text-left"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label">{grant.state || 'Nordeste'}</span>
                          {grant.value && (
                            <span className="text-xs font-bold text-primary font-headline">Até R$ {grant.value.toLocaleString('pt-BR')}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors font-headline mb-2 line-clamp-2">{grant.title}</h4>
                        <p className="text-xs text-on-surface-variant font-body line-clamp-3 mb-4">{grant.description}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10 text-[10px] font-bold uppercase tracking-wider text-outline font-label mt-auto">
                        <span>Inscrições até {new Date(grant.deadline).toLocaleDateString('pt-BR')}</span>
                        <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Section (Right Column) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* 1. Save Panel */}
            <div className="bg-primary-container p-8 rounded-xl text-on-primary-container shadow-lg flex flex-col gap-4 text-left">
              <h3 className="text-xl font-bold mb-2 font-headline">Salvar Configurações</h3>
              <p className="text-sm opacity-90 mb-4 font-medium font-body">Suas preferências serão atualizadas instantaneamente em nossa rede de monitoramento.</p>
              <button 
                onClick={handleSavePreferences}
                disabled={saving}
                className="w-full bg-on-primary-container text-surface-container-lowest py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-md font-label uppercase tracking-wide disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Salvar Preferências'}
              </button>
            </div>

            {/* 2. Channels (Moved from Left Column in place of status) */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary p-2 bg-secondary/10 rounded-lg">notifications_active</span>
                <h2 className="text-xl font-bold font-headline">Canais de Notificação</h2>
              </div>
              <div className="space-y-4">
                {[
                  { id: 'Email', icon: 'mail', sub: 'Resumo diário' },
                  { id: 'WhatsApp', icon: 'chat', sub: 'Alertas instantâneos' },
                  { id: 'Push', icon: 'notifications', sub: 'Notificações no navegador' },
                ].map((c) => {
                  const isActive = channels.includes(c.id);
                  return (
                    <div key={c.id} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-secondary">{c.icon}</span>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-on-surface font-headline">{c.id}</h4>
                          <p className="text-[10px] text-on-surface-variant font-body">{c.sub}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (isActive) setChannels(channels.filter(x => x !== c.id));
                          else setChannels([...channels, c.id]);
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-secondary' : 'bg-slate-300'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
