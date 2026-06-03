import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Download, FileText, MoreHorizontal, Search, Trash2, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/drawing')({
  component: DrawingsPage,
});

function DrawingsPage() {
  const [drawings, setDrawings] = useState([
    { id: 'DWG-001', title: 'Floor Plan - Level 1', version: 'v2.1', date: '2026-06-01', type: 'Architectural' },
    { id: 'DWG-002', title: 'Electrical Layout - Roof', version: 'v1.0', date: '2026-05-28', type: 'Electrical' },
  ]);
  const [search, setSearch] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newVersion, setNewVersion] = useState('v1.0');
  const [newType, setNewType] = useState('Architectural');

  const filteredDrawings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return drawings.filter((drawing) =>
      q === '' ||
      drawing.title.toLowerCase().includes(q) ||
      drawing.type.toLowerCase().includes(q) ||
      drawing.version.toLowerCase().includes(q),
    );
  }, [drawings, search]);

  const handleDelete = (id: string) => {
    setDrawings((prev) => prev.filter((drawing) => drawing.id !== id));
    setActiveMenuId(null);
  };

  const handleUpload = () => {
    if (!newTitle.trim()) return;
    setDrawings((prev) => [
      {
        id: `DWG-${String(prev.length + 1).padStart(3, '0')}`,
        title: newTitle.trim(),
        version: newVersion.trim() || 'v1.0',
        date: new Date().toISOString().slice(0, 10),
        type: newType,
      },
      ...prev,
    ]);
    setNewTitle('');
    setNewVersion('v1.0');
    setNewType('Architectural');
    setIsUploadOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8" onClick={() => setActiveMenuId(null)}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Document Control</p>
        <h1 className="text-3xl font-bold text-slate-900">Drawings</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Manage official drawing revisions, upload new files, and keep the site team aligned with the latest approved documents.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Total Drawings</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{drawings.length}</p>
            </div>
            <FileText className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Approved Revisions</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{drawings.filter((drawing) => drawing.version !== 'v0.1').length}</p>
            </div>
            <Download className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-amber-700">Categories</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{new Set(drawings.map((drawing) => drawing.type)).size}</p>
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
            placeholder="Search by title, version, or type..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <UploadCloud className="h-4 w-4" /> Upload Drawing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Drawing</DialogTitle>
              <DialogDescription>Add a new revision to the project document register.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Drawing title" />
              <Input value={newVersion} onChange={(event) => setNewVersion(event.target.value)} placeholder="Version" />
              <select value={newType} onChange={(event) => setNewType(event.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="Architectural">Architectural</option>
                <option value="Structural">Structural</option>
                <option value="Electrical">Electrical</option>
                <option value="MEP">MEP</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload}>Save</Button>
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
              <TableHead className="text-xs font-semibold uppercase">Version</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Type</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Upload Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrawings.map((drawing) => (
              <TableRow key={drawing.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{drawing.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{drawing.title}</TableCell>
                <TableCell><Badge variant="outline">{drawing.version}</Badge></TableCell>
                <TableCell className="text-sm text-slate-600">{drawing.type}</TableCell>
                <TableCell className="text-sm text-slate-600">{drawing.date}</TableCell>
                <TableCell className="relative text-right">
                  <Button variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); setActiveMenuId(activeMenuId === drawing.id ? null : drawing.id); }}>
                    <MoreHorizontal className="h-4 w-4 text-slate-500" />
                  </Button>
                  {activeMenuId === drawing.id && (
                    <div className="absolute right-0 z-10 mt-2 w-36 rounded-md border border-slate-200 bg-white shadow-lg">
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                        <Download className="h-3 w-3" /> Download
                      </button>
                      <button onClick={() => handleDelete(drawing.id)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredDrawings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">No drawings match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}