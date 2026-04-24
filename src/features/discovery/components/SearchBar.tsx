import { Search, MapPin, Filter } from "lucide-react";

export function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
      <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-black/5 flex flex-col md:flex-row items-stretch gap-4 border border-black/[0.01]">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-5 h-5 text-on-surface/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Qual sua área artística? (ex: Teatro, Música...)" 
            className="bg-transparent border-none outline-none w-full text-on-surface font-medium placeholder:text-on-surface/30"
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <MapPin className="w-5 h-5 text-on-surface/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Onde? (ex: Pernambuco, Bahia...)" 
            className="bg-transparent border-none outline-none w-full text-on-surface font-medium placeholder:text-on-surface/30"
          />
        </div>
        <button className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
          <Filter className="w-5 h-5" />
          Explorar
        </button>
      </div>
    </div>
  );
}
