"use client";

import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Unit = { id: string; label: string; toBase: number };
type Category = { id: string; label: string; base: string; units: Unit[] };

const CATEGORIES: Category[] = [
  {
    id: "length",
    label: "Length",
    base: "m",
    units: [
      { id: "m", label: "Meter (m)", toBase: 1 },
      { id: "km", label: "Kilometer (km)", toBase: 1000 },
      { id: "cm", label: "Centimeter (cm)", toBase: 0.01 },
      { id: "mm", label: "Millimeter (mm)", toBase: 0.001 },
      { id: "in", label: "Inch (in)", toBase: 0.0254 },
      { id: "ft", label: "Foot (ft)", toBase: 0.3048 },
      { id: "yd", label: "Yard (yd)", toBase: 0.9144 },
      { id: "mi", label: "Mile (mi)", toBase: 1609.34 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    base: "kg",
    units: [
      { id: "kg", label: "Kilogram (kg)", toBase: 1 },
      { id: "g", label: "Gram (g)", toBase: 0.001 },
      { id: "mg", label: "Milligram (mg)", toBase: 0.000001 },
      { id: "lb", label: "Pound (lb)", toBase: 0.453592 },
      { id: "oz", label: "Ounce (oz)", toBase: 0.0283495 },
      { id: "tola", label: "Tola (PK/IN)", toBase: 0.0116638 },
      { id: "maund", label: "Maund (PK)", toBase: 37.3242 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    base: "C",
    units: [
      { id: "C", label: "Celsius (°C)", toBase: 1 },
      { id: "F", label: "Fahrenheit (°F)", toBase: 1 },
      { id: "K", label: "Kelvin (K)", toBase: 1 },
    ],
  },
  {
    id: "area",
    label: "Area",
    base: "m2",
    units: [
      { id: "m2", label: "Square meter (m²)", toBase: 1 },
      { id: "km2", label: "Square km (km²)", toBase: 1_000_000 },
      { id: "ft2", label: "Square foot (ft²)", toBase: 0.092903 },
      { id: "marla", label: "Marla (PK)", toBase: 25.293 },
      { id: "kanal", label: "Kanal (PK)", toBase: 505.857 },
      { id: "acre", label: "Acre", toBase: 4046.86 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    base: "l",
    units: [
      { id: "l", label: "Liter (L)", toBase: 1 },
      { id: "ml", label: "Milliliter (mL)", toBase: 0.001 },
      { id: "m3", label: "Cubic meter (m³)", toBase: 1000 },
      { id: "gal", label: "Gallon (US)", toBase: 3.78541 },
      { id: "cup", label: "Cup", toBase: 0.24 },
    ],
  },
];

function convert(value: number, from: Unit, to: Unit, catId: string): number {
  if (catId === "temperature") {
    let celsius: number;
    if (from.id === "C") celsius = value;
    else if (from.id === "F") celsius = (value - 32) * (5 / 9);
    else celsius = value - 273.15;

    if (to.id === "C") return celsius;
    if (to.id === "F") return celsius * (9 / 5) + 32;
    return celsius + 273.15;
  }
  return (value * from.toBase) / to.toBase;
}

export function UnitConverterTool() {
  const [catId, setCatId] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === catId)!;
  const [from, setFrom] = useState(cat.units[0].id);
  const [to, setTo] = useState(cat.units[1].id);
  const [val, setVal] = useState("1");

  function changeCategory(newCatId: string) {
    const c = CATEGORIES.find((x) => x.id === newCatId)!;
    setCatId(newCatId);
    setFrom(c.units[0].id);
    setTo(c.units[1].id);
  }

  const fromUnit = cat.units.find((u) => u.id === from) ?? cat.units[0];
  const toUnit = cat.units.find((u) => u.id === to) ?? cat.units[1];
  const result = convert(parseFloat(val) || 0, fromUnit, toUnit, catId);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="text-sm font-medium mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => changeCategory(c.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                catId === c.id
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-bg-elevated text-fg-muted hover:text-fg"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="rounded-2xl border border-border bg-bg-card p-4">
          <p className="text-xs uppercase tracking-wider text-fg-subtle mb-2">
            From
          </p>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full mb-3 bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            {cat.units.map((u) => (
              <option key={u.id} value={u.id} className="bg-bg-card">
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg p-3 font-mono text-xl font-semibold focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto rounded-full border border-border bg-bg-card p-3 text-fg-muted hover:border-primary/40 hover:text-primary"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-xs uppercase tracking-wider text-fg-subtle mb-2">
            To
          </p>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full mb-3 bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            {cat.units.map((u) => (
              <option key={u.id} value={u.id} className="bg-bg-card">
                {u.label}
              </option>
            ))}
          </select>
          <p className="font-mono text-xl font-semibold rounded-xl border border-border bg-bg p-3">
            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </p>
        </div>
      </div>
    </div>
  );
}
