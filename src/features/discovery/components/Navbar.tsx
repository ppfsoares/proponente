'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { label: "Descobrir", href: "/" },
    { label: "Alertas", href: "/alertas" },
    { label: "Oportunidades", href: "/feed" },
    { label: "Planos", href: "/planos" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full glass bg-surface-container-low transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-2xl font-black tracking-tighter text-transparent font-headline">
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

        <div className="flex items-center gap-4">
          <Link 
            href="/login"
            className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-2.5 rounded-full font-bold hover:scale-95 transition-transform duration-150 shadow-md shadow-primary/20 text-sm font-label uppercase tracking-wider"
          >
            Entrar
          </Link>
          <button className="md:hidden text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
