import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Filter, X, Calendar, Clock, AlertTriangle, CheckCircle2, List, SlidersHorizontal, BarChart2, PieChart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/schedule')({
  component: ProjectSchedulePage,
});

interface TaskItem {
  id: string;
  task: string;
  activity: string;
  duration: string;
  start: string;
  end: string;
  status: string;
  variant: string;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "SCH-041", task: "Level 3 Structural Columns Pouring", activity: "Superstructure", duration: "5 Days", start: "2026-06-01", end: "2026-06-06", status: "On Track", variant: "amber" },
  { id: "SCH-042", task: "MEP Ventilation Ducting Alignment", activity: "Mechanical Systems", duration: "12 Days", start: "2026-05-10", end: "2026-05-22", status: "Delayed", variant: "destructive" },
  { id: "SCH-043", task: "Exterior Glass Curtain Wall Installation", activity: "Façade & Enclosure", duration: "20 Days", start: "2026-06-15", end: "2026-07-05", status: "Pending", variant: "secondary" },
  { id: "SCH-044", task: "Basement Waterproofing Injection", activity: "Substructure", duration: "8 Days", start: "2026-04-12", end: "2026-04-20", status: "Completed", variant: "success" },
  { id: "SCH-045", task: "Interior Drywall Framing (Zone A)", activity: "Interior Finishes", duration: "10 Days", start: "2026-06-10", end: "2026-06-20", status: "Pending", variant: "secondary" },
];

const formatDateDisplay = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

function ProjectSchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [targetFilterDate, setTargetFilterDate] = useState<string>(""); 
  
  // ADDED "graphs" TO TABS
  const [activeTab, setActiveTab] = useState<"table" | "gantt" | "graphs">("graphs");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem("builtra_tasks");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [taskName, setTaskName] = useState("");
  const [activityType, setActivityType] = useState("Superstructure");
  const [durationDays, setDurationDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("On Track");

  useEffect(() => {
    localStorage.setItem("builtra_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const categories = useMemo<string[]>(() => {
    return Array.from(new Set(tasks.map((t: TaskItem) => t.activity)));
  }, [tasks]);

  const filteredTasks = useMemo<TaskItem[]>(() => {
    return tasks.filter((item: TaskItem) => {
      const matchesSearch = 
        item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? item.activity === selectedCategory : true;
      const matchesDate = targetFilterDate ? item.start === targetFilterDate : true;
      
      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [searchQuery, selectedCategory, targetFilterDate, tasks]);

  // NEW: ANALYTICS DATA CALCULATOR FOR GRAPHS
  const analyticsData = useMemo(() => {
    const total = filteredTasks.length || 1; // Fallback to 1 to prevent divide-by-zero
    const completed = filteredTasks.filter(t => t.status === "Completed").length;
    const delayed = filteredTasks.filter(t => t.status === "Delayed").length;
    const onTrack = filteredTasks.filter(t => t.status === "On Track").length;
    const pending = filteredTasks.filter(t => t.status === "Pending").length;

    // Calculate Breakdown by Category
    const categoryStats: { name: string; count: number; percent: number }[] = [];
    categories.forEach(cat => {
      const count = filteredTasks.filter(t => t.activity === cat).length;
      if (count > 0) {
        categoryStats.push({ name: cat, count, percent: (count / total) * 100 });
      }
    });

    return {
      total: filteredTasks.length,
      completedPct: (completed / total) * 100,
      delayedPct: (delayed / total) * 100,
      onTrackPct: (onTrack / total) * 100,
      pendingPct: (pending / total) * 100,
      counts: { completed, delayed, onTrack, pending },
      categoryStats: categoryStats.sort((a, b) => b.count - a.count)
    };
  }, [filteredTasks, categories]);

  const ganttTimeBounds = useMemo(() => {
    if (filteredTasks.length === 0) {
      return { minTime: 0, maxTime: 0, totalDays: 1, dateLabels: [] };
    }
    
    let minTime = Infinity;
    let maxTime = -Infinity;
    
    filteredTasks.forEach(task => {
      const startMs = new Date(task.start).getTime();
      const endMs = new Date(task.end).getTime();
      if (!isNaN(startMs) && startMs < minTime) minTime = startMs;
      if (!isNaN(endMs) && endMs > maxTime) maxTime = endMs;
    });

    if (minTime === Infinity) {
      minTime = new Date("2026-04-01").getTime();
      maxTime = new Date("2026-07-15").getTime();
    } else {
      minTime -= 86400000 * 5;
      maxTime += 86400000 * 5;
    }

    const totalDays = Math.max(1, (maxTime - minTime) / 86400000);
    
    const dateLabels: string[] = [];
    for (let i = 0; i <= 3; i++) {
      const currentMs = minTime + (i * (maxTime - minTime) / 3);
      dateLabels.push(new Date(currentMs).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }));
    }

    return { minTime, maxTime, totalDays, dateLabels };
  }, [filteredTasks]);

  const executeSaveTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || !startDate || !endDate) {
      alert("Please fill in all mandatory fields");
      return;
    }

    const generatedId = `SCH-0${tasks.length + 41}`;
    let currentVariant = "secondary";
    if (taskStatus === "On Track") currentVariant = "amber";
    if (taskStatus === "Completed") currentVariant = "success";
    if (taskStatus === "Delayed") currentVariant = "destructive";

    const newTaskItem: TaskItem = {
      id: generatedId,
      task: taskName,
      activity: activityType,
      duration: durationDays ? `${durationDays} Days` : "TBD",
      start: startDate,
      end: endDate,
      status: taskStatus,
      variant: currentVariant
    };

    setTasks([...tasks, newTaskItem]);
    setIsDialogOpen(false);
    
    setTaskName("");
    setActivityType("Superstructure");
    setDurationDays("");
    setStartDate("");
    setEndDate("");
    setTaskStatus("On Track");
  };

  return (
    <div className="p-8 space-y-6 max-w-full bg-white min-h-screen text-slate-900 font-sans">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-slate-400 tracking-wider">SKYLINE TOWER — PHASE 2</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Project Master Schedule</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* UPDATED TABS WITH GRAPHS */}
          <div className="flex border rounded-lg bg-slate-100 p-1 gap-1 shadow-inner">
            <button 
              type="button"
              onClick={() => setActiveTab("graphs")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === "graphs" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              <PieChart className="w-3.5 h-3.5" /> Analytics
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("table")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === "table" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              <List className="w-3.5 h-3.5" /> Table List
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab("gantt")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === "gantt" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Gantt View
            </button>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="h-9 px-4 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold rounded-md flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
                <Plus className="w-4 h-4 stroke-[2.5]" /> Add Task / Milestone
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px] bg-white border p-6 shadow-2xl rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-base font-bold text-slate-900 border-b pb-2">Create New Project Task</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={executeSaveTask} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Task Description *</label>
                  <Input 
                    required 
                    placeholder="e.g., Brick Work Phase 1" 
                    value={taskName} 
                    onChange={e => setTaskName(e.target.value)} 
                    className="text-sm h-10 bg-white" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WBS Category</label>
                    <select 
                      className="w-full h-10 px-3 border border-slate-200 rounded-md text-sm bg-white text-slate-900 focus:outline-none" 
                      value={activityType} 
                      onChange={e => setActivityType(e.target.value)}
                    >
                      <option value="Superstructure">Superstructure</option>
                      <option value="Mechanical Systems">Mechanical Systems</option>
                      <option value="Façade & Enclosure">Façade & Enclosure</option>
                      <option value="Substructure">Substructure</option>
                      <option value="Interior Finishes">Interior Finishes</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration (Days)</label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 5" 
                      value={durationDays} 
                      onChange={e => setDurationDays(e.target.value)} 
                      className="h-10 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date *</label>
                    <input 
                      required
                      type="date" 
                      value={startDate} 
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-md text-sm bg-white text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Date *</label>
                    <input 
                      required
                      type="date" 
                      value={endDate} 
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-md text-sm bg-white text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Status Code</label>
                  <select 
                    className="w-full h-10 px-3 border border-slate-200 rounded-md text-sm bg-white text-slate-900 focus:outline-none" 
                    value={taskStatus} 
                    onChange={e => setTaskStatus(e.target.value)}
                  >
                    <option value="On Track">On Track</option>
                    <option value="Pending">Pending</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <DialogFooter className="pt-4 gap-2 border-t mt-4">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" size="sm" className="bg-[#E11D48] hover:bg-[#BE123C] text-white">Save Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* METRIC ANALYTICS CARDS */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-none border rounded-xl">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Active Tasks</p>
              <h3 className="text-2xl font-bold mt-1">{analyticsData.total}</h3>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="shadow-none border border-emerald-200 bg-emerald-500/5 rounded-xl">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Completed</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-700">{analyticsData.counts.completed}</h3>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="shadow-none border border-amber-200 bg-amber-500/5 rounded-xl">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">On Track</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-700">{analyticsData.counts.onTrack}</h3>
            </div>
            <Clock className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="shadow-none border border-destructive/20 bg-destructive/5 rounded-xl">
          <CardContent className="pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-destructive">Delayed Blockers</p>
              <h3 className="text-2xl font-bold mt-1 text-destructive">{analyticsData.counts.delayed}</h3>
            </div>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardContent>
        </Card>
      </div>

      {/* TOOLBAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2 flex-1 max-w-3xl">
            <div className="relative w-72">
              <Input 
                type="text" 
                placeholder="Search milestones, tasks, or IDs..." 
                className="w-full h-10 pl-9 pr-8 text-sm bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute right-2.5 top-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative flex items-center border border-slate-200 rounded-md bg-white px-2.5 h-10 hover:bg-slate-50">
              <Calendar className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="date"
                value={targetFilterDate}
                onChange={(e) => setTargetFilterDate(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer h-full border-none outline-none"
              />
              {targetFilterDate && (
                <button type="button" onClick={() => setTargetFilterDate("")} className="ml-1 text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="h-10 px-3 border border-slate-200 bg-white rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" /> Filter by Phase
              </button>

              {isFilterDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterDropdownOpen(false)} />
                  <div className="absolute left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-md shadow-lg z-50 p-1">
                    <button
                      type="button"
                      onClick={() => { setSelectedCategory(null); setIsFilterDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded block"
                    >
                      All Phases
                    </button>
                    {categories.map((cat: string) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => { setSelectedCategory(cat); setIsFilterDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded block"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {(selectedCategory || targetFilterDate) && (
              <button 
                type="button"
                onClick={() => { setSelectedCategory(null); setTargetFilterDate(""); }}
                className="text-xs text-rose-600 hover:underline font-semibold ml-2"
              >
                Clear Active Filters
              </button>
            )}
          </div>
        </div>

        {activeTab === "graphs" && (
          /* NEW: GRAPHS & PERCENTAGE ANALYTICS VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Status Breakdown Stacked Bar Chart */}
            <Card className="shadow-none border border-slate-200 rounded-xl bg-white">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <PieChart className="w-4 h-4" /> Overall Project Health
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* The Visual Stacked Bar */}
                <div className="w-full h-8 flex rounded-full overflow-hidden shadow-inner bg-slate-100">
                  {analyticsData.completedPct > 0 && <div style={{ width: `${analyticsData.completedPct}%` }} className="bg-emerald-500 h-full transition-all duration-500" title={`Completed: ${analyticsData.completedPct.toFixed(1)}%`} />}
                  {analyticsData.onTrackPct > 0 && <div style={{ width: `${analyticsData.onTrackPct}%` }} className="bg-amber-400 h-full transition-all duration-500" title={`On Track: ${analyticsData.onTrackPct.toFixed(1)}%`} />}
                  {analyticsData.pendingPct > 0 && <div style={{ width: `${analyticsData.pendingPct}%` }} className="bg-sky-400 h-full transition-all duration-500" title={`Pending: ${analyticsData.pendingPct.toFixed(1)}%`} />}
                  {analyticsData.delayedPct > 0 && <div style={{ width: `${analyticsData.delayedPct}%` }} className="bg-rose-500 h-full transition-all duration-500" title={`Delayed: ${analyticsData.delayedPct.toFixed(1)}%`} />}
                </div>

                {/* Percentage Legend & Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Completed</p>
                      <p className="text-lg font-bold text-slate-900">{analyticsData.completedPct.toFixed(0)}% <span className="text-xs font-normal text-slate-400">({analyticsData.counts.completed})</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">On Track</p>
                      <p className="text-lg font-bold text-slate-900">{analyticsData.onTrackPct.toFixed(0)}% <span className="text-xs font-normal text-slate-400">({analyticsData.counts.onTrack})</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-sky-400" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Pending</p>
                      <p className="text-lg font-bold text-slate-900">{analyticsData.pendingPct.toFixed(0)}% <span className="text-xs font-normal text-slate-400">({analyticsData.counts.pending})</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Delayed</p>
                      <p className="text-lg font-bold text-rose-600">{analyticsData.delayedPct.toFixed(0)}% <span className="text-xs font-normal text-rose-400">({analyticsData.counts.delayed})</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution Bar Chart */}
            <Card className="shadow-none border border-slate-200 rounded-xl bg-white">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" /> Task Distribution by Phase
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {analyticsData.categoryStats.length > 0 ? (
                  analyticsData.categoryStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{stat.name}</span>
                        <span className="text-slate-500">{stat.count} tasks ({stat.percent.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${stat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400 text-sm">No category data available</div>
                )}
              </CardContent>
            </Card>

          </div>
        )}

        {activeTab === "table" && (
          /* LIST VIEW TABLE */
          <div className="pt-2 overflow-x-auto">
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F8F9FA] border-b border-slate-200 hover:bg-[#F8F9FA]">
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider pl-4 w-[110px]">Task ID</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider w-[320px]">Task Description</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider">Category / WBS</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider">Duration</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider">Start Date</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider">End Date</TableHead>
                    <TableHead className="h-10 text-xs font-bold text-slate-700 uppercase tracking-wider text-right pr-4">Status Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100 bg-white">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((item: TaskItem) => (
                      <TableRow key={item.id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors h-12">
                        <TableCell className="pl-4 font-mono text-xs font-bold text-slate-400">{item.id}</TableCell>
                        <TableCell className="font-semibold text-slate-900 text-sm">{item.task}</TableCell>
                        <TableCell className="text-slate-600 text-sm font-medium">{item.activity}</TableCell>
                        <TableCell className="text-slate-500 text-sm">{item.duration}</TableCell>
                        <TableCell className="text-slate-500 text-sm">{formatDateDisplay(item.start)}</TableCell>
                        <TableCell className="text-slate-500 text-sm">{formatDateDisplay(item.end)}</TableCell>
                        <TableCell className="text-right pr-4">
                          <Badge 
                            variant="outline" 
                            className={`px-2.5 py-0.5 rounded text-xs font-medium border ${
                              item.variant === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                              item.variant === "amber" ? "bg-amber-50 text-amber-700 border-amber-100" :
                              item.variant === "destructive" ? "bg-rose-50 text-rose-700 border-rose-100" :
                              "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-16 text-slate-400 text-sm font-medium">
                        No active tasks found matching the layout filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === "gantt" && (
          /* GANTT TIMELINE VIEW */
          <Card className="shadow-none border border-slate-200 p-6 min-h-[420px] rounded-xl bg-white overflow-x-auto">
            <div className="space-y-6 min-w-[750px] pt-2">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Timeline Chart Tracker</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                  Dynamic Relative Mapping Engine
                </span>
              </div>
              
              <div className="grid grid-cols-5 items-center gap-4 border-b pb-2 bg-slate-50/70 p-2 rounded-lg font-medium text-xs text-slate-400">
                <div className="pl-2 font-bold uppercase tracking-wider text-slate-500">Project Tasks / Milestones</div>
                <div className="col-span-3 relative h-5 flex justify-between px-1 font-mono font-semibold text-slate-500">
                  {ganttTimeBounds.dateLabels.map((label, idx) => (
                    <span key={idx}>{label}</span>
                  ))}
                </div>
                <div className="text-right pr-4 font-bold uppercase tracking-wider text-slate-500">Status</div>
              </div>

              <div className="space-y-3 pt-1">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((item) => {
                    const taskStart = new Date(item.start).getTime();
                    const taskEnd = new Date(item.end).getTime();

                    let leftPercent = 0;
                    let widthPercent = 100;

                    if (!isNaN(taskStart) && !isNaN(taskEnd) && ganttTimeBounds.totalDays > 0) {
                      leftPercent = ((taskStart - ganttTimeBounds.minTime) / (86400000 * ganttTimeBounds.totalDays)) * 100;
                      const spanPercent = ((taskEnd - taskStart) / (86400000 * ganttTimeBounds.totalDays)) * 100;
                      widthPercent = Math.max(6, spanPercent); 
                    }

                    if (leftPercent < 0) leftPercent = 0;
                    if (leftPercent + widthPercent > 100) widthPercent = 100 - leftPercent;

                    let barColorClass = "bg-slate-400 shadow-slate-300";
                    if (item.status === "On Track") barColorClass = "bg-amber-500 shadow-amber-200";
                    if (item.status === "Completed") barColorClass = "bg-emerald-500 shadow-emerald-200";
                    if (item.status === "Delayed") barColorClass = "bg-rose-500 shadow-rose-200";
                    if (item.status === "Pending") barColorClass = "bg-sky-400 shadow-sky-200";

                    return (
                      <div key={item.id} className="grid grid-cols-5 items-center gap-4 group hover:bg-slate-50/40 p-2 rounded-xl transition-all border border-transparent hover:border-slate-100">
                        <div className="space-y-0.5 truncate pr-2 pl-1">
                          <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#E11D48] transition-colors">{item.task}</p>
                          <p className="text-[11px] font-semibold text-slate-400 font-mono">
                            {item.id} • <span className="text-slate-500">{item.duration}</span>
                          </p>
                        </div>
                        
                        <div className="col-span-3 bg-slate-100/70 h-6 rounded-md relative shadow-inner border border-slate-200/50">
                          <div 
                            className={`absolute h-full ${barColorClass} top-0 rounded-md shadow-sm transition-all duration-300 group-hover:opacity-90`} 
                            style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                            title={`${item.task}: ${formatDateDisplay(item.start)} to ${formatDateDisplay(item.end)}`}
                          />
                        </div>

                        <div className="text-right pr-2">
                          <Badge 
                            variant="outline" 
                            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                              item.variant === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                              item.variant === "amber" ? "bg-amber-50 text-amber-700 border-amber-100" :
                              item.variant === "destructive" ? "bg-rose-50 text-rose-700 border-rose-100" :
                              "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-16 text-slate-400 text-sm font-medium">
                    No active timeline bars to display for selected filter.
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>

    </div>
  );
}