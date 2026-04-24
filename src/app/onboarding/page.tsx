import { OnboardingStepForm } from "@/features/onboarding/components/OnboardingStepForm";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold font-display tracking-tight text-on-surface">
            Soma<span className="text-primary italic">Alerta</span>
          </Link>
          <div className="text-sm font-bold text-on-surface/40">
            PASSO A PASSO
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-[1.2fr_1fr] gap-20 items-center">
          <section>
            <h1 className="text-5xl font-display font-black text-on-surface mb-6 leading-tight">
              Vamos construir seu <br /> 
              <span className="text-primary">Perfil Criativo.</span>
            </h1>
            <p className="text-lg text-on-surface/50 font-medium leading-relaxed mb-8">
              Isso ajuda nossa IA a filtrar os editais mais compatíveis com seu trabalho e território.
            </p>
            <div className="space-y-4">
              <BenefitItem text="Notificações em tempo real" />
              <BenefitItem text="Checklist simplificado de documentos" />
              <BenefitItem text="Sugestões exclusivas de fomento" />
            </div>
          </section>

          <OnboardingStepForm />
        </div>
      </main>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-on-surface/70 font-bold text-sm">
      <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
      </div>
      {text}
    </div>
  );
}
