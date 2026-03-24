import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  DollarSign,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  Save,
  ChevronLeft,
  Building2,
  Briefcase,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { supabase } from './lib/supabase';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Descobrir', href: '/' },
    { name: 'Oportunidades', href: '/oportunidades' },
    { name: 'Planos', href: '/planos' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 glass-effect border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">A</div>
              <span className="text-xl font-headline font-bold text-primary tracking-tight">Alerta Cultura</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/alertas" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Bell size={20} />
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/50 hover:border-primary transition-all">
                    <User size={18} className="text-primary" />
                    <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-outline-variant/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                    <Link to="/perfil" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-container rounded-lg transition-colors">
                      <UserCircle size={18} />
                      Meu Perfil
                    </Link>
                    <Link to="/alertas" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-surface-container rounded-lg transition-colors">
                      <Bell size={18} />
                      Meus Alertas
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <LogOut size={18} />
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-on-surface">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-on-surface hover:bg-surface-container rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/alertas" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-on-surface">Meus Alertas</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-4 text-base font-medium text-error">Sair</button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-4 bg-primary text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Começar agora
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const LandingPage = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              O Nordeste Cultural em um só lugar
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-black text-on-surface mb-6 leading-[1.1]">
              Não perca mais nenhum <br />
              <span className="text-gradient">edital de cultura</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              Monitoramos centenas de fontes para você focar no que importa: sua arte. Receba alertas personalizados via WhatsApp e E-mail.
            </p>

            <div className="max-w-xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl">
                <Search className="ml-4 text-outline" size={20} />
                <input 
                  type="text" 
                  placeholder="Busque por editais, estados ou categorias..." 
                  className="flex-1 px-4 py-3 outline-none text-on-surface font-medium"
                />
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
                  Buscar
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-on-surface-variant">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-secondary" />
                <span>+500 editais ativos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-secondary" />
                <span>Alertas em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-secondary" />
                <span>Todos os estados do NE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-outline-variant shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <LayoutDashboard size={32} />
              </div>
              <ChevronRight className="text-outline group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Painel Inteligente</h3>
            <p className="text-on-surface-variant">Visualize todas as oportunidades filtradas pelo seu perfil. Nossa IA sugere os editais com maior probabilidade de aprovação.</p>
          </div>

          <div className="bg-gradient-brand rounded-3xl p-8 text-white shadow-lg shadow-primary/20">
            <div className="p-3 bg-white/20 rounded-2xl w-fit mb-12">
              <Bell size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Alertas Instantâneos</h3>
            <p className="text-white/80">Seja o primeiro a saber. Receba notificações no WhatsApp assim que um edital for publicado.</p>
          </div>

          <div className="bg-secondary text-white rounded-3xl p-8 shadow-lg shadow-secondary/20">
            <div className="p-3 bg-white/20 rounded-2xl w-fit mb-12">
              <MapPin size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Foco no Nordeste</h3>
            <p className="text-white/80">Cobertura completa de Alagoas à Bahia. Editais municipais, estaduais e federais específicos para a região.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const PricingPage = () => {
  const plans = [
    {
      name: 'Proponente',
      price: 'R$ 29',
      description: 'Para artistas e produtores individuais',
      features: ['Alertas ilimitados', 'Filtros por área', 'Histórico de editais', 'Suporte via E-mail'],
      color: 'primary'
    },
    {
      name: 'Mentor',
      price: 'R$ 89',
      description: 'Para consultores e captadores',
      features: ['Painel multi-cliente', 'Relatórios de mercado', 'Destaque no marketplace', 'Suporte prioritário'],
      color: 'secondary',
      popular: true
    },
    {
      name: 'Gestor Gov',
      price: 'Sob consulta',
      description: 'Para prefeituras e secretarias',
      features: ['Divulgação ativa', 'Métricas de alcance', 'Integração via API', 'Gestão de inscritos'],
      color: 'on-surface'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-headline font-black mb-4">Planos que cabem no seu projeto</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">Escolha o plano ideal para impulsionar sua carreira cultural no Nordeste.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-3xl border transition-all hover:scale-[1.02] ${
              plan.popular ? 'border-secondary bg-white shadow-2xl ring-4 ring-secondary/5' : 'border-outline-variant bg-surface-container-lowest'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Mais Popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.price !== 'Sob consulta' && <span className="text-on-surface-variant">/mês</span>}
            </div>
            <p className="text-sm text-on-surface-variant mb-8">{plan.description}</p>
            
            <ul className="space-y-4 mb-10">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-secondary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
              plan.popular ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-on-surface text-white hover:bg-on-surface/90'
            }`}>
              Começar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const OpportunitiesPage = () => {
  const [grants, setGrants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/grants')
      .then(res => res.json())
      .then(data => {
        setGrants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-headline font-black mb-2">Central de Oportunidades</h2>
          <p className="text-on-surface-variant">Explore editais abertos em todo o Nordeste.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-outline-variant rounded-xl font-medium">
            <Filter size={18} />
            Filtros
          </button>
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-xl outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-surface-container animate-pulse rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grants.length > 0 ? grants.map((grant) => (
            <motion.div 
              key={grant.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface-variant">
                  {grant.category}
                </span>
                {grant.isUrgent && (
                  <span className="flex items-center gap-1 text-error text-xs font-bold">
                    <AlertCircle size={14} />
                    Urgente
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3 line-clamp-2">{grant.title}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <MapPin size={16} />
                  <span>{grant.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Calendar size={16} />
                  <span>Inscrições até {new Date(grant.deadline).toLocaleDateString()}</span>
                </div>
                {grant.value && (
                  <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                    <DollarSign size={16} />
                    <span>Até R$ {grant.value.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <Link 
                to={`/oportunidades/${grant.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-surface-container hover:bg-primary hover:text-white rounded-2xl font-bold transition-all"
              >
                Ver Detalhes
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-on-surface-variant">Nenhum edital encontrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const GrantDetailsPage = () => {
  const { id } = useParams();
  const [grant, setGrant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/grants/${id}`)
      .then(res => res.json())
      .then(data => {
        setGrant(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">Carregando...</div>;
  if (!grant) return <div className="max-w-7xl mx-auto px-4 py-20">Edital não encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/oportunidades" className="flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 transition-colors">
        <ChevronLeft size={20} />
        Voltar para oportunidades
      </Link>

      <div className="bg-white rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="bg-gradient-brand p-8 text-white">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-4">{grant.category}</span>
          <h1 className="text-3xl font-headline font-black mb-4">{grant.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{grant.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Até {new Date(grant.deadline).toLocaleDateString()}</span>
            </div>
            {grant.value && (
              <div className="flex items-center gap-2">
                <DollarSign size={18} />
                <span>R$ {grant.value.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Descrição do Edital</h3>
            <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap">{grant.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface-container rounded-2xl">
              <h4 className="font-bold mb-2">Quem pode participar?</h4>
              <p className="text-sm text-on-surface-variant">Artistas, produtores e coletivos culturais residentes no estado de {grant.state}.</p>
            </div>
            <div className="p-6 bg-surface-container rounded-2xl">
              <h4 className="font-bold mb-2">Documentação Necessária</h4>
              <p className="text-sm text-on-surface-variant">Portfólio, comprovante de residência, documentos fiscais e projeto detalhado.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row gap-4">
            <a 
              href={grant.externalUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-center hover:bg-primary/90 transition-all"
            >
              Acessar Site Oficial
            </a>
            <button className="flex-1 bg-secondary text-white py-4 rounded-2xl font-bold hover:bg-secondary/90 transition-all">
              Salvar nos Meus Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    organizationSize: '',
    state: '',
    areas: [] as string[]
  });
  const navigate = useNavigate();

  const states = ['Alagoas', 'Bahia', 'Ceará', 'Maranhão', 'Paraíba', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Sergipe'];
  const areas = ['Música', 'Artes Cênicas', 'Artes Visuais', 'Literatura', 'Audiovisual', 'Patrimônio', 'Cultura Popular', 'Artesanato'];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, userId: user.id })
    });

    if (res.ok) {
      toast.success('Perfil configurado com sucesso!');
      navigate('/alertas');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 flex-1 mx-1 rounded-full transition-all ${step >= i ? 'bg-primary' : 'bg-surface-container'}`}></div>
          ))}
        </div>
        <h2 className="text-3xl font-headline font-black">
          {step === 1 && "Quem é você na cultura?"}
          {step === 2 && "Onde você atua?"}
          {step === 3 && "Quais são seus interesses?"}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'Individual', label: 'Individual / Artista Solo', icon: UserCircle },
                { id: 'Pequeno', label: 'Pequeno Grupo / Coletivo', icon: Briefcase },
                { id: 'Médio/Grande', label: 'Médio ou Grande Porte', icon: Building2 }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, organizationSize: type.id})}
                  className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.organizationSize === type.id ? 'border-primary bg-primary/5' : 'border-outline-variant bg-white'
                  }`}
                >
                  <type.icon size={32} className={formData.organizationSize === type.id ? 'text-primary' : 'text-on-surface-variant'} />
                  <span className="font-bold">{type.label}</span>
                </button>
              ))}
            </div>
            <button 
              disabled={!formData.organizationSize}
              onClick={handleNext}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold disabled:opacity-50"
            >
              Próximo
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {states.map(state => (
                <button
                  key={state}
                  onClick={() => setFormData({...formData, state})}
                  className={`p-4 rounded-xl border-2 transition-all font-medium ${
                    formData.state === state ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant bg-white'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 py-4 bg-surface-container rounded-2xl font-bold">Voltar</button>
              <button 
                disabled={!formData.state}
                onClick={handleNext}
                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-3">
              {areas.map(area => (
                <button
                  key={area}
                  onClick={() => {
                    const newAreas = formData.areas.includes(area) 
                      ? formData.areas.filter(a => a !== area)
                      : [...formData.areas, area];
                    setFormData({...formData, areas: newAreas});
                  }}
                  className={`px-6 py-3 rounded-full border-2 transition-all font-bold text-sm ${
                    formData.areas.includes(area) ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="flex-1 py-4 bg-surface-container rounded-2xl font-bold">Voltar</button>
              <button 
                disabled={formData.areas.length === 0}
                onClick={handleSubmit}
                className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold disabled:opacity-50"
              >
                Finalizar Configuração
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<any[]>([
    { id: 1, name: 'Editais de Música em Pernambuco', active: true },
    { id: 2, name: 'Lei Paulo Gustavo - Audiovisual', active: true }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-headline font-black mb-2">Meus Alertas</h2>
          <p className="text-on-surface-variant">Gerencie suas notificações personalizadas.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20">
          <Plus size={20} />
          Novo Alerta
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-white p-6 rounded-3xl border border-outline-variant flex items-center justify-between group hover:border-primary transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${alert.active ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-outline'}`}>
                <Bell size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{alert.name}</h3>
                <p className="text-sm text-on-surface-variant">Notificando via WhatsApp e E-mail</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <LayoutDashboard size={20} />
              </button>
              <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-surface-container rounded-3xl border border-dashed border-outline-variant text-center">
        <AlertCircle size={32} className="mx-auto text-primary mb-4" />
        <h3 className="font-bold mb-2">Dica Pro</h3>
        <p className="text-on-surface-variant text-sm max-w-md mx-auto">Configure alertas específicos para editais de "Fluxo Contínuo" para nunca perder prazos de prestação de contas.</p>
      </div>
    </div>
  );
};

const LoginPageWithAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: window.location.origin + '/cadastro'
      }
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Link de acesso enviado para seu e-mail!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white p-8 rounded-3xl border border-outline-variant shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary/20">A</div>
          <h2 className="text-2xl font-headline font-black">Bem-vindo</h2>
          <p className="text-on-surface-variant">Acesse sua conta ou crie uma nova.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:border-primary transition-all"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Entrar / Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // In a real app, fetch from /api/profile
        setProfile({
          name: user.email?.split('@')[0],
          email: user.email,
          organizationSize: 'Individual',
          state: 'Pernambuco',
          areas: ['Música', 'Audiovisual']
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-headline font-black mb-8">Meu Perfil</h2>
      
      <div className="bg-white rounded-3xl border border-outline-variant p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-outline-variant">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{profile?.name}</h3>
            <p className="text-on-surface-variant">{profile?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-outline uppercase tracking-wider mb-4">Informações Gerais</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Tipo de Proponente</p>
                <p className="font-medium">{profile?.organizationSize}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Estado de Atuação</p>
                <p className="font-medium">{profile?.state}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-outline uppercase tracking-wider mb-4">Áreas de Interesse</h4>
            <div className="flex flex-wrap gap-2">
              {profile?.areas.map((area: string) => (
                <span key={area} className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold">{area}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold">Editar Perfil</button>
          <button className="flex-1 bg-surface-container py-3 rounded-xl font-bold">Alterar Senha</button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/planos" element={<PricingPage />} />
            <Route path="/oportunidades" element={<OpportunitiesPage />} />
            <Route path="/oportunidades/:id" element={<GrantDetailsPage />} />
            <Route path="/login" element={<LoginPageWithAuth />} />
            <Route path="/cadastro" element={<OnboardingPage />} />
            <Route path="/alertas" element={<AlertsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Routes>
        </main>
        <footer className="bg-surface-container-low border-t border-outline-variant py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-xs">A</div>
              <span className="text-lg font-headline font-bold text-primary">Alerta Cultura</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">© 2026 Alerta Cultura. Todos os direitos reservados. <br /> Feito com ❤️ para o Nordeste.</p>
            <div className="flex justify-center gap-6 text-sm font-medium text-on-surface-variant">
              <a href="#" className="hover:text-primary">Termos</a>
              <a href="#" className="hover:text-primary">Privacidade</a>
              <a href="#" className="hover:text-primary">Contato</a>
            </div>
          </div>
        </footer>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
};

export default App;
