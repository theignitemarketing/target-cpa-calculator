import { motion } from "framer-motion";
import { Target, TrendingUp, Users } from "lucide-react";

interface ResultsCardProps {
  targetCPA: number;
  maxCostPerLead: number;
  profitRetained: number;
  currencySymbol: string;
}

export function ResultsCard({ 
  targetCPA, 
  maxCostPerLead, 
  profitRetained,
  currencySymbol 
}: ResultsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-8 glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Main Result */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Your Target CPA</span>
          </div>
          
          <div>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 tracking-tight">
              {currencySymbol}{targetCPA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="mt-4 text-muted-foreground text-lg">
              Maximum you should pay to acquire a single customer while hitting your profit goals.
            </p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="flex flex-col gap-6 pl-0 md:pl-10 md:border-l border-white/10">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-xl bg-background/50 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Max Cost Per Lead</p>
              <p className="text-2xl font-bold text-white">
                {currencySymbol}{maxCostPerLead.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-3 rounded-xl bg-background/50 text-green-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Profit Retained Per Customer</p>
              <p className="text-2xl font-bold text-white">
                {currencySymbol}{profitRetained.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
