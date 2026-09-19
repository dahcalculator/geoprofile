import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information regarding local storage and cookie usage.',
};

export default function CookiePage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-6 text-slate-300 text-sm leading-relaxed">
      <Link href="/" className="text-xs text-indigo-400 hover:underline mb-6 inline-block font-mono">
        ← Return to Analytics Dashboard
      </Link>
      <h1 className="text-3xl font-extrabold text-white mb-2">Cookie & Local Storage Policy</h1>
      <p className="text-xs font-mono text-slate-400 mb-8">Effective: September 19, 2026</p>

      <p>
        We do not use advertising or behavioral cross-site tracking cookies. We utilize browser LocalStorage solely to record your privacy preferences (<code className="text-indigo-400">geopersona_consent_status</code>).
      </p>
    </main>
  );
}