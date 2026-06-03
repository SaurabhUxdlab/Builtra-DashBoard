import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Bell, Search, Plus, SidebarIcon, Headphones, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Builtraa" },
      { name: "description", content: "Your Builtraa project overview." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex bg-background text-foreground">
      <Sidebar open={sidebarOpen} collapsed={sidebarCollapsed} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-xl hover:bg-secondary transition"
              onClick={() => {
                if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
                  setSidebarCollapsed((s) => !s);
                } else {
                  setSidebarOpen(true);
                }
              }}
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
      </main>
    </div>
  );
}
