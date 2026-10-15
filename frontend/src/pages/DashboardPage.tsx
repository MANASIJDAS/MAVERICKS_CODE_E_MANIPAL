import { ArrowUpRight, Activity, HeartPulse, MoonStar, ShieldAlert } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { alerts, crewProfile, summaryMetrics, trendSeries } from '../data/mockData'

export function MetricCard({ label, value, delta, status }: { label: string; value: string; delta: string; status: string }) {
  const tone = status === 'watch' ? 'text-amber-300 bg-amber-500/10' : 'text-emerald-300 bg-emerald-500/10'
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4 shadow-lg">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{label}</span>
        <span className={`rounded-full px-2 py-1 ${tone}`}>{status}</span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="text-sm text-slate-300">{delta}</div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl p-6">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">CrewSignal</p>
            <h1 className="mt-2 text-3xl font-semibold">Mission Health Overview</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <ShieldAlert className="h-4 w-4" />
            {crewProfile.status}
          </div>
        </header>

        <div className="mb-6 grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Crew Profile</p>
                <h2 className="mt-2 text-2xl font-semibold">{crewProfile.name}</h2>
              </div>
              <div className="rounded-xl bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
                {crewProfile.crewId}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-slate-800 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Role</p>
                <p className="mt-2 text-lg text-white">{crewProfile.role}</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mission</p>
                <p className="mt-2 text-lg text-white">{crewProfile.mission}</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Watch</p>
                <p className="mt-2 text-lg text-white">Nominal</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Evidence Summary</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
                <div className="flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-rose-300" />
                  <span>HR variance</span>
                </div>
                <span className="text-rose-300">7% above baseline</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
                <div className="flex items-center gap-3">
                  <MoonStar className="h-5 w-5 text-violet-300" />
                  <span>Sleep debt</span>
                </div>
                <span className="text-violet-300">1.1 h deficit</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-emerald-300" />
                  <span>Recovery</span>
                </div>
                <span className="text-emerald-300">Mixed</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((item) => (
            <MetricCard key={item.label} {...item} />
          ))}
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Trend signatures</h3>
              <div className="text-sm text-slate-400">Last 10 days</div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendSeries}>
                  <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis domain={[60, 85]} stroke="#94a3b8" />
                  <Line type="monotone" dataKey="hr" stroke="#f87171" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="sleep" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
            <h3 className="mb-4 text-lg font-semibold">Decision support alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.title} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium text-white">{alert.title}</p>
                    <span className="rounded-full bg-slate-700 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                      {alert.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{alert.evidence}</p>
                  <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>Confidence</span>
                    <span>{Math.round(alert.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
            <ArrowUpRight className="h-4 w-4" />
            Review protocol
          </button>
        </div>
      </div>
    </div>
  )
}
