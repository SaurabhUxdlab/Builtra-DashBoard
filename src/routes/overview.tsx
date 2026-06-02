import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Bell, Search, Plus, SidebarIcon, Headphones, ChevronDown, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/overview")({
  head: () => ({
    meta: [
      { title: "Overview — Builtraa" },
      { name: "description", content: "Project overview and analysis." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {sidebarOpen && <Sidebar />}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-xl hover:bg-secondary transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <SidebarIcon className="h-5 w-5 text-primary" />
            </button>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500 text-sm font-semibold text-white">
                <span className="text-xs">B</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=80&q=80')] bg-cover bg-center" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">Riverside Corporate Plaza</div>
                  <div className="text-xs text-muted-foreground">Commercial Office Building</div>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="flex items-center rounded-2xl border border-border bg-secondary px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search projects, files, people..."
                className="ml-3 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-2xl p-2 hover:bg-secondary transition">
              <Headphones className="h-5 w-5 text-foreground" />
            </button>
            <button className="relative rounded-2xl p-2 hover:bg-secondary transition">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-2">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-500" />
              <div className="hidden items-center gap-1 sm:flex">
                <span className="text-sm font-semibold">Musiq</span>
                <span className="text-xs text-muted-foreground">@musiq</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 overflow-y-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-4"
          >
            <Link to="/dashboard">
              <button className="flex items-center justify-center h-10 w-10 rounded-xl hover:bg-secondary transition">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold">Project Overview</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Comprehensive analysis and project insights
              </p>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] border border-border bg-card p-8 shadow-card"
          >
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">Project Status</p>
                <p className="text-4xl font-bold text-primary">75%</p>
                <p className="text-sm text-muted-foreground">On track completion</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">Team Members</p>
                <p className="text-4xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Active on site</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">Tasks Completed</p>
                <p className="text-4xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground">Out of 208 total</p>
              </div>
            </div>
          </motion.section>

          <div className="flex gap-4">
            <Link to="/dashboard">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
                <Plus className="h-4 w-4" /> Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
