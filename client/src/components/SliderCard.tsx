import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface SliderCardProps {
  title: string;
  helperText: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
  icon: LucideIcon;
  colorClass?: string;
}

export function SliderCard({
  title,
  helperText,
  value,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  onChange,
  icon: Icon,
  colorClass = "text-primary"
}: SliderCardProps) {
  // Calculate percentage for background gradient of slider track
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold font-display text-white/90">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-[90%]">{helperText}</p>
        </div>
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold font-display tracking-tight text-white">
            {prefix}{value.toLocaleString()}{suffix}
          </span>
        </div>

        <div className="relative w-full h-8 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full absolute z-20 opacity-0 cursor-pointer h-8"
          />
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden relative z-10">
            <div 
              className="h-full bg-primary transition-all duration-75 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div 
            className="absolute h-6 w-6 bg-primary rounded-full shadow-lg shadow-primary/30 border-2 border-background z-10 pointer-events-none transition-all duration-75 ease-out"
            style={{ left: `calc(${percentage}% - 12px)` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>{prefix}{min}{suffix}</span>
          <span>{prefix}{max}{suffix}</span>
        </div>
      </div>
    </motion.div>
  );
}
