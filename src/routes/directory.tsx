import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Plus, Search, Filter, Calendar, AlertTriangle, Clock, CheckCircle, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute('/directory')({
  component: DirectoryPage,
});

type Task = {
  id: string;
  task: string;
  activity: string;
  duration: string;
  status: string;
  variant: string;
};

const INITIAL_TASKS: Task[] = [
  { id: 'DIR-101', task: 'Façade Permit Application', activity: 'Regulatory', duration: '3 Weeks', status: 'In Review', variant: 'secondary' },
  { id: 'DIR-102', task: 'Site Logistics Coordination', activity: 'Logistics', duration: '2 Weeks', status: 'Active', variant: 'success' },
  { id: 'DIR-103', task: 'Mechanical Design QC', activity: 'Engineering', duration: '1 Week', status: 'Pending', variant: 'secondary' },
];

function DirectoryPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [query, setQuery] = useState<string>('');
  const [phase, setPhase] = useState<string>('All');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);

  // add form state
  const [formTask, setFormTask] = useState<string>('');
  const [formActivity, setFormActivity] = useState<string>('Regulatory');
  const [formDuration, setFormDuration] = useState<string>('TBD');
  const [formStatus, setFormStatus] = useState<string>('Active');
  const [formVariant, setFormVariant] = useState<string>('secondary');

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesPhase = phase === 'All' || t.activity === phase;
      const matchesQuery =
        q === '' ||
        t.id.toLowerCase().includes(q) ||
        t.task.toLowerCase().includes(q) ||
        t.activity.toLowerCase().includes(q);
      return matchesPhase && matchesQuery;
    });
  }, [tasks, query, phase]);

  const addTask = () => {
    const newTask: Task = {
      id: `DIR-${Math.floor(100 + Math.random() * 900)}`,
      task: formTask || `New Entry ${Math.floor(Math.random() * 900)}`,
      activity: formActivity,
      duration: formDuration,
      status: formStatus,
      variant: formVariant,
    };
    setTasks((prev) => [newTask, ...prev]);
    // reset form and close
    setFormTask('');
    setFormActivity('General');
    setFormDuration('TBD');
    setFormStatus('Pending');
    setFormVariant('secondary');
    setAddOpen(false);
  };

  const deleteTask = (id: string) => {
    if (!window.confirm('Delete this task?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    const updated = window.prompt('Edit task title', t.task);
    if (!updated) return;
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, task: updated } : x)));
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skyline Tower — Phase 2</p>
        <h1 className="text-2xl font-bold text-slate-900">Project Directory</h1>
      </div>

      {/* DIRECTORY SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 pt-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Total Directory Entries</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-900">{tasks.length}</h3>
            </div>
            <Calendar className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        
        <Card className="shadow-none border-emerald-200 bg-emerald-50/30">
          <CardContent className="p-4 pt-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase">Active Teams</p>
              <h3 className="text-2xl font-bold mt-1 text-emerald-900">3</h3>
            </div>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>

        <Card className="shadow-none border-amber-200 bg-amber-50/30">
          <CardContent className="p-4 pt-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase">Open Approvals</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-900">1</h3>
            </div>
            <Clock className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>

        <Card className="shadow-none border-rose-200 bg-rose-50/30">
          <CardContent className="p-4 pt-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-rose-700 uppercase">Pending Reviews</p>
              <h3 className="text-2xl font-bold mt-1 text-rose-900">1</h3>
            </div>
            <AlertTriangle className="h-5 w-5 text-rose-600" />
          </CardContent>
        </Card>
      </div>

      {/* TOOLBAR */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden />
          <Input
            aria-label="Search directory"
            placeholder="Search projects, teams, or IDs..."
            className="pl-9 bg-white border-slate-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className="gap-2 border-slate-200"
            aria-pressed={showFilters}
            onClick={() => setShowFilters((v) => !v)}
          >
            <Filter className="h-4 w-4" /> Filter
          </Button>

          {showFilters && (
            <select
              id="phase-select"
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="border rounded px-3 py-2 text-sm bg-white"
            >
              <option>All</option>
              <option>Regulatory</option>
              <option>Logistics</option>
              <option>Engineering</option>
              <option>Design</option>
            </select>
          )}

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#E11D48] hover:bg-[#BE123C] gap-2" aria-label="Add directory entry">
                <Plus className="h-4 w-4" /> Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Directory Entry</DialogTitle>
                <DialogDescription>Add a new directory item to the project list.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-2 pt-2">
                <label className="text-sm font-medium">Entry Name</label>
                <Input value={formTask} onChange={(e) => setFormTask(e.target.value)} placeholder="Directory item title" />

                <label className="text-sm font-medium">Team / Category</label>
                <Input value={formActivity} onChange={(e) => setFormActivity(e.target.value)} placeholder="Team or category" />

                <label className="text-sm font-medium">Timeline</label>
                <Input value={formDuration} onChange={(e) => setFormDuration(e.target.value)} placeholder="e.g. 3 Weeks" />

                <label className="text-sm font-medium">Status</label>
                <Input value={formStatus} onChange={(e) => setFormStatus(e.target.value)} placeholder="Active / In Review / Pending" />
              </div>

              <DialogFooter>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button onClick={addTask}>Create</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] text-xs font-bold">ENTRY ID</TableHead>
              <TableHead className="text-xs font-bold">ENTRY NAME</TableHead>
              <TableHead className="text-xs font-bold">TEAM / CATEGORY</TableHead>
              <TableHead className="text-xs font-bold">TIMELINE</TableHead>
              <TableHead className="text-xs font-bold text-right">STATUS</TableHead>
              <TableHead className="text-xs font-bold text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{task.id}</TableCell>
                <TableCell className="font-medium text-sm text-slate-900">{task.task}</TableCell>
                <TableCell className="text-sm text-slate-600">{task.activity}</TableCell>
                <TableCell className="text-sm text-slate-600">{task.duration}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={task.variant as any} className="capitalize">{task.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => editTask(task.id)} aria-label={`Edit ${task.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.id}`}>
                      <Trash className="h-4 w-4 text-rose-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}