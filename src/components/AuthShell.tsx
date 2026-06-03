import { motion } from "motion/react";
import { type ReactNode } from "react";
import { 
  Search, Bell, ChevronDown, LayoutGrid, Filter, Plus, Headphones 
} from "lucide-react";
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
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-neutral-50 flex flex-col w-full"
    >
      {/* Black top header */}
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EA1B53] flex items-center justify-center font-bold text-white text-base">B</div>
          <span className="text-xl font-bold tracking-tight text-white">Builtraa</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative flex items-center bg-[#1C1C1E] border border-neutral-800 rounded-xl px-4 py-2 shadow-inner">
            <Search className="h-4 w-4 text-neutral-500 mr-3 shrink-0" />
            <div className="text-sm text-neutral-500">Search or Ask a question...</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EA1B53]/15 text-[#EA1B53] border border-[#EA1B53]/25">
            <Headphones className="h-4 w-4" />
          </div>
          <div className="relative h-10 w-10 rounded-full flex items-center justify-center bg-[#EA1B53]/15 text-[#EA1B53] border border-[#EA1B53]/25">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#EA1B53]" />
          </div>
          
          <div className="flex items-center gap-3 pl-2 border-l border-neutral-800">
            <div className="h-9 w-9 rounded-full bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80')] bg-cover bg-center border border-neutral-700" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold leading-none">Musiq</span>
              <span className="text-[10px] text-neutral-500 leading-none mt-1">musiq@gmail.com</span>
            </div>
            <ChevronDown className="h-3 w-3 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Subheader */}
      <div className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg">
            <LayoutGrid className="h-5 w-5 text-[#EA1B53]" />
            <span>Portfolio</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium border-l border-neutral-200 pl-6 h-6">
            <div className="text-[#EA1B53] border-b-2 border-[#EA1B53] pb-1 h-full font-semibold">
              Projects
            </div>
            <div className="text-neutral-500 pb-1 h-full">
              Executive Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Search and table */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1 flex items-center bg-white border border-neutral-200 rounded-xl px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 text-neutral-400 mr-2.5 shrink-0" />
              <div className="text-sm text-neutral-400">Search Projects</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600">
              <Filter className="h-4 w-4" />
            </div>
          </div>
          
          <div className="bg-[#EA1B53] text-white font-semibold text-sm rounded-xl px-5 py-2.5 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-4">Project Number</th>
                <th className="py-4 px-4">Address</th>
                <th className="py-4 px-4">City</th>
                <th className="py-4 px-4">State</th>
                <th className="py-4 px-4">Zip</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Stage</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              <tr>
                <td className="py-4 px-6 font-medium text-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=80&q=80')] bg-cover bg-center border border-neutral-200 shrink-0 shadow-sm" />
                    <span className="text-[#EA1B53] font-bold">Riverside Corporate Plaza</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-neutral-600 font-mono text-xs">TK-001</td>
                <td className="py-4 px-4 text-neutral-600">9 Bobbink Terrace</td>
                <td className="py-4 px-4 text-neutral-600">East Rutherford</td>
                <td className="py-4 px-4 text-neutral-600">New Jersey</td>
                <td className="py-4 px-4 text-neutral-600 font-mono text-xs">07073</td>
                <td className="py-4 px-4 text-neutral-600 font-mono text-xs">8668224449</td>
                <td className="py-4 px-4">
                  <div className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Active*</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-neutral-600">Bidding</td>
                <td className="py-4 px-6 text-right text-[#EA1B53] font-bold text-xs">
                  Go to Workspace &gt;
                </td>
              </tr>
            </tbody>
          </table>
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