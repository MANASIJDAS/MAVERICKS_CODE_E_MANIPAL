import { Route, Routes } from 'react-router-dom'
import { Activity, AlertTriangle, Clock3, HeartPulse, LayoutDashboard, ShieldCheck, Stethoscope } from 'lucide-react'

const nav = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: Stethoscope },
  { label: 'Trends', path: '/trends', icon: HeartPulse },
  { label: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { label: 'Timeline', path: '/timeline', icon: Clock3 },
  { label: 'Replay', path: '/replay', icon: ShieldCheck }
]

const metrics = [
  { label: 'Heart Rate', value: '72 bpm', status: 'Stable' },
  { label: 'Oxygen', value: '98.4%', status: 'Nominal' },
  { label: 'Sleep', value: '7.3h', status: 'Slight drop' },
  { label: 'Stress', value: 'Moderate', status: 'Watch' }
]

const alerts = [
  { level: 'Monitoring', title: 'Sleep trend drift', detail: '7-day baseline is 0.8h below expected values.' },
  { level: 'Concern', title: 'Resting HR elevation', detail: 'Observed against personal baseline over 3 days.' },
  { level: 'Insufficient evidence', title: 'Incomplete sensor packet', detail: 'Missing activity reading for the last cycle.' }
]

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-glow backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{metric.label}</div>
            <div className="mt-4 text-3xl font-semibold text-white">{metric.value}</div>
            <div className="mt-2 text-sm text-cyan-300">{metric.status}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Mission trend overview</h2>
            <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">Offline-ready</span>
          </div>
          <div className="h-64 rounded-xl bg-slate-950/60 p-4">
            <div className="flex h-full items-end gap-3">
              {[42, 58, 46, 72, 66, 84, 78].map((bar, index) => (
                <div key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-600 to-blue-400" style={{ height: `${bar}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white">Recent alerts</h2>
          <div className="mt-5 space-y-4">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">{alert.level}</div>
                <div className="mt-2 text-base font-medium text-white">{alert.title}</div>
                <div className="mt-1 text-sm text-slate-300">{alert.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfilePage() {
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-200 backdrop-blur-sm">Astronaut profile view with baseline and mission status.</div>
}

function TrendsPage() {
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-200 backdrop-blur-sm">Personal health trend analysis and evidence-backed monitoring.</div>
}

function AlertsPage() {
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-200 backdrop-blur-sm">Alert board, severity, uncertainty, and escalation workflow.</div>
}

function TimelinePage() {
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-200 backdrop-blur-sm">Mission timeline with events, symptoms and status updates.</div>
}

function ReplayPage() {
  return <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-slate-200 backdrop-blur-sm">Scenario replay and synthetic event playback.</div>
}

export default function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-700 bg-slate-950/70 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Mission health intelligence</div>
            <h1 className="mt-2 text-3xl font-semibold text-white">CrewSignal</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Mission sync status: local and ready
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
          <nav className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4 backdrop-blur-md">
            <div className="space-y-2">
              {nav.map(({ label, path, icon: Icon }) => (
                <a key={path} href={path} className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-500/50 hover:text-white">
                  <Icon size={16} className="text-cyan-300" />
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <main className="min-h-[70vh]">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/replay" element={<ReplayPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}
