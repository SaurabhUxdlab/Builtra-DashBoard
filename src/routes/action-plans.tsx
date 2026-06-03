import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { CalendarDays, FileText, ListChecks, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/action-plans')({
  component: ActionPlansPage,
});

function ActionPlansPage() {
  const [plans, setPlans] = useState([
    { id: 'AP-001', title: 'Safety Protocol Update', owner: 'Sarah Chen', deadline: '2026-06-20', status: 'Active' },
    { id: 'AP-002', title: 'Material Quality Control', owner: 'Luke Prescott', deadline: '2026-06-25', status: 'In Progress' },
  ]);
  const [search, setSearch] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newStatus, setNewStatus] = useState('Active');

  const filteredPlans = useMemo(() => {
    const q = search.trim().toLowerCase();
    return plans.filter((plan) =>
      q === '' ||
      plan.title.toLowerCase().includes(q) ||
      plan.owner.toLowerCase().includes(q) ||
      plan.status.toLowerCase().includes(q),
    );
  }, [plans, search]);

  const handleDelete = (id: string) => {
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
    setActiveMenuId(null);
  };

  const createPlan = () => {
    if (!newTitle.trim() || !newOwner.trim() || !newDeadline) return;

    setPlans((prev) => [
      {
        id: `AP-${String(prev.length + 1).padStart(3, '0')}`,
        title: newTitle.trim(),
        owner: newOwner.trim(),
        deadline: newDeadline,
        status: newStatus,
      },
      ...prev,
    ]);

    setNewTitle('');
    setNewOwner('');
    setNewDeadline('');
    setNewStatus('Active');
    setIsComposeOpen(false);
  };

  const statusVariant = (status: string) => {
    if (status === 'Active') return 'default';
    if (status === 'In Progress') return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8" onClick={() => setActiveMenuId(null)}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project Operations</p>
        <h1 className="text-3xl font-bold text-slate-900">Action Plans</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Track official site actions, assign ownership, and manage completion deadlines from one professional operations panel.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Active Action Plans</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{plans.length}</p>
            </div>
            <ListChecks className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">On Track</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{plans.filter((plan) => plan.status === 'Active').length}</p>
            </div>
            <CalendarDays className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-amber-700">In Progress</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{plans.filter((plan) => plan.status === 'In Progress').length}</p>
            </div>
            <FileText className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, owner, or status..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <Plus className="h-4 w-4" /> Create Action Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish New Action Plan</DialogTitle>
              <DialogDescription>Create a formal site action item with owner and deadline.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Plan title" />
              <Input value={newOwner} onChange={(event) => setNewOwner(event.target.value)} placeholder="Owner name" />
              <Input type="date" value={newDeadline} onChange={(event) => setNewDeadline(event.target.value)} />
              <select value={newStatus} onChange={(event) => setNewStatus(event.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="Active">Active</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
              <Button onClick={createPlan}>Save Plan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase">ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Title</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Owner</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Deadline</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.map((plan) => (
              <TableRow key={plan.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{plan.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{plan.title}</TableCell>
                <TableCell className="text-sm text-slate-600">{plan.owner}</TableCell>
                <TableCell className="text-sm text-slate-600">{plan.deadline}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(plan.status)} className="capitalize">{plan.status}</Badge>
                </TableCell>
                <TableCell className="relative text-right">
                  <Button variant="ghost" size="icon" onClick={(event) => { event.stopPropagation(); setActiveMenuId(activeMenuId === plan.id ? null : plan.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === plan.id && (
                    <div className="absolute right-0 z-10 mt-2 w-36 rounded-md border border-slate-200 bg-white shadow-lg">
                      <button onClick={() => handleDelete(plan.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredPlans.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">No action plans match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}