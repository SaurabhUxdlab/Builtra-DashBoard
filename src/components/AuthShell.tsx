import { motion } from "motion/react";
import { type ReactNode } from "react";
import worker from "@/assets/construction-worker.jpg";
import { Logo } from "./Logo";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-72" style={{ background: "var(--gradient-brand)" }} />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-card rounded-2xl overflow-hidden"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="p-6 sm:p-8 md:p-10">
            <Logo className="mb-8" />
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-3xl font-bold text-primary"
            >{title}</motion.h1>
            <p className="mt-1 text-sm text-foreground/80 font-medium">{subtitle}</p>
            <div className="mt-6">{children}</div>
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