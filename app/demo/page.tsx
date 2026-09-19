'use client';

import React, { useState } from 'react';

export default function MinimalWhiteDesignDemo() {
  const [activeTab, setActiveTab] = useState<'workforce' | 'household' | 'telecom'>('workforce');
  const [ip, setIp] = useState('102.89.23.11');
  const [age, setAge] = useState(34);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-emerald-500 selection:text-white font-sans antialiased pb-12">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-b from-emerald-50 via-transparent to-transparent pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-[1px] shadow-sm">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center font-mono font-black text-emerald-600 text-sm">
                GP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-slate-900">GeoPersona</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  BTN SUITE
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Demographic & Workforce Telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition">
              JSON
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition">
              Download PDF
            </button>
            <button className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm">
              Copy Signed MD
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5 relative">
        {/* Top Calibration Bar */}
        <section className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* IP Control */}
            <div className="md:col-span-6 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 uppercase text-[11px] font-semibold">Telemetry Target</span>
                <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-3.5 pr-28 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-500 shadow-sm transition"
                  placeholder="e.g. 102.89.23.11"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    IPv4
                  </span>
                  <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg font-mono border border-slate-200">
                    Auto
                  </button>
                  <button className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg font-mono border border-slate-200">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Age Control */}
            <div className="md:col-span-6 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 uppercase text-[11px] font-semibold">Age Calibration</span>
                <span className="text-emerald-700 font-bold">{age} Years Old</span>
              </div>
              <div className="pt-2">
                <input
                  type="range"
                  min="18"
                  max="85"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Live Locality & Plausibility Summary */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-emerald-700 font-mono">Abuja, Nigeria (NG)</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono">MTN Nigeria (AS29465)</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Civil Governance & Enterprise Technology Demographic Profile
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Plausibility Rating</div>
              <div className="text-emerald-700 font-mono font-bold text-sm">98% • Coherent (1.12 σ)</div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
          </div>
        </section>

        {/* 3 Major Regional Industries */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
              3 Major Regional Industries
            </h3>
            <span className="text-[11px] text-emerald-700 font-mono font-semibold">Abuja / Regional Baseline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { rank: '#1', name: 'Public Administration & Governance', share: '34%', driver: 'Federal ministries, MDAs, diplomatic missions.' },
              { rank: '#2', name: 'ICT & FinTech Systems', share: '28%', driver: 'Pan-African payment rails, software engineering.' },
              { rank: '#3', name: 'Commercial Distribution & Trade', share: '22%', driver: 'Wholesale FMCG supply chains, retail logistics.' },
            ].map((ind, i) => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 transition space-y-1.5 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    {ind.rank} Sector
                  </span>
                  <span className="text-xs font-mono text-slate-700 font-bold">{ind.share}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{ind.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.driver}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'workforce', label: '1. Workforce & Compensation' },
            { id: 'household', label: '2. Household, Family & Auto' },
            { id: 'telecom', label: '3. Telecom, Media & Retail' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg font-mono transition ${
                activeTab === tab.id
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabbed Card Grid */}
        {activeTab === 'workforce' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Top Resident Occupation</span>
              <h4 className="text-sm font-bold text-slate-900">Assistant Director / Regulatory Lead</h4>
              <p className="text-xs text-slate-600">Public policy, circular compliance, TSA oversight.</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400">Share: 35% of age cohort</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Compensation & Taxes</span>
              <div className="text-xl font-bold font-mono text-slate-900">₦17,710,000 Gross</div>
              <div className="text-xs text-emerald-700 font-mono font-bold">Net Take-Home: ₦14,522,200 (82%)</div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">Effective Tax: 18%</div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Educational Attainment</span>
              <h4 className="text-sm font-bold text-slate-900">B.Sc. Honors / Professional Charter</h4>
              <p className="text-xs text-slate-600">Applied Sciences & Management (Graduated Age 22).</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono">Top 15% regional cohort</div>
            </div>
          </div>
        )}

        {activeTab === 'household' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Household Structure</span>
              <h4 className="text-sm font-bold text-slate-900">Married / Cohabiting (4 Occupants)</h4>
              <p className="text-xs text-slate-600">Homeowner (Mortgaged) with dependent minors.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Children Life-Stages</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700 font-semibold">
                  Child #1: Age 7 (School-Age)
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[11px] font-mono text-amber-800 font-semibold">
                  Child #2: Age 4 (Toddler)
                </span>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Vehicle & Commute</span>
              <h4 className="text-sm font-bold text-slate-900">Compact SUV & Saloon</h4>
              <p className="text-xs text-slate-600">Toyota Corolla / RAV4 • 38 mins expressway drive.</p>
            </div>
          </div>
        )}

        {activeTab === 'telecom' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">ISP Telecom</span>
              <h4 className="text-sm font-bold text-slate-900">MTN HyNetflex / 5G Wireless</h4>
              <p className="text-xs text-slate-600">Subsea cable backbone • 35-180 Mbps speed tier.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Media & Broadcast</span>
              <div className="space-y-0.5 text-xs text-slate-600">
                <p>• SVOD: Showmax, Netflix NG</p>
                <p>• Audio: Boomplay, Spotify Africa</p>
                <p>• TV/Radio: Channels TV, Wazobia FM</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold tracking-wider">Commerce & Banking</span>
              <h4 className="text-sm font-bold text-slate-900">Shoprite / Spar • Zenith Bank</h4>
              <p className="text-xs text-slate-600">Tier-1 commercial retail & digital banking network.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}