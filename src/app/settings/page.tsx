import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SettingsClient } from "./SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize how Laar AI looks and behaves.",
};

export default function SettingsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Preferences
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Settings
            </h1>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed sm:text-base">
              Customize how Laar AI looks. Your preferences are saved on this
              device and follow you across the site.
            </p>
          </div>

          <SettingsClient />
        </section>
      </main>
      <Footer />
    </>
  );
}
