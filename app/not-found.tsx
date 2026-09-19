import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-14 h-14 bg-indigo-950/80 border border-indigo-600/40 rounded-2xl flex items-center justify-center mb-6">
        <span className="font-mono text-xl font-bold text-indigo-400" aria-hidden="true">404</span>
      </div>
      <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-3">
        Demographic Node Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The requested URL does not map to an active analytical model or legal disclosure.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition focus-visible:ring-2 focus-visible:ring-indigo-400 focus:outline-none"
      >
        Return to Analytics Dashboard
      </Link>
    </main>
  );
}