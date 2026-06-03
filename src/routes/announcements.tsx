import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Bell, CalendarDays, Megaphone, MessageSquare, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const Route = createFileRoute('/announcements')({
  component: AnnouncementsPage,
});

type Announcement = {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  audience: string;
  postedAt: string;
  comments: string[];
};

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'Site safety training mandatory for all crews',
    category: 'Safety',
    priority: 'High',
    audience: 'All Teams',
    postedAt: '2026-06-02',
    comments: ['Sure, I will attend.', 'Please share the training schedule.'],
  },
  {
    id: 'ANN-002',
    title: 'Material delivery window updated to 3 PM',
    category: 'Logistics',
    priority: 'Medium',
    audience: 'Procurement',
    postedAt: '2026-06-01',
    comments: ['Noted. We will adjust delivery planning.'],
  },
];

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [selectedAnn, setSelectedAnn] = useState<Announcement | null>(null);
  const [comment, setComment] = useState('');
  const [openNew, setOpenNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newAudience, setNewAudience] = useState('All Teams');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return announcements.filter((item) =>
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.audience.toLowerCase().includes(q),
    );
  }, [announcements, search]);

  const totalComments = announcements.reduce((sum, item) => sum + item.comments.length, 0);

  const handleAddComment = () => {
    if (!selectedAnn || !comment.trim()) return;
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === selectedAnn.id ? { ...item, comments: [...item.comments, comment.trim()] } : item,
      ),
    );
    setComment('');
  };

  const createAnnouncement = () => {
    if (!newTitle.trim()) return;

    const item: Announcement = {
      id: `ANN-${String(announcements.length + 1).padStart(3, '0')}`,
      title: newTitle.trim(),
      category: newCategory.trim() || 'General',
      priority: newPriority,
      audience: newAudience.trim() || 'All Teams',
      postedAt: new Date().toISOString().slice(0, 10),
      comments: [],
    };

    setAnnouncements((prev) => [item, ...prev]);
    setNewTitle('');
    setNewCategory('General');
    setNewPriority('Medium');
    setNewAudience('All Teams');
    setOpenNew(false);
  };

  const priorityVariant = (priority: Announcement['priority']) => {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Internal Communications</p>
        <h1 className="text-3xl font-bold text-slate-900">Announcements & Project Updates</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Use this panel to publish official project updates, monitor team responses, and keep all stakeholders aligned.</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Active Updates</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{announcements.length}</p>
            </div>
            <Megaphone className="h-5 w-5 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-700">Response Count</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{totalComments}</p>
            </div>
            <MessageSquare className="h-5 w-5 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-amber-700">Priority Alerts</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{announcements.filter((item) => item.priority === 'High').length}</p>
            </div>
            <Bell className="h-5 w-5 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-rose-50/40 shadow-none">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-bold uppercase text-rose-700">Posted This Week</p>
              <p className="mt-2 text-2xl font-bold text-rose-900">{announcements.filter((item) => item.postedAt >= '2026-06-01').length}</p>
            </div>
            <CalendarDays className="h-5 w-5 text-rose-600" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, category, or audience..."
            className="border-slate-200 bg-white pl-10"
          />
        </div>

        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#E11D48] hover:bg-[#BE123C]">
              <Plus className="h-4 w-4" /> Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish Announcement</DialogTitle>
              <DialogDescription>Use this form to share formal project updates with the appropriate team or department.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 pt-4">
              <Input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Announcement title" />
              <Input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Category" />
              <Input value={newAudience} onChange={(event) => setNewAudience(event.target.value)} placeholder="Audience" />
              <select
                value={newPriority}
                onChange={(event) => setNewPriority(event.target.value as Announcement['priority'])}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNew(false)}>Cancel</Button>
              <Button onClick={createAnnouncement}>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase">Title</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Category</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Priority</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Audience</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Posted</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Comments</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50">
                <TableCell className="font-semibold text-slate-900">{item.title}</TableCell>
                <TableCell className="text-sm text-slate-600">{item.category}</TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(item.priority)} className="capitalize">{item.priority}</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{item.audience}</TableCell>
                <TableCell className="text-sm text-slate-600">{item.postedAt}</TableCell>
                <TableCell className="text-right text-sm text-slate-600">{item.comments.length}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAnn(item)}>
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">No announcements match your current search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedAnn} onOpenChange={() => setSelectedAnn(null)}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{selectedAnn?.title}</DialogTitle>
            <DialogDescription>Discussion thread for this announcement.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedAnn?.comments?.length ? (
              selectedAnn.comments.map((commentText, index) => (
                <div key={`${selectedAnn.id}-${index}`} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{commentText}</div>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">No comments yet. Start the discussion.</div>
            )}
            <div className="flex gap-2">
              <Input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Type a comment..." />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}