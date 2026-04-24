'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();

  const items = [
    { label: "Início", icon: "explore", href: "/" },
    { label: "Alertas", icon: "notifications", href: "/alertas" },
    { label: "Match IA", icon: "psychology", href: "/match", activeIcon: true },
    { label: "Perfil", icon: "person", href: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)] z-50 rounded-t-3xl">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isMatchIA = item.label === "Match IA";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all ${
              isMatchIA
                ? "bg-primary/10 dark:bg-primary/20 text-primary rounded-2xl px-5 py-2 scale-90"
                : isActive
                ? "text-primary px-5 py-2"
                : "text-slate-500 dark:text-slate-400 px-5 py-2 hover:text-primary"
            }`}
          >
            <span 
              className={`material-symbols-outlined ${item.activeIcon || isActive ? "fill-1" : ""}`}
              style={item.activeIcon || isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-bold font-headline mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
