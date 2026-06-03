import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { AlertTriangle, Eye, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/observations')({
  component: ObservationsPage,
});

function ObservationsPage() {
  const [observations, setObservations] = useState([
    { id: 'OBS-001', title: 'Unsafe scaffolding at Block A', status: 'Open', date: '2026-06-01' },
    { id: 'OBS-002', title: 'Material storage blocking access', status: 'Resolved', date: '2026-06-02' },
  ]);
  const [search, setSearch] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState<'Open' | 'Resolved'>('Open');
  const [newNotes, setNewNotes] = useState('');

  const filteredObservations = useMemo(() => {
    const q = search.trim().toLowerCase();
    return observations.filter((item) =>
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q),
    );
  }, [observations, search]);

  const createObservation = () => {
    if (!newTitle.trim()) return;

    setObservations((prev) => [
      {
        id: `OBS-${String(prev.length + 1).padStart(3, '0')}`,
        title: newTitle.trim(),
        status: newStatus,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);

    setNewTitle('');
    setNewStatus('Open');
    setNewNotes('');
    setIsComposeOpen(false);
  };

  const handleDelete = (id: string) => {
    setObservations((prev) => prev.filter((item) => item.id !== id));
    setActiveMenuId(null);
  };

  const toggleStatus = (id: string) => {
    setObservations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === 'Open' ? 'Resolved' : 'Open' } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8" onClick={() => setActiveMenuId(null)}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Site Safety & Quality</p>
        <h1 className="text-3xl font-bold text-slate-900">Observations</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Record site observations, track action status, and keep the field team informed of safety and quality issues.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Total Observations</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{observations.length}</p>
            </div>
            <Eye className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-amber-700">Open Issues</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{observations.filter((item) => item.status === 'Open').length}</p>
            </div>
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Resolved</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{observations.filter((item) => item.status === 'Resolved').length}</p>
            </div>
            <Eye className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or status..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <Plus className="h-4 w-4" /> New Observation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Observation</DialogTitle>
              <DialogDescription>Add a formal site observation with its current status.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Observation title" />
              <select value={newStatus} onChange={(event) => setNewStatus(event.target.value as 'Open' | 'Resolved')} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>
              <textarea value={newNotes} onChange={(event) => setNewNotes(event.target.value)} className="min-h-[100px] w-full rounded-md border border-slate-200 p-2 text-sm" placeholder="Brief note or action detail..." />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
              <Button onClick={createObservation}>Save</Button>
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
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredObservations.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{item.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{item.title}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Open' ? 'destructive' : 'default'} className="capitalize">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{item.date}</TableCell>
                <TableCell className="relative text-right">
                  <Button variant="ghost" size="icon" onClick={(event) => { event.stopPropagation(); setActiveMenuId(activeMenuId === item.id ? null : item.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === item.id && (
                    <div className="absolute right-0 z-10 mt-2 w-44 rounded-md border border-slate-200 bg-white shadow-lg">
                      <button onClick={() => toggleStatus(item.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Toggle Status</button>
                      <button onClick={() => handleDelete(item.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredObservations.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-slate-500">No observations match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}