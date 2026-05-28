"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/features/discovery/components/Navbar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { checkUserProfile } from "@/features/onboarding/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setCheckingAuth(true);
        try {
          const hasProfile = await checkUserProfile(session.user.id);
          if (hasProfile) {
            router.push("/feed");
          } else {
            router.push("/cadastro");
          }
        } catch (err) {
          console.error("Erro ao verificar perfil:", err);
          setCheckingAuth(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setCheckingAuth(true);
        try {
          const hasProfile = await checkUserProfile(session.user.id);
          if (hasProfile) {
            router.push("/feed");
          } else {
            router.push("/cadastro");
          }
        } catch (err) {
          console.error("Erro ao verificar perfil pós-login:", err);
          setCheckingAuth(false);
        }
      }
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Fallback to window.location.origin if process.env.NEXT_PUBLIC_APP_URL is not set
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
    
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: `${appUrl}/login`
      }
    });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Link de acesso enviado para seu e-mail!");
      setLinkSent(true);
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="grow flex items-center justify-center p-6 bg-surface-container-low">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto animate-duration-1000"></div>
            <p className="text-on-surface-variant font-semibold font-body">Verificando sua conta...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="grow flex items-center justify-center p-6 bg-surface-container-low">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 border border-outline-variant/10">
          {/* Header/Banner */}
          <div className="relative h-48 bg-zinc-900">
            <img 
              alt="Cultural Hub" 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxDQCzWM3s7Tyk3YFN84Cgjlt5xgd4nkmfqclr4Xl8GOD4cjH7Kfkq7wdU3bA0KbaSSONmPxKdLS0dxUAhzGzAIFI7Dr447-mGl0NqYc8XyUovtlzxCYJyilepeFJjDC-5dgxbYmnb3plsccE6oA0t5GUtt8rMN_ci6i2ZMqHNGT9kx3Px8N6FEeh9Bc2-xQD9O8S47dnwGSJL3J8BJui7lLrlTJXp7qXSC6REQ4BfPnH80E7H3kmC4w9itGbIUkG6PNJT-XMqxwPT" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest to-transparent"></div>
          </div>

          <div className="px-10 pb-12 -mt-12 relative z-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight mb-2">Acesso por Link Mágico</h1>
              <p className="text-on-surface-variant font-medium font-body italic text-sm">Digite seu e-mail para receber um link de acesso instantâneo.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 font-label">E-mail</label>
                <div className="relative">
                  <input 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={linkSent}
                    className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all text-on-surface font-semibold font-body disabled:opacity-50" 
                    placeholder="seu@email.com" 
                    type="email" 
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50">alternate_email</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading || linkSent}
                  className="w-full py-5 bg-linear-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-label uppercase tracking-widest text-sm disabled:opacity-70 disabled:hover:scale-100" 
                  type="submit"
                >
                  {loading ? 'Enviando...' : linkSent ? 'Link Enviado!' : 'Entrar com Link Mágico'}
                </button>
              </div>

              {linkSent && (
                <div className="mt-4 p-4 bg-primary/10 rounded-2xl border border-primary/20 text-center flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-primary font-bold">mark_email_read</span>
                  <p className="text-xs font-bold text-primary font-body uppercase tracking-wider">
                    Link enviado! Verifique seu e-mail ({email}).
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
