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
  return (
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
            <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">
              Project Status
            </p>
            <p className="text-4xl font-bold text-primary">75%</p>
            <p className="text-sm text-muted-foreground">On track completion</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">
              Team Members
            </p>
            <p className="text-4xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Active on site</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-[0.16em]">
              Tasks Completed
            </p>
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
  );
}
