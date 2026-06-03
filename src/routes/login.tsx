import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Builtraa" }, { name: "description", content: "Login to your Builtraa account." }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - replace with actual API call and animate blur transition
    setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("just_logged_in", "true");
      }
      navigate({ to: "/dashboard" });
    }, 1500);
  };
  
  return (
    <AuthShell title="Welcome Back" subtitle="Login to your Builtraa account." isLoading={isLoading}>
      <motion.form 
        className="space-y-4" 
        onSubmit={handleSubmit}
        animate={isLoading ? { opacity: 0.5, filter: "blur(5px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Password</label>
            <a className="text-sm text-primary font-medium hover:underline cursor-pointer">Forgot your password?</a>
          </div>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
        </div>
        <motion.button 
          whileHover={!isLoading ? { scale: 1.02 } : {}} 
          whileTap={!isLoading ? { scale: 0.98 } : {}} 
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md py-2.5 text-sm font-semibold text-primary-foreground relative flex items-center justify-center gap-2 disabled:opacity-70"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </motion.button>
        <div className="relative text-center">
          <span className="bg-card relative z-10 px-3 text-xs text-muted-foreground">Or continue with</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        </div>
        <motion.button whileHover={{ scale: 1.01 }} type="button" disabled={isLoading} className="w-full flex items-center justify-center gap-2 rounded-md border border-border bg-card py-2.5 text-sm font-medium hover:bg-secondary disabled:opacity-50">
          <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Login with Google
        </motion.button>
        <p className="text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Register</Link>
        </p>
      </motion.form>
    </AuthShell>
  );
}