import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search, Filter, AlertTriangle, CheckCircle, Clock, Edit, Trash } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/coordination-Issues')({
  component: CoordinationIssuesPage,
})

type Issue = {
  id: string
  title: string
  team: string
  owner: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Resolved'
  dueDate: string
}

const INITIAL_ISSUES: Issue[] = [
  {
    id: 'CI-001',
    title: 'Design review delay for lift core coordination',
    team: 'Engineering',
    owner: 'Mina Shah',
    priority: 'High',
    status: 'Open',
    dueDate: '2026-06-10',
  },
  {
    id: 'CI-002',
    title: 'Material staging conflict between plumbing and electrical',
    team: 'Logistics',
    owner: 'Arjun Patel',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-06-14',
  },
  {
    id: 'CI-003',
    title: 'Pending permit update for façade installation',
    team: 'Regulatory',
    owner: 'Sara Kim',
    priority: 'High',
    status: 'Open',
    dueDate: '2026-06-08',
  },
]

function CoordinationIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES)
  const [query, setQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newTeam, setNewTeam] = useState<string>('Engineering')
  const [newOwner, setNewOwner] = useState<string>('')
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High')
  const [newDueDate, setNewDueDate] = useState<string>('')

  const filteredIssues = useMemo(() => {
    const q = query.trim().toLowerCase()
    return issues.filter((issue) => {
      const matchesQuery =
        q === '' ||
        issue.id.toLowerCase().includes(q) ||
        issue.title.toLowerCase().includes(q) ||
        issue.team.toLowerCase().includes(q) ||
        issue.owner.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'All' || issue.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [issues, query, statusFilter])

  const highPriority = issues.filter((issue) => issue.priority === 'High').length
  const openCount = issues.filter((issue) => issue.status !== 'Resolved').length
  const overdue = issues.filter((issue) => new Date(issue.dueDate) < new Date() && issue.status !== 'Resolved').length

  const resetForm = () => {
    setNewTitle('')
    setNewTeam('Engineering')
    setNewOwner('')
    setNewPriority('High')
    setNewDueDate('')
  }

  const createIssue = () => {
    if (!newTitle || !newOwner || !newDueDate) return
    const newIssue: Issue = {
      id: `CI-${String(issues.length + 1).padStart(3, '0')}`,
      title: newTitle,
      team: newTeam,
      owner: newOwner,
      priority: newPriority,
      status: 'Open',
      dueDate: newDueDate,
    }
    setIssues((prev) => [newIssue, ...prev])
    resetForm()
    setOpenDialog(false)
  }

  const deleteIssue = (id: string) => {
    if (!window.confirm('Delete this issue?')) return
    setIssues((prev) => prev.filter((issue) => issue.id !== id))
  }

  const statusBadge = (status: Issue['status']) => {
    if (status === 'Open') return 'secondary'
    if (status === 'In Progress') return 'outline'
    return 'default'
  }

  const priorityBadge = (priority: Issue['priority']) => {
    if (priority === 'High') return 'destructive'
    return 'secondary'
  }

  return (
    <div className="p-8 bg-slate-50/70 min-h-screen">
      <div className="mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Builtraa Coordination</p>
        <h1 className="text-3xl font-bold text-slate-900">Coordination Issue Tracker</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">Manage cross-team coordination challenges, track issue status, and resolve priority blockers for the Builtraa project.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Total Issues</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{issues.length}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-slate-400" />
          </CardContent>
        </Card>
        <Card className="shadow-none border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-4 flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase">Open Issues</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-900">{openCount}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </CardContent>
        </Card>
        <Card className="shadow-none border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase">High Priority</p>
              <p className="mt-2 text-2xl font-semibold text-amber-900">{highPriority}</p>
            </div>
            <Clock className="h-6 w-6 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="shadow-none border-rose-200 bg-rose-50/50">
          <CardContent className="p-4 flex justify-between items-start gap-4">
            <div>
              <p className="text-xs font-bold text-rose-700 uppercase">Overdue</p>
              <p className="mt-2 text-2xl font-semibold text-rose-900">{overdue}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-rose-600" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search issues, teams, owners..."
            className="pl-10 bg-white border-slate-200"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#E11D48] hover:bg-[#BE123C] gap-2">
                <Plus className="h-4 w-4" /> Add Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Coordination Issue</DialogTitle>
                <DialogDescription>Capture issue details and ensure the right team resolves it.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 pt-4">
                <label className="text-sm font-medium text-slate-700">Issue title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Permit clearance delay"
                />

                <label className="text-sm font-medium text-slate-700">Team</label>
                <Input value={newTeam} onChange={(e) => setNewTeam(e.target.value)} placeholder="Team name" />

                <label className="text-sm font-medium text-slate-700">Owner</label>
                <Input value={newOwner} onChange={(e) => setNewOwner(e.target.value)} placeholder="Owner name" />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Issue['priority'])}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Due date</label>
                    <Input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button onClick={createIssue}>Create</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase">Issue ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Title</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Team</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Owner</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Priority</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Due Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow key={issue.id} className="hover:bg-slate-50">
                <TableCell className="font-mono text-xs text-slate-500">{issue.id}</TableCell>
                <TableCell className="font-medium text-sm text-slate-900">{issue.title}</TableCell>
                <TableCell className="text-sm text-slate-600">{issue.team}</TableCell>
                <TableCell className="text-sm text-slate-600">{issue.owner}</TableCell>
                <TableCell>
                  <Badge variant={priorityBadge(issue.priority)} className="capitalize">{issue.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadge(issue.status)} className="capitalize">{issue.status}</Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-slate-600">{issue.dueDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => null} aria-label={`Edit ${issue.id}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteIssue(issue.id)} aria-label={`Delete ${issue.id}`}>
                      <Trash className="h-4 w-4 text-rose-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredIssues.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-slate-500">
                  No coordination issues match your search or filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
