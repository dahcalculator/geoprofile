import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Enterprise licensing refund terms.',
};

export default function RefundPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-6 text-slate-300 text-sm leading-relaxed">
      <Link href="/" className="text-xs text-indigo-400 hover:underline mb-6 inline-block font-mono">
        ← Return to Analytics Dashboard
      </Link>
      <h1 className="text-3xl font-extrabold text-white mb-2">Refund & Cancellation Policy</h1>
      <p className="text-xs font-mono text-slate-400 mb-8">Effective: September 19, 2026</p>

      <p>
        Free public analytics access requires no payment. For dedicated enterprise API tier subscriptions, refund requests submitted within 14 days of activation will be granted if service uptime falls below 99.5%.
      </p>
    </main>
  );
}