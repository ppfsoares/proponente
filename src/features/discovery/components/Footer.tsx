import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-20">
      <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
        <span className="font-bold text-slate-900 dark:text-white text-lg font-headline">Alerta Cultura</span>
        <p className="text-slate-500 text-sm font-body">© 2024 Alerta Cultura - Monitoramento Inteligente Nordeste</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        {["Termos", "Privacidade", "Contato", "Sobre"].map((item) => (
          <Link 
            key={item} 
            href="#" 
            className="text-sm text-slate-500 hover:underline hover:text-primary transition-colors font-medium font-body"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-xl">share</span>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-xl">mail</span>
        </a>
      </div>
    </footer>
  );
};
