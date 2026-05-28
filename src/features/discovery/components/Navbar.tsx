'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getUserProfile } from "@/features/onboarding/actions";

export const Navbar = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        try {
          const prof = await getUserProfile(session.user.id);
          setProfile(prof);
        } catch (err) {
          console.error("Erro ao carregar perfil na navbar:", err);
        }
      }
    };

    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      if (currentSession) {
        try {
          const prof = await getUserProfile(currentSession.user.id);
          setProfile(prof);
        } catch (err) {
          console.error("Erro ao recarregar perfil na navbar:", err);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.trim().split(" ")[0].charAt(0).toUpperCase();
  };

  const links = [
    { label: "Descobrir", href: "/" },
    ...(session ? [{ label: "Alertas", href: "/alertas" }] : []),
    { label: "Oportunidades", href: "/feed" },
    { label: "Planos", href: "/planos" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full glass bg-surface-container-low transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="bg-linear-to-r from-primary to-primary-container bg-clip-text text-2xl font-black tracking-tighter text-transparent font-headline">
            SOMA ALERTA
          </Link>
          
          <div className="hidden md:flex items-center gap-8 px-4 py-2 rounded-full glass border border-white/10 shadow-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-wide uppercase font-label transition-all hover:text-primary ${
                  pathname === link.href ? "text-primary border-b-2 border-primary pb-0.5" : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          {session ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/10 hover:bg-surface-container-highest transition-all duration-150 font-label font-bold text-on-surface text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                  {getInitials(profile?.name)}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{profile?.name || "Minha Conta"}</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant font-bold transition-transform duration-150" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>keyboard_arrow_down</span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-outline-variant/10 mb-2">
                      <p className="text-xs font-bold text-outline uppercase tracking-wider font-label">Conectado como</p>
                      <p className="text-sm font-bold text-on-surface truncate font-headline">{profile?.name || session.user.email}</p>
                    </div>

                    <Link 
                      href="/feed" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors font-body"
                    >
                      <span className="material-symbols-outlined text-lg text-on-surface-variant">explore</span>
                      Buscar Editais
                    </Link>

                    <Link 
                      href="/alertas" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors font-body"
                    >
                      <span className="material-symbols-outlined text-lg text-on-surface-variant">notifications</span>
                      Meus Alertas
                    </Link>

                    <Link 
                      href="/cadastro" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors font-body"
                    >
                      <span className="material-symbols-outlined text-lg text-on-surface-variant">person</span>
                      Meu Perfil
                    </Link>

                    <div className="h-px bg-outline-variant/10 my-2"></div>

                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-body text-left"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Sair
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link 
              href="/login"
              className="bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-2.5 rounded-full font-bold hover:scale-95 transition-transform duration-150 shadow-md shadow-primary/20 text-sm font-label uppercase tracking-wider"
            >
              Entrar
            </Link>
          )}
          <button className="md:hidden text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
