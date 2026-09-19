'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { calculateDemographics, auditPlausibility } from '@/lib/demographicEngine';
import { packToZeroWidth } from '@/lib/steganographyClient';

// Strict IPv4 validation (0-255 per octet)
const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Full IPv6 validation (including compressed :: notation and IPv4-mapped forms)
const IPV6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/;

type IpProtocol = 'IPv4' | 'IPv6' | null;

function detectProtocol(address: string): IpProtocol {
  const trimmed = address.trim();
  if (IPV4_REGEX.test(trimmed)) return 'IPv4';
  if (IPV6_REGEX.test(trimmed)) return 'IPv6';
  return null;
}

function isValidIpAddress(address: string): boolean {
  return IPV4_REGEX.test(address) || IPV6_REGEX.test(address);
}

export default function HomePage() {
  const router = useRouter();
  const ipInputRef = useRef<HTMLInputElement>(null);

  const [age, setAge] = useState(34);
  const [ip, setIp] = useState('102.89.23.11');
  const [loading, setLoading] = useState(false);
  const [ipError, setIpError] = useState<string | null>(null);
  const [copiedIp, setCopiedIp] = useState(false);
  const [copyingSummary, setCopyingSummary] = useState(false);

  const [geo, setGeo] = useState({
    city: 'Abuja',
    country: 'Nigeria',
    code: 'NG',
    isp: 'MTN Nigeria Communications',
    asn: 'AS29465',
  });

  const detectedProtocol = detectProtocol(ip);

  // 1. Geolocation Fetcher
  const fetchGeolocation = useCallback(async (targetIp?: string) => {
    setLoading(true);
    setIpError(null);
    try {
      const url = targetIp 
        ? `/api/geolocate?ip=${encodeURIComponent(targetIp)}` 
        : '/api/geolocate';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        if (!targetIp) {
          setIp(data.ip);
        }
        setGeo({
          city: data.city,
          country: data.country,
          code: data.countryCode,
          isp: data.isp,
          asn: data.asn,
        });
      } else {
        setIpError('Unable to map region for this IP.');
      }
    } catch (err) {
      console.error('Failed to resolve IP telemetry:', err);
      setIpError('Network error resolving location.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Initial Mount: Autodetect client's incoming IP
  useEffect(() => {
    fetchGeolocation();
  }, [fetchGeolocation]);

  // 3. Debounce & Dual-Protocol Validation Effect
  useEffect(() => {
    if (!ip || ip.trim() === '') {
      setIpError(null);
      return;
    }

    const trimmedIp = ip.trim();

    if (!isValidIpAddress(trimmedIp)) {
      const isLikelyIpv4 = trimmedIp.includes('.');
      const isLikelyIpv6 = trimmedIp.includes(':');

      if (isLikelyIpv4 && (trimmedIp.match(/\./g) || []).length >= 3 && trimmedIp.length >= 7) {
        setIpError('Invalid IPv4 address format (e.g. 102.89.23.11)');
      } else if (isLikelyIpv6 && (trimmedIp.match(/:/g) || []).length >= 2 && trimmedIp.length >= 3) {
        setIpError('Invalid IPv6 address format (e.g. 2001:db8::1)');
      } else {
        setIpError(null);
      }
      return;
    }

    setIpError(null);
    const timer = setTimeout(() => {
      fetchGeolocation(trimmedIp);
    }, 500);

    return () => clearTimeout(timer);
  }, [ip, fetchGeolocation]);

  // 4. Covert Hotkey & Sequence Detection ('agogo' or Ctrl+Shift+Alt+A)
  useEffect(() => {
    let typed = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        router.push('/covert-audit?key=agogo');
        return;
      }
      if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        typed += e.key.toLowerCase();
        if (typed.length > 5) typed = typed.slice(-5);
        if (typed === 'agogo') {
          router.push('/covert-audit?key=agogo');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleClearIp = () => {
    setIp('');
    setIpError(null);
    ipInputRef.current?.focus();
  };

  const handleCopyIp = async () => {
    if (!ip) return;
    try {
      await navigator.clipboard.writeText(ip.trim());
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    } catch (err) {
      console.error('Failed to copy IP address:', err);
    }
  };

  const profile = calculateDemographics(ip, age, geo);
  const audit = auditPlausibility(profile);

  const copyMarkdownWithWatermark = async () => {
    setCopyingSummary(true);
    const summary = `# Demographic Survey Profile\nLocation: ${profile.city}, ${profile.country}\nAge: ${profile.age}\nEducation: ${profile.education.degree}\nGross Income: ${profile.finance.gross}\nPrimary ISP: ${profile.isp}`;

    try {
      const rawPayload = `UID:GP-NEXT-${Date.now().toString().slice(-4)}::IP:${profile.ip}::TS:${new Date().toISOString()}`;
      const res = await fetch('/api/sign-watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: rawPayload }),
      });
      const data = await res.json();

      if (data.signature) {
        const envelope = `${rawPayload}::HMAC:${data.signature}`;
        const zwWatermark = packToZeroWidth(envelope);
        await navigator.clipboard.writeText(`${summary}${zwWatermark}`);
        alert('Demographic Profile copied to clipboard with invisible signature.');
      }
    } catch {
      await navigator.clipboard.writeText(summary);
      alert('Profile copied (standard format).');
    } finally {
      setCopyingSummary(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-4">
        <div className="flex items-center space-x-3 select-none">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold font-mono text-white shadow-lg shadow-indigo-600/30">
            GP
          </div>
          <div>
            <h1 className="font-bold tracking-wide text-white text-base sm:text-lg">GeoPersona Analytics</h1>
            <p className="text-xs text-slate-400">Macroeconomic Workforce & Network Telemetry Engine</p>
          </div>
        </div>

        <button
          onClick={copyMarkdownWithWatermark}
          disabled={copyingSummary}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition focus-visible:ring-2 focus-visible:ring-indigo-400 focus:outline-none"
        >
          {copyingSummary ? 'Signing...' : 'Copy Markdown'}
        </button>
      </header>

      {/* Primary Calibration Controls */}
      <section aria-labelledby="controls-heading" className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 id="controls-heading" className="sr-only">Demographic Determinant Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="age-range" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Respondent Age:
              </label>
              <span className="text-sm font-bold font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 px-2.5 py-0.5 rounded-full">
                {age} Years Old
              </span>
            </div>
            <input
              id="age-range"
              type="range"
              min="18"
              max="85"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Interactive Dual-Protocol IP Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="ip-input" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Target IP Address:
              </label>
              {loading && (
                <span className="text-xs text-indigo-400 font-mono animate-pulse flex items-center gap-1.5" aria-live="polite">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" /> Resolving Telemetry...
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <input
                ref={ipInputRef}
                id="ip-input"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="e.g. 102.89.23.11 or 2001:db8::1"
                className={`w-full bg-slate-950 border ${
                  ipError
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-slate-700 focus:border-indigo-500'
                } text-slate-100 text-sm font-mono pl-3.5 pr-56 py-2 rounded-xl focus:outline-none transition`}
              />

              {/* Action Tray */}
              <div className="absolute right-2 flex items-center gap-1.5">
                {/* Clear (X) Button */}
                {ip.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearIp}
                    title="Clear IP address"
                    aria-label="Clear current IP address"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 active:bg-slate-900 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}

                {/* Protocol Badge with Hover Tooltip */}
                {detectedProtocol && (
                  <div className="relative group flex items-center">
                    <button
                      type="button"
                      tabIndex={0}
                      aria-label={`Protocol: ${detectedProtocol}. ISP: ${geo.isp}, ASN: ${geo.asn}`}
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border tracking-tight cursor-help focus:outline-none transition-colors ${
                        detectedProtocol === 'IPv4'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60'
                          : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30 hover:border-cyan-400/60'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          detectedProtocol === 'IPv4' ? 'bg-emerald-400' : 'bg-cyan-400'
                        }`}
                        aria-hidden="true"
                      />
                      {detectedProtocol}
                    </button>

                    <div
                      role="tooltip"
                      className="absolute bottom-full right-0 mb-2 hidden group-hover:flex group-focus-within:flex flex-col w-56 p-2.5 bg-slate-900/95 border border-slate-700/90 rounded-xl shadow-2xl backdrop-blur-md z-30 pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
                    >
                      <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-800">
                        <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                          Network Carrier
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                            detectedProtocol === 'IPv4'
                              ? 'bg-emerald-950 text-emerald-400'
                              : 'bg-cyan-950 text-cyan-400'
                          }`}
                        >
                          {detectedProtocol}
                        </span>
                      </div>

                      <div className="space-y-1 text-left">
                        <p className="text-xs font-semibold text-slate-100 truncate" title={geo.isp}>
                          {geo.isp || 'Resolving Provider...'}
                        </p>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>Routing ASN:</span>
                          <span className="text-indigo-400 font-semibold">{geo.asn || 'AS-UNKNOWN'}</span>
                        </div>
                      </div>

                      <div
                        className="absolute -bottom-1 right-3 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}

                {/* Auto-Detect My IP */}
                <button
                  type="button"
                  onClick={() => fetchGeolocation()}
                  disabled={loading}
                  title="Detect My Public IP"
                  aria-label="Automatically detect my incoming IP address"
                  className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-slate-200 hover:text-white px-2 py-1 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  >
                    {loading ? (
                      <path
                        fillRule="evenodd"
                        d="M4 10a6 6 0 1112 0 6 6 0 01-12 0zm6-4a4 4 0 100 8 4 4 0 000-8z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 2a.75.75 0 01.75.75v1.541a7.001 7.001 0 015.708 5.708h1.542a.75.75 0 010 1.5h-1.542a7.001 7.001 0 01-5.708 5.708v1.543a.75.75 0 01-1.5 0v-1.543A7.001 7.001 0 014.291 11.5H2.75a.75.75 0 010-1.5h1.541a7.001 7.001 0 015.709-5.709V2.75A.75.75 0 0110 2zm0 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM10 7a3 3 0 100 6 3 3 0 000-6z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                  <span className="text-[11px] font-mono hidden xs:inline">Auto</span>
                </button>

                {/* Quick Copy IP */}
                <button
                  type="button"
                  onClick={handleCopyIp}
                  disabled={!ip}
                  title={copiedIp ? 'Copied to clipboard!' : 'Copy IP address'}
                  aria-label={copiedIp ? 'IP address copied' : 'Copy IP address to clipboard'}
                  className={`inline-flex items-center gap-1 border px-2 py-1 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-40 ${
                    copiedIp
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white'
                  }`}
                >
                  {copiedIp ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-75"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[11px] font-mono font-semibold hidden xs:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-slate-400"
                        aria-hidden="true"
                      >
                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </svg>
                      <span className="text-[11px] font-mono hidden xs:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {ipError && (
              <p className="text-[11px] font-mono text-rose-400">{ipError}</p>
            )}
          </div>
        </div>
      </section>

      {/* Plausibility Score */}
      <section className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${audit.score >= 90 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-400">Plausibility Health Rating</h3>
            <p className="text-sm font-bold text-white">{audit.rating} ({audit.score}%)</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-400">Bio: {audit.bioPass ? '✓' : '✗'} • Academic: {audit.academicPass ? '✓' : '✗'}</span>
      </section>

      {/* 3 Major Regional Industries */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-xs font-mono uppercase text-indigo-400 tracking-wider font-semibold">
          3 Major Regional Industries & Economic Sectors ({geo.city}, {geo.country})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.industries.map((ind, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-indigo-400 font-semibold">Rank #{i + 1}</span>
                <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono">{ind.share}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{ind.title}</h3>
              <p className="text-xs text-slate-400 mb-2 leading-relaxed">{ind.driver}</p>
              <p className="text-[11px] text-slate-400 font-mono">Anchor: {ind.anchor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 3 Resident Occupations */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold">
          Top 3 Resident Occupations (Age {age})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.occupations.map((occ, i) => (
            <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold">{occ.sector}</span>
                <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">{occ.share}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{occ.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{occ.responsibilities}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Household Structure & Children */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-xs font-mono uppercase text-sky-400 tracking-wider font-semibold">Household Structure & Child Demographics</h2>
        <p className="text-xs text-slate-300">
          Status: <span className="font-semibold text-white">{profile.household.marital}</span> • Household Size:{' '}
          <span className="font-semibold text-white">{profile.household.size} Persons</span> • Housing: <span className="font-semibold text-white">{profile.household.tenure}</span>
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {profile.household.children.map((child, idx) => (
            <span key={idx} className="bg-sky-950/60 border border-sky-500/30 text-sky-300 px-3 py-1 rounded-full text-xs font-mono">
              Child #{idx + 1}: {child.age} yrs ({child.stage}) {child.residing ? '• Residing at Home' : ''}
            </span>
          ))}
          {profile.household.children.length === 0 && (
            <span className="text-xs text-slate-400 font-mono italic">No dependent children modeled for current demographic age.</span>
          )}
        </div>
      </section>

      {/* ISP & Telecom Infrastructure */}
      <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">ISP & Regional Connectivity</h2>
        <p className="text-xs text-slate-300">
          Active Provider: <span className="font-semibold text-white">{geo.isp}</span> ({geo.asn}) • Technology: <span className="font-semibold text-white">{profile.telecom.connType}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {profile.telecom.topIsps.map((ispItem, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs">
              <span className="font-bold text-white block">{ispItem.name}</span>
              <span className="text-slate-400">{ispItem.tech} • {ispItem.share} market share</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}