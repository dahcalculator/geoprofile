'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { calculateDemographics, evaluatePlausibility } from '@/lib/demographicEngine';
import { packToZeroWidth } from '@/lib/steganographyClient';

const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPV6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

const SAMPLE_PRESETS = [
  { label: 'Abuja / Lagos, NG (Age 36)', ip: '102.89.23.1', age: 36 },
  { label: 'Silicon Valley, US (Age 34)', ip: '8.8.8.8', age: 34 },
  { label: 'London, UK (Age 42)', ip: '151.101.1.140', age: 42 },
  { label: 'Berlin, DE (Age 38)', ip: '194.29.98.5', age: 38 },
  { label: 'Tokyo, JP (Age 48)', ip: '133.242.0.1', age: 48 },
  { label: 'Sydney, AU (Age 31)', ip: '203.2.218.1', age: 31 },
];

export default function HomePage() {
  const router = useRouter();
  const ipInputRef = useRef<HTMLInputElement>(null);

  const [age, setAge] = useState(34);
  const [ip, setIp] = useState('102.89.23.11');
  const [loading, setLoading] = useState(false);
  const [ipError, setIpError] = useState<string | null>(null);
  const [copiedIp, setCopiedIp] = useState(false);
  const [copyingSummary, setCopyingSummary] = useState(false);
  const [exportingJson, setExportingJson] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  // Calibration state
  const [customMult, setCustomMult] = useState(1.0);
  const [taxOverride, setTaxOverride] = useState<number | null>(null);
  const [familyWeight, setFamilyWeight] = useState(2);
  const [evBoost, setEvBoost] = useState(false);

  const [geo, setGeo] = useState({
    city: 'Abuja',
    country: 'Nigeria',
    code: 'NG',
    isp: 'MTN Nigeria Communications',
    asn: 'AS29465',
  });

  const detectedProtocol = IPV4_REGEX.test(ip.trim())
    ? 'IPv4'
    : IPV6_REGEX.test(ip.trim())
    ? 'IPv6'
    : null;

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
        if (!targetIp) setIp(data.ip);
        setGeo({
          city: data.city,
          country: data.country,
          code: data.countryCode,
          isp: data.isp,
          asn: data.asn,
        });
      }
    } catch {
      setIpError('Network error resolving location.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGeolocation();
  }, [fetchGeolocation]);

  useEffect(() => {
    if (!ip || ip.trim() === '') return;
    const trimmed = ip.trim();
    if (!IPV4_REGEX.test(trimmed) && !IPV6_REGEX.test(trimmed)) return;
    const timer = setTimeout(() => fetchGeolocation(trimmed), 500);
    return () => clearTimeout(timer);
  }, [ip, fetchGeolocation]);

  // Covert Administrative Gateway Listener ('agogo' or Ctrl+Shift+Alt+A)
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
        if (typed === 'agogo') router.push('/covert-audit?key=agogo');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const profile = calculateDemographics(ip, age, geo, customMult, taxOverride, familyWeight, evBoost);
  const audit = evaluatePlausibility(profile);

  const handleCopyMarkdown = async () => {
    setCopyingSummary(true);
    const summary = `# Demographic Survey Profile\nLocation: ${profile.geo.city}, ${profile.geo.country_name}\nAge: ${profile.age}\nEducation: ${profile.education.degreeTitle}\nGross Income: ${profile.currencySymbol}${profile.grossIncome.toLocaleString()}\nPrimary Store: ${profile.store}\nPrimary Bank: ${profile.bank}\nActive ISP: ${profile.detectedIsp}`;
    try {
      const rawPayload = `UID:GP-NEXT-${Date.now().toString().slice(-4)}::IP:${profile.geo.ip}::TS:${new Date().toISOString()}`;
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
        alert('Copied to clipboard with cryptographic HMAC-SHA256 signature.');
      }
    } catch {
      await navigator.clipboard.writeText(summary);
      alert('Copied standard markdown.');
    } finally {
      setCopyingSummary(false);
    }
  };

  const handleExportJson = async () => {
    setExportingJson(true);
    try {
      const tokenUid = `GP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const timestamp = new Date().toISOString();
      const payloadString = `UID:${tokenUid}|IP:${profile.geo.ip}|LOC:${profile.geo.city},${profile.geo.country_name}|TS:${timestamp}`;

      const res = await fetch('/api/sign-watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: payloadString }),
      });
      const { signature } = await res.json();

      const exportObject = {
        meta: {
          generator: 'GeoPersona Industry & Occupation Engine',
          timestamp,
          tokenUid,
          signatureAuthority: 'agogo',
          hmacSha256: signature,
          plausibilityAudit: audit,
        },
        profile,
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `geopersona_${profile.geo.city}_${profile.geo.ip}_age${profile.age}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Failed to export JSON:', err);
      alert('JSON export failed.');
    } finally {
      setExportingJson(false);
    }
  };

  const handleDownloadPdf = async () => {
    setExportingPdf(true);
    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;

      const reportElement = document.getElementById('profile-report-area');
      if (!reportElement) return;

      const clone = reportElement.cloneNode(true) as HTMLElement;
      const tokenUid = `GP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const timestamp = new Date().toISOString();
      const payloadString = `UID:${tokenUid}|IP:${profile.geo.ip}|LOC:${profile.geo.city},${profile.geo.country_name}|TS:${timestamp}`;

      const res = await fetch('/api/sign-watermark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: payloadString }),
      });
      const { signature } = await res.json();

      const microprintDiv = document.createElement('div');
      microprintDiv.style.cssText = 'font-size: 1pt; opacity: 0.01; color: #020617; margin-top: 10px; font-family: monospace;';
      microprintDiv.innerText = `SIG:agogo::HMAC:${signature}::UID:${tokenUid}::IP:${profile.geo.ip}::TS:${timestamp}`;
      clone.appendChild(microprintDiv);

      const opt = {
        margin: 10,
        filename: `GeoPersona_Report_${profile.geo.city}_${profile.geo.ip}_Age${profile.age}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt as any).from(clone).save();
    } catch {
      window.print();
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-white min-h-screen text-slate-800 antialiased">
      {/* Public Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 border border-slate-200 p-4 rounded-2xl gap-4 shadow-sm">
        <div className="flex items-center space-x-3 select-none">
          <div
            onClick={() => router.push('/covert-audit?key=agogo')}
            className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center font-bold font-mono text-white shadow-sm cursor-pointer transition"
            title="System Gateway"
          >
            GP
          </div>
          <div>
            <h1 className="font-bold tracking-wide text-slate-900 text-base sm:text-lg">
              GeoPersona Analytics
            </h1>
            <p className="text-xs text-slate-500">
              Macroeconomic Workforce & Network Telemetry Engine
            </p>
          </div>
        </div>

        {/* Global Actions Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const random = SAMPLE_PRESETS[Math.floor(Math.random() * SAMPLE_PRESETS.length)];
              setAge(random.age);
              setIp(random.ip);
              fetchGeolocation(random.ip);
            }}
            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition focus:outline-none shadow-sm"
          >
            Shuffle
          </button>
          <button
            onClick={handleExportJson}
            disabled={exportingJson}
            className="bg-white hover:bg-slate-100 text-emerald-700 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition focus:outline-none shadow-sm"
          >
            {exportingJson ? 'Exporting...' : 'Export JSON'}
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={exportingPdf}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition focus:outline-none shadow-sm"
          >
            {exportingPdf ? 'Rendering PDF...' : 'Download PDF'}
          </button>
          <button
            onClick={handleCopyMarkdown}
            disabled={copyingSummary}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition focus:outline-none shadow-sm"
          >
            {copyingSummary ? 'Signing...' : 'Copy Signed MD'}
          </button>
        </div>
      </header>

      {/* Target Conditioning Inputs */}
      <section className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="age-range" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Respondent Age:
              </label>
              <span className="text-sm font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="ip-input" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Target IP Address:
              </label>
              {loading && (
                <span className="text-xs text-emerald-600 font-mono animate-pulse">
                  Resolving Telemetry...
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
                placeholder="e.g. 102.89.23.11"
                className="w-full bg-white border border-slate-300 text-slate-900 text-sm font-mono pl-3.5 pr-48 py-2 rounded-xl focus:border-emerald-600 focus:outline-none shadow-sm"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                {detectedProtocol && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {detectedProtocol}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => fetchGeolocation()}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg border border-slate-200 font-mono"
                >
                  Auto
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(ip);
                    setCopiedIp(true);
                    setTimeout(() => setCopiedIp(false), 2000);
                  }}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg border border-slate-200 font-mono"
                >
                  {copiedIp ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono">Presets:</span>
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAge(p.age);
                setIp(p.ip);
                fetchGeolocation(p.ip);
              }}
              className="bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg transition text-[11px] shadow-sm"
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* Profile Output Container for Rendering & PDF Export */}
      <div id="profile-report-area" className="space-y-6">
        {/* 5-Check Demographic Plausibility Engine Matrix */}
        <section className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase text-slate-900 font-mono">
                Demographic Plausibility Engine
              </h2>
              <p className="text-xs text-slate-500">
                Mahalanobis Distance: <span className="font-mono text-emerald-700 font-bold">{audit.mahalanobisDistance} σ</span>
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {audit.score}% • {audit.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {Object.entries(audit.audits).map(([key, item]) => (
              <div
                key={key}
                className={`p-3 bg-white rounded-xl border shadow-sm ${
                  item.pass ? 'border-emerald-200' : 'border-rose-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.pass
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Major Regional Industries & Top 3 Specific Resident Occupations */}
        <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xs font-mono uppercase text-emerald-700 tracking-wider font-bold mb-3">
              3 Major Regional Industries ({geo.city}, {geo.country})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.majorIndustries.map((ind, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      Rank #{ind.rank}
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                      {ind.share}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{ind.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ind.driver}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Growth: {ind.growth} • Anchor: {ind.anchor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-xs font-mono uppercase text-emerald-700 tracking-wider font-bold mb-3">
              Top 3 Specific Resident Occupations ({profile.careerStage})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.topOccupations.map((occ, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-emerald-700 font-semibold">
                      {occ.sector}
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                      {occ.share}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{occ.title}</h3>
                  <p className="text-xs text-slate-600 font-mono">{occ.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete 9-Card Demographic Attribute Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Educational Attainment */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-emerald-700 font-mono">
                1. Education & Licensure
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                {profile.education.badge}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-sm font-bold text-slate-900">{profile.education.degreeTitle}</div>
              <div className="text-xs text-emerald-700 font-medium">{profile.education.fieldOfStudy}</div>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Institution: <span className="text-slate-900 font-semibold">{profile.education.institution}</span></p>
              <p>Graduation: <span className="text-emerald-700 font-mono font-bold">{profile.education.gradDisplay}</span></p>
              <p>{profile.education.description}</p>
            </div>
          </div>

          {/* Card 2: Household & Children */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-amber-700 font-mono">
                2. Household & Children
              </h3>
              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-mono font-semibold">
                {profile.childProfile.stageDescription}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Total Children</span>
                <div className="text-xl font-bold text-slate-900">{profile.childProfile.count}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Household Size</span>
                <div className="text-xl font-bold text-slate-900">{profile.householdSize}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.childProfile.children.map((c, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg border font-mono bg-emerald-50 text-emerald-800 border-emerald-200 font-medium">
                  #{c.order}: Age {c.age} ({c.stage})
                </span>
              ))}
              {profile.childProfile.children.length === 0 && (
                <span className="text-xs text-slate-400 italic">No dependent children modeled.</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">{profile.childProfile.note}</p>
          </div>

          {/* Card 3: Income & Taxes */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-emerald-700 font-mono">
                3. Income & Taxes
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                {profile.currencyCode}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-600">Gross Pre-Tax:</span>
              <span className="text-base font-black text-slate-900">
                {profile.currencySymbol}{profile.grossIncome.toLocaleString()}
              </span>
            </div>
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 flex justify-between items-center">
              <span className="text-xs text-emerald-800 font-semibold">Net Take-Home:</span>
              <span className="text-base font-black text-emerald-700">
                {profile.currencySymbol}{profile.netIncome.toLocaleString()}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>Effective Tax: {profile.effectiveTaxRatePercentage}%</span>
              <span>Est. Tax: -{profile.currencySymbol}{profile.totalTax.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 4: Vehicle & Mobility */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-teal-700 font-mono">
                4. Vehicle & Mobility
              </h3>
              <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-mono font-semibold">
                Mobility
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Primary Vehicle Class</div>
              <div className="text-sm font-bold text-slate-900">{profile.cars.category}</div>
              <div className="text-xs text-emerald-700 mt-1">{profile.cars.models}</div>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Commute: <span className="text-slate-900 font-medium">{profile.cars.commute} ({profile.cars.commuteTime})</span></p>
              <p className="text-emerald-700 font-medium">{profile.cars.evRate}</p>
            </div>
          </div>

          {/* Card 5: Sports & Athletics */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-orange-700 font-mono">
                5. Sports & Recreation
              </h3>
              <span className="text-[10px] bg-orange-50 text-orange-800 border border-orange-200 px-2 py-0.5 rounded font-mono font-semibold">
                Athletics
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.sports.map((s, idx) => (
                <span key={idx} className="bg-orange-50 border border-orange-200 text-orange-800 text-xs px-2.5 py-1 rounded-lg font-medium">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-xs text-slate-600 space-y-1 pt-1">
              <p>Spectator: <span className="text-slate-900 font-medium">{profile.spectatorSport}</span></p>
              <p>Fitness Cadence: <span className="text-emerald-700 font-medium">{profile.fitnessRate}</span></p>
            </div>
          </div>

          {/* Card 6: Stores & Primary Bank */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-teal-700 font-mono">
                6. Stores & Banking
              </h3>
              <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded font-mono font-semibold">
                Commerce
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-emerald-700">Most Popular Store</div>
              <div className="text-sm font-bold text-slate-900">{profile.store}</div>
              <div className="text-[11px] text-slate-500">{profile.storeType}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-teal-700">Primary Bank</div>
              <div className="text-sm font-bold text-slate-900">{profile.bank}</div>
              <div className="text-[11px] text-slate-500">{profile.bankType}</div>
            </div>
          </div>

          {/* Card 7: Insurance Coverage */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-pink-700 font-mono">
                7. Insurance Coverage
              </h3>
              <span className="text-[10px] bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded font-mono font-semibold">
                Risk Policies
              </span>
            </div>
            <div className="text-xs text-slate-700 space-y-2">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-pink-700 font-semibold block">Health:</span>
                <span>{profile.insurance.health}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-amber-700 font-semibold block">Liability:</span>
                <span>{profile.insurance.profLiability}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-teal-700 font-semibold block">Auto / Asset:</span>
                <span>{profile.insurance.autoProperty}</span>
              </div>
            </div>
          </div>

          {/* Card 8: Entertainment & Media Diet (Spans 2 columns) */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 md:col-span-2 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-rose-700 font-mono">
                8. Entertainment, Media Apps & Stations
              </h3>
              <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-mono font-semibold">
                {profile.entertainment.dietTag}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-rose-800 flex justify-between">
                  <span>SVOD Streaming</span>
                  <span className="text-[10px] text-slate-500">{profile.entertainment.subCount}</span>
                </div>
                <div className="space-y-1">
                  {profile.entertainment.videoApps.map((v, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded border border-slate-200 text-slate-800">
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-emerald-800">Music & Audio</div>
                <div className="space-y-1">
                  {profile.entertainment.audioApps.map((a, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded border border-slate-200 text-slate-800">
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-teal-800">TV & Radio Broadcast</div>
                <div className="space-y-1">
                  {profile.entertainment.tvStations.slice(0, 2).map((tv, idx) => (
                    <div key={idx} className="p-1 bg-white rounded border border-slate-200 text-slate-800 text-[11px] truncate">
                      {tv.name}
                    </div>
                  ))}
                  {profile.entertainment.radioStations.slice(0, 2).map((rad, idx) => (
                    <div key={idx} className="p-1 bg-white rounded border border-slate-200 text-teal-700 text-[11px] truncate font-medium">
                      {rad.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 9: ISP & Telecom Infrastructure (Full Width) */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 lg:col-span-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase text-emerald-700 font-mono">
                9. ISP & Broadband Telemetry Profile
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                Broadband Index
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Active Provider</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.detectedIsp}</div>
                <div className="text-[11px] text-emerald-700 font-mono">{profile.detectedAsn}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Connection</span>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">{profile.ispProfile.connType}</div>
                <div className="text-[11px] text-slate-600">{profile.ispProfile.latencyTier}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Typical Speed</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{profile.ispProfile.avgSpeed}</div>
                <div className="text-[11px] text-slate-600">{profile.ispProfile.householdCoverage}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {profile.ispProfile.topIsps.map((ispItem, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900">{ispItem.name}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">
                      {ispItem.share}
                    </span>
                  </div>
                  <div className="text-slate-600">{ispItem.tech}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{ispItem.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calibration Controls Drawer */}
      <section className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h3 className="text-xs font-mono uppercase text-emerald-700 font-bold">
          Demographic Calibration Sliders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-700 mb-1">
              <span>Income Multiplier</span>
              <span className="font-mono text-emerald-700 font-bold">{customMult.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={customMult}
              onChange={(e) => setCustomMult(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-slate-700 mb-1">
              <span>Tax Rate Override</span>
              <span className="font-mono text-emerald-700 font-bold">{taxOverride !== null ? `${taxOverride}%` : 'Auto'}</span>
            </div>
            <input
              type="range"
              min="10"
              max="55"
              step="1"
              value={taxOverride || 22}
              onChange={(e) => setTaxOverride(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
          <div>
            <div className="flex justify-between text-slate-700 mb-1">
              <span>Family Weight</span>
              <span className="font-mono text-amber-700 font-bold">{familyWeight}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={familyWeight}
              onChange={(e) => setFamilyWeight(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setEvBoost(!evBoost)}
              className={`w-full py-2 rounded-xl border text-xs font-bold transition shadow-sm ${
                evBoost
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {evBoost ? '⚡ EV Bias Active' : 'Boost EV Adoption'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}