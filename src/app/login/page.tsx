import { Navbar } from "@/features/discovery/components/Navbar";
import { handleLogin } from "@/features/auth/actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 bg-surface-container-low">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 border border-outline-variant/10">
          {/* Header/Banner */}
          <div className="relative h-48 bg-zinc-900">
            <img 
              alt="Cultural Hub" 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxDQCzWM3s7Tyk3YFN84Cgjlt5xgd4nkmfqclr4Xl8GOD4cjH7Kfkq7wdU3bA0KbaSSONmPxKdLS0dxUAhzGzAIFI7Dr447-mGl0NqYc8XyUovtlzxCYJyilepeFJjDC-5dgxbYmnb3plsccE6oA0t5GUtt8rMN_ci6i2ZMqHNGT9kx3Px8N6FEeh9Bc2-xQD9O8S47dnwGSJL3J8BJui7lLrlTJXp7qXSC6REQ4BfPnH80E7H3kmC4w9itGbIUkG6PNJT-XMqxwPT" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
          </div>

          <div className="px-10 pb-12 -mt-12 relative z-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight mb-2">Bem-vindo de volta</h1>
              <p className="text-on-surface-variant font-medium font-body italic text-sm">A sua conexão com a cultura do Nordeste começa aqui.</p>
            </div>

            <form action={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 font-label">E-mail</label>
                <div className="relative">
                  <input 
                    name="email"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all text-on-surface font-semibold font-body" 
                    placeholder="seu@email.com" 
                    type="email" 
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50">alternate_email</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1 font-label">Senha</label>
                <div className="relative">
                  <input 
                    name="password"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary/20 focus:ring-0 focus:bg-white transition-all text-on-surface font-semibold font-body" 
                    placeholder="••••••••" 
                    type="password" 
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                </div>
                <div className="flex justify-end p-1">
                  <button type="button" className="text-xs font-bold text-primary hover:underline font-label uppercase">Esqueci a senha</button>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-label uppercase tracking-widest text-sm" type="submit">
                  Entrar
                </button>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-grow bg-outline-variant/20"></div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] font-label">Ou</span>
                  <div className="h-px flex-grow bg-outline-variant/20"></div>
                </div>

                <button type="button" className="w-full py-4 border-2 border-outline-variant/20 text-on-surface font-bold rounded-full hover:bg-surface-container-low transition-all flex items-center justify-center gap-3 font-label uppercase tracking-widest text-xs">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                  Continuar com Google
                </button>
              </div>

              <p className="text-center mt-8 text-sm font-medium text-on-surface-variant font-body">
                Não tem uma conta? <a href="/cadastro" className="text-primary font-bold hover:underline">Cadastre-se agora</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
