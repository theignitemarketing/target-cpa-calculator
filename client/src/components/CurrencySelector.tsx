import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

const CURRENCIES = [
  { symbol: "₹", name: "INR" },
  { symbol: "$", name: "USD" },
  { symbol: "€", name: "EUR" },
  { symbol: "£", name: "GBP" },
  { symbol: "AED", name: "AED" },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  
  const selected = CURRENCIES.find(c => c.symbol === value) || CURRENCIES[0];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-muted-foreground hover:text-white outline-none focus:ring-2 focus:ring-primary/20">
          <span>{selected.symbol}</span>
          <span className="text-xs opacity-50">{selected.name}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content className="z-50 min-w-[120px] rounded-xl bg-card border border-white/10 shadow-xl p-1 animate-in fade-in zoom-in-95 duration-200">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.name}
              onClick={() => {
                onChange(currency.symbol);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              <span className="flex items-center gap-2 text-foreground">
                <span className="w-6 text-center font-medium">{currency.symbol}</span>
                <span className="text-muted-foreground text-xs">{currency.name}</span>
              </span>
              {value === currency.symbol && <Check className="w-3 h-3 text-primary" />}
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
