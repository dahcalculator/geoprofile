import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Acceptable telemetry usage policies and research boundaries.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-6 text-slate-300 text-sm leading-relaxed">
      <Link href="/" className="text-xs text-indigo-400 hover:underline mb-6 inline-block font-mono">
        ← Return to Analytics Dashboard
      </Link>
      <h1 className="text-3xl font-extrabold text-white mb-2">Terms and Conditions of Service</h1>
      <p className="text-xs font-mono text-slate-400 mb-8">Effective: September 19, 2026</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">1. Permitted Use</h2>
          <p>
            This software is licensed for internal UX research, market demographic simulation, and data plausibility auditing.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-2">2. Fraud Prevention & Compliance</h2>
          <p>
            Users agree not to use generated synthetic personas to commit fraud on incentivized survey networks or violate third-party Terms of Service.
          </p>
        </div>
      </section>
    </main>
  );
}