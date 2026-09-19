'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('geopersona_consent_status');
    if (!consent) setShowBanner(true);
  }, []);

  const handleConsent = (level: 'essential' | 'full') => {
    localStorage.setItem('geopersona_consent_status', level);
    localStorage.setItem('geopersona_consent_timestamp', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Consent"
      role="region"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-2xl backdrop-blur-md"
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-white">Data Processing & Telemetry Consent</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          We process IP telemetry to estimate demographic regional models in-memory. Review our{' '}
          <Link href="/privacy" className="text-indigo-400 underline hover:text-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/cookies" className="text-indigo-400 underline hover:text-indigo-300 focus:ring-2 focus:ring-indigo-500 rounded">
            Cookie Notice
          </Link>.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => handleConsent('full')}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            Accept All
          </button>
          <button
            onClick={() => handleConsent('essential')}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-600 transition-colors focus:ring-2 focus:ring-slate-400 focus:outline-none"
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
}