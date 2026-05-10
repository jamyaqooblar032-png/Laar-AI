"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowRightLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CURRENCIES = [
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
];

type RatesResponse = {
  result: string;
  base_code?: string;
  rates: Record<string, number>;
};

export function CurrencyConverterTool() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  async function fetchRate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = (await res.json()) as RatesResponse & {
        time_last_update_utc?: string;
      };
      const r = data.rates?.[to];
      if (!r) throw new Error("Rate not available");
      setRate(r);
      setUpdatedAt(data.time_last_update_utc ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  const result = rate && amount ? parseFloat(amount) * rate : null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="text-sm font-medium mb-3">Amount</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-border bg-bg p-4 font-mono text-2xl font-semibold focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <CurrencyPicker label="From" value={from} onChange={setFrom} />
        <button
          onClick={swap}
          className="mx-auto rounded-full border border-border bg-bg-card p-2.5 text-fg-muted hover:border-primary/40 hover:text-primary"
          title="Swap"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <CurrencyPicker label="To" value={to} onChange={setTo} />
      </div>

      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-8">
        {error ? (
          <div className="text-center">
            <p className="text-red-300 text-sm">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={fetchRate}
            >
              <RefreshCw className="h-3 w-3" /> Retry
            </Button>
          </div>
        ) : loading ? (
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-fg-muted" />
        ) : (
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-fg-subtle">
              Result
            </p>
            <p className="mt-2 font-display text-4xl font-bold">
              {result?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              }) ?? "—"}{" "}
              <span className="text-fg-muted text-2xl font-medium">{to}</span>
            </p>
            {rate && (
              <p className="mt-3 text-sm text-fg-muted">
                1 {from} = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
              </p>
            )}
            {updatedAt && (
              <p className="mt-2 text-xs text-fg-subtle">
                Updated: {new Date(updatedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CurrencyPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card p-4">
      <p className="text-xs uppercase tracking-wider text-fg-subtle mb-2">
        {label}
      </p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none bg-transparent font-medium focus:outline-none cursor-pointer text-base"
        )}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code} className="bg-bg-card">
            {c.flag} {c.code} — {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
