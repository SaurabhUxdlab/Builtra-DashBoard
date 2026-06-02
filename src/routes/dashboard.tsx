import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sidebar } from "@/components/Sidebar";
import { Bell, Search, Plus, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Builtraa" }, { name: "description", content: "Your Builtraa project overview." }] }),
  component: Dashboard,
});

const stats = [
  { label: "Open Punch Items", value: "24", icon: AlertCircle, trend: "+3 today" },
  { label: "Completed This Week", value: "87", icon: CheckCircle2, trend: "+12%" },
  { label: "Active Crews", value: "9", icon: TrendingUp, trend: "On 4 sites" },
  { label: "Pending Approvals", value: "6", icon: Clock, trend: "2 urgent" },
];

const activity = [
  { who: "Maya Chen", what: "uploaded 12 photos to Tower B – Level 14", when: "10 min ago" },
  { who: "Daniel Park", what: "closed punch item #PL-204 (Drywall scuff)", when: "32 min ago" },
  { who: "Riley Adams", what: "posted a daily log for Site 3", when: "1 hr ago" },
  { who: "Sofia Mendes", what: "opened coordination issue: HVAC vs Sprinkler clash", when: "2 hr ago" },
];

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-card">
          <div className="flex-1 flex items-center gap-2 max-w-md rounded-lg bg-secondary px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search projects, files, people..." className="bg-transparent text-sm outline-none flex-1" />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-secondary">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          <div className="h-9 w-9 rounded-full text-primary-foreground flex items-center justify-center font-semibold" style={{ background: "var(--gradient-primary)" }}>JD</div>
        </header>

        <div className="p-6 lg:p-8 overflow-y-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Project Overview</h1>
              <p className="text-muted-foreground">Skyline Tower — Phase 2 · Active</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Plus className="h-4 w-4" /> New Entry
            </button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="p-5 rounded-xl bg-card border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-3 text-3xl font-bold">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.trend}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 p-6 rounded-xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <ul className="mt-4 space-y-4">
                {activity.map((a, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">{a.who.split(" ").map(n => n[0]).join("")}</div>
                    <div className="flex-1">
                      <p className="text-sm"><span className="font-semibold">{a.who}</span> {a.what}</p>
                      <p className="text-xs text-muted-foreground">{a.when}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl text-primary-foreground" style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}>
              <h2 className="text-lg font-semibold">This Week</h2>
              <p className="mt-1 text-sm opacity-90">Progress vs schedule</p>
              <div className="mt-6">
                <div className="text-5xl font-bold">78%</div>
                <div className="mt-3 h-2 w-full rounded-full bg-white/20 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ delay: 0.5, duration: 0.8 }} className="h-full bg-white rounded-full" />
                </div>
                <p className="mt-3 text-sm opacity-90">Ahead of schedule by 2 days</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}