'use client';

import { useState } from 'react';
import Link from 'next/link';
import { unpackZeroWidth } from '@/lib/steganographyClient';

export default function CovertAuditPage() {
  const [passphrase, setPassphrase] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [inputText, setInputText] = useState('');
  const [auditResult, setAuditResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === 'agogo') {
      setAuthenticated(true);
      document.cookie = "covert_session_auth=agogo; path=/; max-age=3600; SameSite=Strict";
    } else {
      alert('Unauthorized access key.');
    }
  };

  const runVerification = async () => {
    setLoading(true);
    setAuditResult(null);

    const unpacked = unpackZeroWidth(inputText);
    if (!unpacked) {
      setAuditResult({ valid: false, error: 'No zero-width watermark payload detected in input text.' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/verify-watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawEnvelope: unpacked }),
      });
      const data = await res.json();
      setAuditResult(data);
    } catch {
      setAuditResult({ valid: false, error: 'Server verification route unavailable.' });
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <span className="block font-mono text-xs uppercase tracking-widest text-indigo-400">Security Gateway</span>
          <input
            type="password"
            placeholder="Security Passphrase..."
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-white px-3 py-2 rounded focus:outline-none focus:border-indigo-500 font-mono text-sm"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded text-sm transition">
            Authenticate
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl font-bold font-mono text-indigo-400">Forensic Steganography & Signature Auditor</h1>
            <p className="text-xs text-slate-400">Authorized Signer: agogo • Localized Validation Engine Active</p>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition font-mono">
            Return to Public Dashboard →
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste suspected copied survey text or markdown with hidden zero-width watermark here..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={runVerification}
            disabled={loading || !inputText}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2.5 rounded font-medium text-sm transition"
          >
            {loading ? 'Extracting & Verifying...' : 'Verify Cryptographic Signature'}
          </button>
        </div>

        {auditResult && (
          <div className={`p-6 rounded-xl border ${auditResult.valid ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/20 border-rose-500/40 text-rose-300'}`}>
            <h3 className="font-mono text-sm font-bold uppercase mb-2">
              {auditResult.valid ? '🟢 Verified Authentic Signature (Signed by agogo)' : '🔴 Signature Mismatch or Corrupted Payload'}
            </h3>
            <pre className="text-xs bg-black/40 p-4 rounded overflow-x-auto font-mono text-slate-300">
              {JSON.stringify(auditResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}