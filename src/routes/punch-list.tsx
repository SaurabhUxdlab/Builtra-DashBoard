import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/punch-list')({
  component: PunchListPage,
});

function PunchListPage() {
  const [items, setItems] = useState([
    { id: 'PUN-001', task: 'Touch-up paint on Level 3 ceiling', status: 'Open', priority: 'High' },
    { id: 'PUN-002', task: 'Fix loose door handle in Lobby', status: 'Completed', priority: 'Low' },
  ]);
  const [search, setSearch] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) =>
      q === '' ||
      item.task.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      item.priority.toLowerCase().includes(q),
    );
  }, [items, search]);

  const createItem = () => {
    if (!newTask.trim()) return;

    setItems((prev) => [
      {
        id: `PUN-${String(prev.length + 1).padStart(3, '0')}`,
        task: newTask.trim(),
        status: 'Open',
        priority: newPriority,
      },
      ...prev,
    ]);

    setNewTask('');
    setNewPriority('Medium');
    setIsComposeOpen(false);
  };

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === 'Open' ? 'Completed' : 'Open' } : item,
      ),
    );
    setActiveMenuId(null);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setActiveMenuId(null);
  };

  const priorityVariant = (priority: string) => {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8" onClick={() => setActiveMenuId(null)}>
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Construction Closeout</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Punch List</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">Manage final-site defects, prioritize critical fixes, and track closeout progress with a professional field operations workflow.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Open Items</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{items.filter((item) => item.status === 'Open').length}</p>
            </div>
            <AlertCircle className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/60 shadow-sm">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Completed</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{items.filter((item) => item.status === 'Completed').length}</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-rose-50/60 shadow-sm">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-rose-700">High Priority</p>
              <p className="mt-2 text-2xl font-bold text-rose-900">{items.filter((item) => item.priority === 'High').length}</p>
            </div>
            <AlertCircle className="h-5 w-5 text-rose-600" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by task, status, or priority..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Punch List Item</DialogTitle>
              <DialogDescription>Log a new defect, finish item, or site correction.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Task description" />
              <select value={newPriority} onChange={(event) => setNewPriority(event.target.value as 'High' | 'Medium' | 'Low')} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
              <Button onClick={createItem}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase tracking-[0.18em]">ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-[0.18em]">Task</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-[0.18em]">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-[0.18em]">Priority</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-[0.18em] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{item.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{item.task}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Open' ? 'destructive' : 'default'}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(item.priority)} className="capitalize">{item.priority}</Badge>
                </TableCell>
                <TableCell className="relative text-right">
                  <Button variant="ghost" size="icon" onClick={(event) => { event.stopPropagation(); setActiveMenuId(activeMenuId === item.id ? null : item.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === item.id && (
                    <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-lg">
                      <button onClick={() => toggleStatus(item.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Toggle Status</button>
                      <button onClick={() => handleDelete(item.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-slate-500">No punch list items match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}