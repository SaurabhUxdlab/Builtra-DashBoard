import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Builtraa" }, { name: "description", content: "Create your Builtraa workspace." }] }),
  component: Signup,
});

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup and show blur transition before opening dashboard
    setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("just_signed_up", "true");
      }
      navigate({ to: "/dashboard" });
    }, 1200);
  };

  return (
    <AuthShell 
      title="Create Account" 
      subtitle="Start managing your projects with Builtraa."
      maxWidth="max-w-2xl"
      contentPadding="p-5 md:p-6"
      isLoading={isLoading}
    >
      <motion.form 
        className="space-y-3 relative z-10"
        onSubmit={handleSubmit}
        animate={isLoading ? { opacity: 0.45, filter: "blur(8px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <label className="text-xs font-semibold">Full Name</label>
          <input required value={form.name} onChange={update("name")} disabled={isLoading} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
        </div>
        <div>
          <label className="text-xs font-semibold">Email</label>
          <input type="email" required value={form.email} onChange={update("email")} disabled={isLoading} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
        </div>
        <div>
          <label className="text-xs font-semibold">Password</label>
          <input type="password" required value={form.password} onChange={update("password")} disabled={isLoading} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
        </div>
        <motion.button 
          whileHover={!isLoading ? { scale: 1.02 } : {}} 
          whileTap={!isLoading ? { scale: 0.98 } : {}} 
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md py-2 text-sm font-semibold text-primary-foreground disabled:opacity-70 relative flex items-center justify-center gap-2"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
              <span>Creating Account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </motion.button>
        <div className="relative text-center my-2">
          <span className="bg-card relative z-10 px-2 text-[10px] text-muted-foreground uppercase tracking-wider">Or continue with</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <motion.button whileHover={!isLoading ? { scale: 1.01 } : {}} type="button" disabled={isLoading} className="w-full flex items-center justify-center gap-2 rounded-md border border-border bg-card py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50">
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Sign up with Google
        </motion.button>
        <p className="text-center text-xs mt-2">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </motion.form>
    </AuthShell>
  );
}