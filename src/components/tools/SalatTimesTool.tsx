"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Gujranwala",
  "Bahawalpur",
];

type Times = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type AladhanResponse = {
  data: {
    timings: Times;
    date: {
      readable: string;
      hijri: { date: string; month: { en: string }; year: string };
    };
  };
};

const PRAYER_LABELS: { key: keyof Times; nameUr: string; name: string }[] = [
  { key: "Fajr", nameUr: "فجر", name: "Fajr" },
  { key: "Sunrise", nameUr: "طلوع آفتاب", name: "Sunrise" },
  { key: "Dhuhr", nameUr: "ظہر", name: "Zuhr" },
  { key: "Asr", nameUr: "عصر", name: "Asr" },
  { key: "Maghrib", nameUr: "مغرب", name: "Maghrib" },
  { key: "Isha", nameUr: "عشاء", name: "Isha" },
];

function fmtTime(t: string): string {
  // "05:23" → "5:23 AM"
  const [h, m] = t.split(":").map((s) => parseInt(s));
  if (isNaN(h) || isNaN(m)) return t;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function SalatTimesTool() {
  const [city, setCity] = useState("Karachi");
  const [data, setData] = useState<AladhanResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTimes(c: string) {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(c)}&country=Pakistan&method=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = (await res.json()) as AladhanResponse;
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTimes(city);
  }, [city]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Choose your city</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {PAKISTANI_CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                city === c
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-bg-elevated text-fg-muted hover:border-border-soft hover:text-fg"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
          {error}{" "}
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={() => fetchTimes(city)}
          >
            Retry
          </Button>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-border bg-bg-card p-12 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-fg-muted" />
        </div>
      )}

      {data && !loading && (
        <>
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-6">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-fg-subtle">
                  Today, {city}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  {data.date.readable}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-fg-subtle flex items-center gap-1 justify-end">
                  <Calendar className="h-3 w-3" /> Hijri
                </p>
                <p className="font-urdu text-lg mt-1">
                  {data.date.hijri.date} {data.date.hijri.month.en}{" "}
                  {data.date.hijri.year}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PRAYER_LABELS.map((p) => (
              <div
                key={p.key}
                className="rounded-2xl border border-border bg-bg-card p-5"
              >
                <p className="font-urdu text-lg text-fg-muted">{p.nameUr}</p>
                <p className="mt-1 font-display text-base font-semibold">
                  {p.name}
                </p>
                <div className="mt-3 flex items-center gap-2 text-primary">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono text-base font-semibold">
                    {fmtTime(data.timings[p.key])}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-fg-subtle">
            Powered by{" "}
            <a
              href="https://aladhan.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Aladhan
            </a>{" "}
            · Method: Karachi (University of Islamic Sciences)
          </p>
        </>
      )}
    </div>
  );
}
