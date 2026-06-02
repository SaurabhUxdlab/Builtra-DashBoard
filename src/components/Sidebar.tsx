import { useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Home, Users, FolderOpen, Image as ImageIcon, MessageSquare,
  ClipboardList, FileText, Search, Pencil, ListChecks, Megaphone,
  Handshake, AlertTriangle, Mail, HardHat, BookUser, Calendar, ChevronDown, Edit3,
} from "lucide-react";
import { Logo } from "./Logo";

const overview = [
  { title: "Overview", url: "/dashboard", icon: Home },
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

export function Sidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-6 py-5 border-b border-sidebar-border">
        <Logo />
      </div>
      <div className="px-4 py-4 border-b border-sidebar-border">
        <button className="w-full flex items-center justify-between text-left text-sm font-semibold">
          My Workspace <ChevronDown className="h-4 w-4" />
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
                  <a href={item.url} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/60"}`}>
                    <item.icon className="h-4 w-4" /> {item.title}
                  </a>
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
                <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent/60 cursor-pointer">
                  <item.icon className="h-4 w-4" /> {item.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}