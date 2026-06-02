import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, BarChart3, HardHat, Building2, ClipboardList, MessageSquare } from "lucide-react";
import { Logo } from "@/components/Logo";
import worker from "@/assets/construction-worker.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Builtraa — Construction Management, Reimagined" },
      { name: "description", content: "Builtraa is the all-in-one dashboard for construction teams: punch lists, daily logs, drawings, and coordination — built for the field." },
      { property: "og:title", content: "Builtraa — Construction Management Dashboard" },
      { property: "og:description", content: "Run projects, crews, and documents from one beautiful workspace." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: ClipboardList, title: "Punch Lists & Daily Logs", desc: "Capture issues on site and close them out fast." },
  { icon: Building2, title: "Drawings & Documents", desc: "One source of truth for every revision." },
  { icon: HardHat, title: "Crews & Schedule", desc: "Coordinate trades without the chaos." },
  { icon: MessageSquare, title: "Conversations", desc: "Project chat that stays in context." },
  { icon: BarChart3, title: "Observations", desc: "Track quality, safety and progress." },
  { icon: ShieldCheck, title: "Action Plans", desc: "Turn issues into accountable tasks." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#workflow" className="hover:text-primary">Workflow</a>
            <a href="#pricing" className="hover:text-primary">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium hover:text-primary">Login</Link>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20" style={{ background: "var(--gradient-brand)" }} />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">Built for the field</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">
              Build smarter with <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>Builtraa</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              The construction management dashboard your crews actually want to use. Punch lists, drawings, schedules and conversations — together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center rounded-lg px-6 py-3 font-semibold border border-border hover:bg-secondary">
                View Dashboard
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-9/10 sm:aspect-4/5 lg:aspect-auto" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <img src={worker} alt="Construction site manager using Builtraa" width={896} height={1024} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">Everything your project needs</h2>
          <p className="mt-3 text-muted-foreground">A complete toolkit for project managers, superintendents and crews.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl bg-card border border-border"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="h-11 w-11 rounded-lg flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-10 md:p-14 text-center text-primary-foreground"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
        >
          <h2 className="text-4xl font-bold">Ready to build with Builtraa?</h2>
          <p className="mt-3 opacity-90">Try free for 14 days. No credit card required.</p>
          <Link to="/signup" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card text-primary px-6 py-3 font-semibold">
            Create your workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo />
          <p>© {new Date().getFullYear()} Builtraa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}