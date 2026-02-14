import { useState, useEffect } from "react";
import { RotateCcw, DollarSign, PieChart, Activity, Calculator as CalculatorIcon } from "lucide-react";
import { SliderCard } from "@/components/SliderCard";
import { ResultsCard } from "@/components/ResultsCard";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useSaveCalculation } from "@/hooks/use-calculations";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Types
interface CalculatorState {
  lifetimeProfit: number;
  acquisitionBudgetPct: number;
  conversionRatePct: number;
  currency: string;
}

const DEFAULTS: CalculatorState = {
  lifetimeProfit: 5000,
  acquisitionBudgetPct: 50,
  conversionRatePct: 10,
  currency: "₹"
};

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(DEFAULTS);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const saveMutation = useSaveCalculation();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ppc-calculator-state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved state");
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("ppc-calculator-state", JSON.stringify(state));
    }
  }, [state, isInitialized]);

  const handleReset = () => {
    setState(DEFAULTS);
    toast({
      title: "Reset to defaults",
      description: "All values have been restored to their initial state.",
    });
  };

  const updateField = (field: keyof CalculatorState, value: number | string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  // Calculations
  const targetCPA = state.lifetimeProfit * (state.acquisitionBudgetPct / 100);
  const maxCostPerLead = targetCPA * (state.conversionRatePct / 100);
  const profitRetained = state.lifetimeProfit - targetCPA;

  // Function to save current calculation to history (backend)
  const handleSaveToHistory = () => {
    saveMutation.mutate(
      {
        lifetimeProfit: String(state.lifetimeProfit),
        acquisitionBudgetPct: String(state.acquisitionBudgetPct),
        conversionRatePct: String(state.conversionRatePct),
      },
      {
        onSuccess: () => {
          toast({
            title: "Saved!",
            description: "Calculation saved to history.",
          });
        },
      }
    );
  };

  if (!isInitialized) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider"
            >
              <CalculatorIcon className="w-3 h-3" />
              <span>PPC Bidding Tool</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
              Target CPA Calculator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Find your maximum cost per acquisition to stay profitable and scale your campaigns effectively.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CurrencySelector 
              value={state.currency} 
              onChange={(val) => updateField("currency", val)} 
            />
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
              title="Reset defaults"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleSaveToHistory}
              disabled={saveMutation.isPending}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {saveMutation.isPending ? "Saving..." : "Save Result"}
            </button>
          </div>
        </header>

        {/* Input Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SliderCard
            title="Lifetime Profit"
            helperText="Average net profit you expect from a single customer over their entire relationship lifespan."
            value={state.lifetimeProfit}
            min={500}
            max={100000}
            step={100}
            prefix={state.currency}
            icon={DollarSign}
            onChange={(val) => updateField("lifetimeProfit", val)}
            colorClass="text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
          />
          
          <SliderCard
            title="Acquisition Budget"
            helperText="Percentage of your lifetime profit you are willing to spend to acquire a new customer."
            value={state.acquisitionBudgetPct}
            min={5}
            max={100}
            step={1}
            suffix="%"
            icon={PieChart}
            onChange={(val) => updateField("acquisitionBudgetPct", val)}
            colorClass="text-blue-400 bg-blue-400/10 border-blue-400/20"
          />
          
          <SliderCard
            title="Conversion Rate"
            helperText="Percentage of leads or clicks that convert into actual paying customers on your site."
            value={state.conversionRatePct}
            min={1}
            max={100}
            step={1}
            suffix="%"
            icon={Activity}
            onChange={(val) => updateField("conversionRatePct", val)}
            colorClass="text-purple-400 bg-purple-400/10 border-purple-400/20"
          />
        </div>

        {/* Results Section */}
        <ResultsCard
          targetCPA={targetCPA}
          maxCostPerLead={maxCostPerLead}
          profitRetained={profitRetained}
          currencySymbol={state.currency}
        />

        {/* Formula Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 border-t border-white/5"
        >
          <p className="text-sm font-mono text-muted-foreground/60">
            Formula: Target CPA = Lifetime Profit × Acquisition Budget %
          </p>
        </motion.div>
      </div>
    </div>
  );
}
