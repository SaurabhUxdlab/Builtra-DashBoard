import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Home, Users, FolderOpen, Image as ImageIcon, MessageSquare,
  ClipboardList, FileText, Search, Pencil, ListChecks, Megaphone,
  Handshake, AlertTriangle, Mail, HardHat, BookUser, Calendar, ChevronDown, Edit3, X
} from "lucide-react";
import { Logo } from "./Logo";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  projectName?: string;
};

const overview = [
  { title: "Overview", url: "/overview", icon: Home },
  { title: "Team", url: "#", icon: Users },
  { title: "Documents", url: "#", icon: FolderOpen },
  { title: "Photos", url: "#", icon: ImageIcon },
  { title: "Conversations", url: "#", icon: MessageSquare },
];
const tools = [
  { title: "Punch List", icon: ClipboardList },
  { title: "Daily Log", icon: FileText },
  { title: "Observations", icon: Search },
  { title: "Drawing", icon: Pencil },
  { title: "Action Plans", icon: ListChecks },
  { title: "Announcements", icon: Megaphone },
  { title: "Commitments", icon: Handshake },
  { title: "Coordination Issues", icon: AlertTriangle },
  { title: "Correspondence", icon: Mail },
  { title: "Crews", icon: HardHat },
  { title: "Directory", icon: BookUser },
  { title: "Schedule", icon: Calendar },
];

export function Sidebar({ open = false, onClose, collapsed = false, projectName }: SidebarProps) {
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <>
      {!collapsed && (
        <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-6 py-5 border-b border-sidebar-border flex items-center justify-between">
          <Logo />
        </div>
        <div className="px-4 py-4 border-b border-sidebar-border">
          <button className="w-full flex items-center justify-between text-left text-sm font-semibold">
            {projectName || "My Workspace"} <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="px-3 mb-2 text-xs font-bold  tracking-wider text-primary flex items-center justify-between">
              Project Overview & Setup <ChevronDown className="h-3 w-3" />
            </div>
            <ul className="space-y-1">
              {overview.map((item) => {
                const active = path === item.url;
                return (
                  <li key={item.title}>
                    <Link to={item.url} className={`flex items-center gap-3 rounded-md px-3 py-1 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60"}`}>
                      <item.icon className="h-4 w-4" /> {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="px-3 mb-2 text-xs font-bold tracking-wider text-primary flex items-center justify-between">
              <span className="flex items-center gap-1">Management Tools <ChevronDown className="h-3 w-3" /></span>
              <Edit3 className="h-3.5 w-3.5" />
            </div>
            <ul className="space-y-1">
              {tools.map((item, i) => (
                <motion.li key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <span className="flex items-center gap-3 rounded-md px-3 py-1 text-sm hover:bg-sidebar-accent/60 cursor-pointer">
                    <item.icon className="h-4 w-4" /> {item.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </nav>
        </aside>
      )}

      <div className={`fixed inset-0 z-40 lg:hidden ${open ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <aside className={`relative z-50 flex h-full w-[min(90vw,320px)] flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="px-4 py-4 border-b border-sidebar-border flex items-center justify-between">
            <Logo />
            <button className="rounded-lg p-2 hover:bg-secondary" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-4 py-4 border-b border-sidebar-border">
            <button className="w-full flex items-center justify-between text-left text-sm font-semibold">
              {projectName || "My Workspace"} <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            <div>
              <div className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                Project Overview & Setup <ChevronDown className="h-3 w-3" />
              </div>
              <ul className="space-y-1">
                {overview.map((item) => {
                  const active = path === item.url;
                  return (
                    <li key={item.title}>
                      <Link to={item.url} onClick={onClose} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60"}`}>
                        <item.icon className="h-4 w-4" /> {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between">
                <span className="flex items-center gap-1">Management Tools <ChevronDown className="h-3 w-3" /></span>
                <Edit3 className="h-3.5 w-3.5" />
              </div>
              <ul className="space-y-1">
                {tools.map((item, i) => (
                  <motion.li key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <span className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent/60 cursor-pointer">
                      <item.icon className="h-4 w-4" /> {item.title}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
     