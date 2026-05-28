import Link from "next/link";
import { Navbar } from "@/features/discovery/components/Navbar";
import { Footer } from "@/features/discovery/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      
      <main className="grow flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-primary font-headline mb-4">404</h1>
          <h2 className="text-3xl font-bold text-on-surface font-headline mb-6">Página não encontrada</h2>
          <p className="text-on-surface-variant font-body mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary rounded-full font-bold uppercase tracking-wide hover:opacity-90 transition-all font-label"
          >
            Voltar para o Início
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
