import { motion } from "motion/react";
import { type ReactNode } from "react";
import { Search, Bell, ChevronDown, Layers, ClipboardList, FileText, CheckSquare, Users } from "lucide-react";
import worker from "../../public/construction-worker.jpg";
import { Logo } from "./Logo";

function MockDashboard({ isLoading }: { isLoading?: boolean }) {
  return (
    <motion.div 
      animate={{
        filter: isLoading ? "blur(0px)" : "blur(10px)",
        scale: isLoading ? 1 : 1.05,
        opacity: isLoading ? 1 : 0.75,
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-background flex flex-col"
    >
      {/* Top Banner with gradient */}
      <div className="w-full h-48 shrink-0 relative" style={{ background: "var(--gradient-brand)" }}>
        {/* Mock Header */}
        <div className="flex items-center justify-between px-12 h-20 text-white/90 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg text-white">B</div>
            <span className="text-xl font-bold tracking-tight text-white">Builtraa</span>
          </div>

          <div className="w-1/3 max-w-md h-10 rounded-2xl bg-white/15 border border-white/15 px-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-white/50" />
            <span className="text-white/40 text-sm">Search projects, tasks, files...</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Bell className="h-4 w-4 text-white/80" />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
              <div className="w-6 h-6 rounded-full bg-white/30" />
              <span className="text-xs text-white/80 font-medium">Musiq</span>
              <ChevronDown className="h-3 w-3 text-white/80" />
            </div>
          </div>
        </div>

        {/* Mock Secondary Header/Breadcrumb area */}
        <div className="flex items-center justify-between px-12 h-14 text-white/90">
          <div className="flex items-center gap-6 text-sm font-semibold">
            <span className="border-b-2 border-white pb-1 text-white">Projects</span>
            <span className="opacity-60">Punch List</span>
            <span className="opacity-60">Daily Logs</span>
            <span className="opacity-60">Drawings</span>
            <span className="opacity-60">Crews</span>
          </div>
          <div className="h-9 w-28 rounded-lg bg-white/20 border border-white/10" />
        </div>
      </div>

      {/* Mock Main Dashboard Body */}
      <div className="flex-1 flex px-12 py-8 gap-8 bg-secondary/30">
        {/* Left Sidebar */}
        <div className="w-64 shrink-0 flex flex-col gap-2">
          <div className="h-9 rounded-xl bg-card border border-border/80 shadow-sm px-4 flex items-center gap-3 text-sm text-foreground/80">
            <Layers className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary">Overview</span>
          </div>
          <div className="h-9 rounded-xl bg-transparent px-4 flex items-center gap-3 text-sm text-muted-foreground">
            <ClipboardList className="h-4 w-4" />
            <span>Punch List</span>
          </div>
          <div className="h-9 rounded-xl bg-transparent px-4 flex items-center gap-3 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Daily Logs</span>
          </div>
          <div className="h-9 rounded-xl bg-transparent px-4 flex items-center gap-3 text-sm text-muted-foreground">
            <CheckSquare className="h-4 w-4" />
            <span>Tasks</span>
          </div>
          <div className="h-9 rounded-xl bg-transparent px-4 flex items-center gap-3 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Crews</span>
          </div>
        </div>

        {/* Right Content Pane - A mock Table */}
        <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-muted rounded w-48" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
            <div className="w-32 h-9 rounded-lg bg-muted border border-border" />
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">
                    P{i}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 bg-muted rounded w-44" />
                    <div className="h-3 bg-muted rounded w-28" />
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="w-20 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-semibold">
                    Active
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
  maxWidth = "max-w-3xl",
  contentPadding = "p-5 sm:p-6 md:p-8",
  isLoading = false,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  maxWidth?: string;
  contentPadding?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mock blurred dashboard background */}
      <MockDashboard isLoading={isLoading} />

      {/* Light gradient overlay on top of the mock dashboard for a smooth blend */}
      <motion.div 
        animate={{
          opacity: isLoading ? 0 : 0.2,
          backdropFilter: isLoading ? "blur(0px)" : "blur(1px)",
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-background pointer-events-none z-[5]" 
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" }}
          animate={{
            opacity: isLoading ? 0 : 1,
            y: isLoading ? -30 : 0,
            scale: isLoading ? 0.95 : 1,
            filter: isLoading ? "blur(15px)" : "blur(0px)",
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className={`w-full ${maxWidth} grid grid-cols-1 md:grid-cols-2 bg-card rounded-2xl overflow-hidden`}
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className={contentPadding}>
            <Logo className="mb-4" />
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-2xl font-bold text-primary"
            >{title}</motion.h1>
            <p className="mt-1 text-sm text-foreground/80 font-medium">{subtitle}</p>
            <div className="mt-3">{children}</div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="hidden md:block relative"
          >
            <img src={worker} alt="Construction professional" className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}