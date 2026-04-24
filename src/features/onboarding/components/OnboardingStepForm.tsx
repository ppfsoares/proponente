"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Sparkles, MapPin, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "identity",
    title: "Quem é você?",
    subtitle: "Iniciando sua jornada no Alerta Cultura",
    icon: <User className="w-6 h-6" />,
  },
  {
    id: "area",
    title: "Sua Arte",
    subtitle: "Em qual segmento você atua?",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: "location",
    title: "Território",
    subtitle: "Onde você desenvolve seus projetos?",
    icon: <MapPin className="w-6 h-6" />,
  },
];

export function OnboardingStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    type: "individual",
    area: "",
    state: "",
  });

  const next = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-12">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              i <= currentStep ? "bg-primary" : "bg-surface-container"
            )} 
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              {steps[currentStep].icon}
            </div>
            <div>
              <span className="text-secondary text-xs font-bold tracking-widest uppercase mb-1 block">
                Passo {currentStep + 1} de {steps.length}
              </span>
              <h2 className="text-3xl font-display font-bold text-on-surface">
                {steps[currentStep].title}
              </h2>
            </div>
          </div>
          
          <p className="text-on-surface/60 font-medium mb-10">
            {steps[currentStep].subtitle}
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {currentStep === 0 && (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Seu nome completo"
                  className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SelectionCard 
                    active={formData.type === "individual"} 
                    onClick={() => setFormData({...formData, type: "individual"})}
                    label="Artista Individual"
                  />
                  <SelectionCard 
                    active={formData.type === "coletivo"} 
                    onClick={() => setFormData({...formData, type: "coletivo"})}
                    label="Coletivo / Grupo"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {["Teatro", "Música", "Artes Visuais", "Cinema", "Dança", "Literatura"].map(area => (
                  <SelectionCard 
                    key={area}
                    active={formData.area === area} 
                    onClick={() => setFormData({...formData, area})}
                    label={area}
                  />
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                 <select 
                  className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                >
                  <option value="">Selecione seu estado</option>
                  <option value="PE">Pernambuco</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="PB">Paraíba</option>
                </select>
                <div className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10 flex gap-4">
                  <Sparkles className="w-10 h-10 text-secondary shrink-0" />
                  <p className="text-sm text-secondary font-medium leading-relaxed">
                    Personalizamos seus alertas com base no território para garantir que você não perca editais municipais e estaduais do Nordeste.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-10">
              <button 
                type="button"
                onClick={prev}
                className={cn(
                  "p-4 rounded-2xl font-bold flex items-center gap-2 transition-all",
                  currentStep === 0 ? "opacity-0 pointer-events-none" : "text-on-surface/40 hover:text-on-surface"
                )}
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button 
                  type="button"
                  onClick={next}
                  className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  Próximo Passo
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  type="button"
                  className="bg-secondary text-on-secondary px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-all"
                >
                  Finalizar Cadastro
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SelectionCard({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl font-bold text-sm text-left transition-all border-2",
        active 
          ? "bg-white border-primary text-primary shadow-lg shadow-primary/10" 
          : "bg-surface-container-low border-transparent text-on-surface/50 hover:bg-white hover:border-black/10"
      )}
    >
      {label}
    </button>
  );
}
