import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/overview")({
  head: () => ({
    meta: [
      { title: "Dashboard — Overview" },
      { name: "description", content: "Your Overview project overview." },
    ],
  }),
  component: Overview,
});

const metricCards = [
  { label: "Total Project Value", value: "$12,850,000", detail: "Trending up this month" },
  { label: "Cost Variance", value: "$12.85M / $13.42M", detail: "+4.4% overrun till now" },
  { label: "Overall Progress", value: "$1,250.00", detail: "Progress on Track" },
  { label: "Open Issues / RFIs", value: "18", detail: "Pending responses increasing" },
];

const scheduleRows = [
  {
    name: "Structural Framing – Level 3",
    phase: "Superstructure",
    category: "Structural",
    assignee: "SteelBuild Inc.",
    status: "Delayed",
    due: "Apr 26, 2026",
    delay: "3d",
    rfi: 12,
  },
  {
    name: "Electrical Rough-in",
    phase: "MEP",
    category: "Electrical",
    assignee: "Volt Electric Co.",
    status: "On Track",
    due: "Apr 10, 2026",
    delay: "7d",
    rfi: 4,
  },
  {
    name: "HVAC Installation",
    phase: "MEP",
    category: "HVAC",
    assignee: "AirFlow Systems",
    status: "Pending",
    due: "May 30, 2026",
    delay: "-",
    rfi: 6,
  },
  {
    name: "Plumbing Rough-in",
    phase: "MEP",
    category: "Plumbing",
    assignee: "AquaFlow Ltd",
    status: "On Track",
    due: "Apr 28, 2026",
    delay: "-",
    rfi: 2,
  },
  {
    name: "Interior Drywall",
    phase: "Finishing",
    category: "Civil",
    assignee: "BuildRight Co.",
    status: "Pending",
    due: "May 20, 2026",
    delay: "-",
    rfi: 4,
  },
];

function Overview() {
  return (
    <div className="p-6 lg:p-8 overflow-y-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            Commercial Office Building
          </div>
          <h1 className="mt-4 text-3xl font-semibold">Riverside Corporate Plaza</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Trending up this month. Increase due to approved changes.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          <Plus className="h-4 w-4" /> Add Quick View
        </button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card, index) => (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[2rem] border border-border bg-card p-5 shadow-card"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">
              {card.label}
            </p>
            <p className="mt-4 text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-border bg-card p-6 shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Total visitors
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Total of the last 3 months</h2>
            </div>
            <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
              Visitor trend
            </span>
          </div>

          <div className="mt-8 rounded-[2rem] bg-linear-to-b from-pink-100/90 via-transparent to-transparent p-4">
            <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] bg-pink-50/80">
              <svg viewBox="0 0 100 40" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 C10,24 18,22 26,24 C34,26 42,18 50,20 C58,22 66,14 74,15 C82,16 90,10 100,12 L100,40 L0,40 Z"
                  fill="url(#areaGradient)"
                />
                <path
                  d="M0,30 C10,24 18,22 26,24 C34,26 42,18 50,20 C58,22 66,14 74,15 C82,16 90,10 100,12"
                  fill="none"
                  stroke="#db2777"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-secondary p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-2xl text-foreground">$12.85M</p>
                <p className="mt-2">Total Project Value</p>
              </div>
              <div className="rounded-3xl bg-secondary p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-2xl text-foreground">+4.4%</p>
                <p className="mt-2">Cost variance</p>
              </div>
              <div className="rounded-3xl bg-secondary p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-2xl text-foreground">$1,250</p>
                <p className="mt-2">Overall progress</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[2rem] bg-linear-to-br from-pink-500 via-fuchsia-500 to-purple-600 p-6 text-white shadow-elegant"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] opacity-90">Open Issues / RFIs</p>
              <h3 className="mt-3 text-4xl font-semibold">18</h3>
            </div>
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.16em]">
              Pending responses increasing
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.75rem] bg-white/10 p-4">
              <p className="text-sm uppercase opacity-80">Avg response time</p>
              <p className="mt-2 text-3xl font-semibold">1.2 days</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-4">
              <div className="flex items-center justify-between text-sm uppercase opacity-80">
                <span>Project progress</span>
                <span>72%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-[72%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-[2rem] border border-border bg-card p-6 shadow-card"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Project Schedule</h2>
            <p className="mt-1 text-sm text-muted-foreground">Daily Log · Punch List · Schedule</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Project Schedule", "Daily Log", "Punch List"].map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                {[
                  "Task Name",
                  "Phase",
                  "Category",
                  "Assigned To",
                  "Status",
                  "Due Date",
                  "Delay",
                  "RFIs",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-4 font-semibold uppercase tracking-[0.12em]">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((row) => {
                const statusClasses =
                  row.status === "Delayed"
                    ? "text-destructive"
                    : row.status === "On Track"
                      ? "text-primary"
                      : "text-muted-foreground";
                return (
                  <tr key={row.name} className="border-t border-border bg-background/70">
                    <td className="px-4 py-4 font-medium">{row.name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.phase}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.category}</td>
                    <td className="px-4 py-4">{row.assignee}</td>
                    <td className={`px-4 py-4 font-semibold ${statusClasses}`}>{row.status}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.due}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.delay}</td>
                    <td className="px-4 py-4 text-muted-foreground">{row.rfi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
