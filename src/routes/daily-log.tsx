import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Calendar, CloudSun, FileText, MoreHorizontal, Plus, Search, Trash2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/daily-log')({
  component: DailyLogPage,
});

function DailyLogPage() {
  const [logs, setLogs] = useState([
    { id: 'LOG-001', date: '2026-06-03', weather: 'Sunny', crew: 'Concrete Team', status: 'Submitted' },
    { id: 'LOG-002', date: '2026-06-02', weather: 'Cloudy', crew: 'Steel Fixers', status: 'Draft' },
  ]);
  const [search, setSearch] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newCrew, setNewCrew] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filteredLogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((log) =>
      q === '' ||
      log.date.toLowerCase().includes(q) ||
      log.crew.toLowerCase().includes(q) ||
      log.weather.toLowerCase().includes(q),
    );
  }, [logs, search]);

  const createLog = () => {
    if (!newDate || !newCrew.trim()) return;

    setLogs((prev) => [
      {
        id: `LOG-${String(prev.length + 1).padStart(3, '0')}`,
        date: newDate,
        weather: newWeather.trim() || 'Clear',
        crew: newCrew.trim(),
        status: 'Draft',
      },
      ...prev,
    ]);

    setNewDate('');
    setNewWeather('');
    setNewCrew('');
    setNewNotes('');
    setIsComposeOpen(false);
  };

  const handleDelete = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
    setActiveMenuId(null);
  };

  const markSubmitted = (id: string) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, status: 'Submitted' } : log)),
    );
    setActiveMenuId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8" onClick={() => setActiveMenuId(null)}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Field Reporting</p>
        <h1 className="text-3xl font-bold text-slate-900">Daily Logs</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Capture daily site progress, weather, crew activity, and report status from one professional workspace.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Total Logs</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{logs.length}</p>
            </div>
            <FileText className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Submitted</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{logs.filter((log) => log.status === 'Submitted').length}</p>
            </div>
            <Calendar className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-amber-700">Drafts</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{logs.filter((log) => log.status === 'Draft').length}</p>
            </div>
            <CloudSun className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="border-sky-200 bg-sky-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-sky-700">Crews</p>
              <p className="mt-2 text-2xl font-bold text-sky-900">{new Set(logs.map((log) => log.crew)).size}</p>
            </div>
            <Users className="h-5 w-5 text-sky-600" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by date, weather, or crew..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <Plus className="h-4 w-4" /> Create Daily Log
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Daily Log</DialogTitle>
              <DialogDescription>Record the day’s work, weather, and crew details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
              <Input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} placeholder="Weather conditions" />
              <Input value={newCrew} onChange={(event) => setNewCrew(event.target.value)} placeholder="Crew name" />
              <textarea value={newNotes} onChange={(event) => setNewNotes(event.target.value)} className="min-h-[100px] w-full rounded-md border border-slate-200 p-2 text-sm" placeholder="Work performed today..." />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>Cancel</Button>
              <Button onClick={createLog}>Save Log</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase">Log ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Weather</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Crew</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{log.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{log.date}</TableCell>
                <TableCell className="text-sm text-slate-600">{log.weather}</TableCell>
                <TableCell className="text-sm text-slate-600">{log.crew}</TableCell>
                <TableCell>
                  <Badge variant={log.status === 'Submitted' ? 'default' : 'secondary'}>{log.status}</Badge>
                </TableCell>
                <TableCell className="relative text-right">
                  <Button variant="ghost" size="icon" onClick={(event) => { event.stopPropagation(); setActiveMenuId(activeMenuId === log.id ? null : log.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === log.id && (
                    <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-slate-200 bg-white shadow-lg">
                      <button onClick={() => markSubmitted(log.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Mark Submitted</button>
                      <button onClick={() => handleDelete(log.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">No daily logs match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}