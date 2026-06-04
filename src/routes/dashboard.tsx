import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Bell,
  Search,
  Plus,
  SidebarIcon,
  Headphones,
  ChevronDown,
  LayoutGrid,
  Filter,
  X,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Builtraa" },
      { name: "description", content: "Your Builtraa project overview." },
    ],
  }),
  component: Dashboard,
});

type Project = {
  id: string;
  name: string;
  number: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  status: "Active" | "Inactive";
  stage: string;
  image: string;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Riverside Corporate Plaza",
    number: "TK-001",
    address: "9 Bobbink Terrace",
    city: "East Rutherford",
    state: "New Jersey",
    zip: "07073",
    phone: "8658224449",
    status: "Active",
    stage: "Bidding",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=80&q=80",
  },
];

function Dashboard() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isDashboardRoute = path === "/dashboard";
  const isDashboardChildRoute = path.startsWith("/dashboard/") && path !== "/dashboard";

  const [shouldAnimateBlur] = useState(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("just_logged_in");
      if (loggedIn === "true") {
        sessionStorage.removeItem("just_logged_in");
        return true;
      }
    }
    return false;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("builtraa_projects");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modal form state
  const [form, setForm] = useState({
    name: "",
    number: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    status: "Active" as "Active" | "Inactive",
    stage: "Bidding",
  });

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem("builtraa_projects", JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newProj: Project = {
      id: Date.now().toString(),
      name: form.name,
      number: form.number || `TK-${String(projects.length + 1).padStart(3, "0")}`,
      address: form.address || "9 Bobbink Terrace",
      city: form.city || "East Rutherford",
      state: form.state || "New Jersey",
      zip: form.zip || "07073",
      phone: form.phone || "8658224449",
      status: form.status,
      stage: form.stage,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=80&h=80&q=80",
    };

    setProjects([newProj, ...projects]);
    setShowNewProjectModal(false);
    // Reset form
    setForm({
      name: "",
      number: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      status: "Active",
      stage: "Bidding",
    });
  };

  const filteredProjects = projects.filter((p) => {
    const query = searchQuery.toLowerCase();
    const gQuery = globalSearch.toLowerCase();

    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.number.toLowerCase().includes(query) ||
      p.address.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.state.toLowerCase().includes(query);

    const matchesGlobal =
      p.name.toLowerCase().includes(gQuery) || p.number.toLowerCase().includes(gQuery);

    return matchesSearch && matchesGlobal;
  });

  return (
    <motion.div
      initial={
        shouldAnimateBlur
          ? { opacity: 0.1, filter: "blur(12px)" }
          : { opacity: 0.1, filter: "blur(10px)" }
      }
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen overflow-hidden flex flex-col bg-neutral-50 text-foreground w-full relative"
    >
      {/* Dynamic View rendering */}
      {isDashboardChildRoute ? (
        <div className="h-screen overflow-hidden flex w-full">
          <Sidebar
            open={sidebarOpen}
            collapsed={sidebarCollapsed}
            onClose={() => setSidebarOpen(false)}
            projectName={activeProject?.name ?? projects[0]?.name ?? "My Workspace"}
          />

          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card shrink-0">
              <div className="flex items-center gap-4">
                <button
                  className="p-2 rounded-xl hover:bg-secondary transition cursor-pointer text-neutral-500 hover:text-neutral-900"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.matchMedia("(min-width: 1024px)").matches
                    ) {
                      setSidebarCollapsed((s) => !s);
                    } else {
                      setSidebarOpen(true);
                    }
                  }}
                >
                  <SidebarIcon className="h-5 w-5 text-primary" />
                </button>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EA1B53] text-sm font-semibold text-white">
                    <span className="text-xs">
                      {(activeProject ?? projects[0])?.name?.charAt(0) ?? "B"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-2xl bg-cover bg-center border border-border"
                      style={{ backgroundImage: `url(${(activeProject ?? projects[0])?.image})` }}
                    />
                    <div className="min-w-0 text-left">
                      <div className="text-sm font-semibold truncate">
                        {activeProject?.name ?? projects[0]?.name ?? "My Workspace"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activeProject?.stage ?? projects[0]?.stage ?? "Bidding"}
                      </div>
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
                <button className="rounded-2xl p-2 hover:bg-secondary transition cursor-pointer text-neutral-500 hover:text-neutral-900">
                  <Headphones className="h-5 w-5" />
                </button>
                <button className="relative rounded-2xl p-2 hover:bg-secondary transition cursor-pointer text-neutral-500 hover:text-neutral-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EA1B53]" />
                </button>
                <div className="flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-2 select-none">
                  <div className="h-10 w-10 rounded-full bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80')] bg-cover bg-center border border-neutral-200" />
                  <div className="hidden items-center gap-1 sm:flex">
                    <span className="text-sm font-semibold">Musiq</span>
                    <span className="text-xs text-muted-foreground">@musiq</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 flex flex-col gap-6 bg-secondary/30">
              <Outlet />
            </div>
          </main>
        </div>
      ) : !activeProject ? (
        // PORTFOLIO VIEW (Matches screenshot exactly)
        <div className="h-screen overflow-y-auto flex flex-col w-full">
          {/* Black top header */}
          <header className="bg-black text-white px-6 py-3 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3 select-none">
              <img
                src="/builtraa-logo.png"
                alt="Builtraa Logo"
                className="h-8 w-8 object-contain rounded-lg"
              />
              <span className="text-xl font-bold tracking-tight text-white">Builtraa</span>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative flex items-center bg-white border border-neutral-200 rounded-xl px-4 py-2 shadow-sm focus-within:border-neutral-300 transition">
                <Sparkles className="h-4 w-4 text-[#EA1B53] mr-3 shrink-0" />
                <input
                  placeholder="Search or Ask a question.."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="h-10 w-10 rounded-xl flex items-center justify-center bg-[#EA1B53] text-white hover:bg-[#D01648] transition shadow-sm cursor-pointer border-0">
                <Headphones className="h-4 w-4" />
              </button>
              <button className="relative h-10 w-10 rounded-xl flex items-center justify-center bg-[#EA1B53] text-white hover:bg-[#D01648] transition shadow-sm cursor-pointer border-0">
                <Bell className="h-4 w-4" />
              </button>

              {/* Profile Card */}
              <div className="flex items-center gap-3 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm cursor-pointer transition select-none">
                <div className="h-8 w-8 rounded-full bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80')] bg-cover bg-center border border-neutral-200" />
                <div className="hidden flex-col md:flex text-left">
                  <span className="text-xs font-bold leading-none text-neutral-800">Musfiq</span>
                  <span className="text-[9px] text-neutral-400 leading-none mt-0.5">
                    musfiq@gmail.com
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </div>
            </div>
          </header>

          {/* Subheader */}
          <div className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg select-none">
                <LayoutGrid className="h-5 w-5 text-[#EA1B53]" />
                <span>Portfolio</span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-4 text-sm font-medium border-l border-neutral-200 pl-6 h-6">
                <button className="text-[#EA1B53] border-b-2 border-[#EA1B53] pb-1 h-full font-semibold transition cursor-pointer">
                  Projects
                </button>
                <button className="text-neutral-500 hover:text-neutral-950 pb-1 h-full transition cursor-pointer">
                  Executive Dashboard
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5 w-full flex flex-col">
            <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden p-5 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center bg-[#F3F4F6] rounded-lg px-3 py-1.5 w-64 border border-transparent focus-within:bg-white focus-within:border-neutral-300 transition">
                    <input
                      placeholder="Search Projects"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400"
                    />
                    <Search className="h-3.5 w-3.5 text-neutral-400 ml-2 shrink-0" />
                  </div>
                  <button className="h-8 w-8 rounded-lg bg-[#F3F4F6] hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition border-0">
                    <Filter className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="bg-[#EA1B53] text-white font-semibold text-xs rounded-lg px-3.5 py-1.5 flex items-center justify-center gap-1 hover:bg-[#D01648] transition shadow-sm border-0 cursor-pointer h-8"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Project</span>
                </button>
              </div>

              {/* Table */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F3F4F6] text-neutral-500 font-bold text-[10px] uppercase tracking-wider select-none">
                        <th className="py-2.5 px-3 border border-neutral-200 w-12"></th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Name
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Project Number
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Address
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          City
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          State
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Zip
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Phone
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Status
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 whitespace-nowrap">
                          Stage
                        </th>
                        <th className="py-2.5 px-3 border border-neutral-200 w-40"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-xs">
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td
                            colSpan={11}
                            className="py-8 text-center text-neutral-400 font-medium bg-neutral-50/50 border border-neutral-200"
                          >
                            No projects found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((p) => (
                          <tr key={p.id} className="hover:bg-neutral-50/40 transition">
                            <td className="py-2 px-3 border border-neutral-200 text-center">
                              <div
                                className="h-8 w-8 rounded bg-cover bg-center border border-neutral-200 mx-auto shadow-sm"
                                style={{ backgroundImage: `url(${p.image})` }}
                              />
                            </td>
                            <td className="py-2 px-3 font-semibold text-neutral-900 border border-neutral-200">
                              <button
                                onClick={() => setActiveProject(p)}
                                className="text-[#EA1B53] font-semibold text-left hover:underline transition cursor-pointer border-0 bg-transparent p-0"
                              >
                                {p.name}
                              </button>
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200 font-normal">
                              {p.number}
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200">
                              {p.address}
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200">
                              {p.city}
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200">
                              {p.state}
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200 font-normal">
                              {p.zip}
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200 font-normal">
                              {p.phone}
                            </td>
                            <td className="py-2 px-3 border border-neutral-200">
                              <span className="text-emerald-600 font-semibold">{p.status}*</span>
                            </td>
                            <td className="py-2 px-3 text-neutral-600 border border-neutral-200">
                              {p.stage}
                            </td>
                            <td className="py-2 px-3 text-right border border-neutral-200">
                              <button
                                onClick={() => setActiveProject(p)}
                                className="text-[#EA1B53] font-semibold hover:underline inline-flex items-center gap-0.5 ml-auto transition cursor-pointer border-0 bg-transparent p-0 whitespace-nowrap"
                              >
                                <span>Go to Workspace &gt;</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // DYNAMIC WORKSPACE VIEW (Active project selected)
        <div className="h-screen overflow-hidden flex w-full">
          <Sidebar
            open={sidebarOpen}
            collapsed={sidebarCollapsed}
            onClose={() => setSidebarOpen(false)}
            projectName={activeProject.name}
          />

          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-card shrink-0">
              {/* Left Section */}
              <div className="flex items-center gap-3">
                <button
                  className="p-2 rounded-lg hover:bg-secondary transition"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.matchMedia("(min-width: 1024px)").matches
                    ) {
                      setSidebarCollapsed((s) => !s);
                    } else {
                      setSidebarOpen(true);
                    }
                  }}
                >
                  <SidebarIcon className="h-5 w-5 text-[#EA1B53]" />
                </button>

                {/* Project Selector */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-2 py-1 min-w-[320px]">
                  <div
                    className="h-8 w-8 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeProject.image})` }}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground leading-none">
                      Commercial Office Building
                    </p>
                    <p className="text-sm font-medium truncate">{activeProject.name}</p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>

                {/* Search Button */}
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-secondary hover:bg-muted transition">
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary">
                  <Headphones className="h-4 w-4 text-[#EA1B53]" />
                </button>

                <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary">
                  <Bell className="h-4 w-4 text-[#EA1B53]" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#EA1B53]" />
                </button>

                {/* User */}
                <div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1 border border-border cursor-pointer">
                  <div
                    className="h-8 w-8 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80)",
                    }}
                  />

                  <div className="hidden sm:block leading-tight">
                    <p className="text-xs font-medium">Musfiq</p>
                    <p className="text-[10px] text-muted-foreground">@musfiq.me</p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </header>
            {/* Dashboard Content */}
          </main>
        </div>
      )}

      {/* NEW PROJECT MODAL */}
      <AnimatePresence>
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewProjectModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden z-10 border border-neutral-200"
            >
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 select-none">
                <h3 className="font-bold text-base text-neutral-900">Create New Project</h3>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="rounded-lg p-1.5 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="p-6 space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Project Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Riverside Corporate Plaza"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Project Number
                    </label>
                    <input
                      value={form.number}
                      onChange={(e) => setForm({ ...form, number: e.target.value })}
                      placeholder="e.g. TK-001"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 8668224449"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Address
                    </label>
                    <input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. 9 Bobbink Terrace"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      City
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. East Rutherford"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      State
                    </label>
                    <input
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="e.g. New Jersey"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Zip Code
                    </label>
                    <input
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      placeholder="e.g. 07073"
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Stage
                    </label>
                    <select
                      value={form.stage}
                      onChange={(e) => setForm({ ...form, stage: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA1B53]/25 focus:border-[#EA1B53] transition"
                    >
                      <option value="Bidding">Bidding</option>
                      <option value="Planning">Planning</option>
                      <option value="Construction">Construction</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3 select-none">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-semibold hover:bg-neutral-50 transition cursor-pointer text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#EA1B53] text-white font-semibold text-sm rounded-xl px-5 py-2 hover:bg-[#D01648] transition shadow-md cursor-pointer"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
