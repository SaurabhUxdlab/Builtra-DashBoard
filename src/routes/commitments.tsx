import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, CheckSquare, MoreHorizontal, FileText, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute('/commitments')({
  component: CommitmentsPage,
});

function CommitmentsPage() {
  const [commitments, setCommitments] = useState([
    { id: "COM-001", description: "Submit structural shop drawings", due: "2026-06-10", assignedTo: "Sarah Chen", status: "Pending" },
    { id: "COM-002", description: "Finalize material procurement", due: "2026-06-15", assignedTo: "Luke Prescott", status: "In Progress" },
  ]);

  const [isNewCommitOpen, setIsNewCommitOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setCommitments(commitments.filter(c => c.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="p-8" onClick={() => setActiveMenuId(null)}>
      <h1 className="text-2xl font-bold mb-6">Commitments</h1>

      <div className="bg-slate-50 border p-4 rounded-lg mb-6 w-1/3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Open Commitments</p>
            <p className="text-2xl font-bold">{commitments.length}</p>
          </div>
          <CheckSquare className="h-6 w-6 text-blue-500" />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <Input placeholder="Search commitments..." className="w-80" />
        <Button onClick={() => setIsNewCommitOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C]">
          <Plus className="mr-2 h-4 w-4" /> New Commitment
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>DUE DATE</TableHead>
              <TableHead>ASSIGNED TO</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commitments.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs text-slate-500">{item.id}</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" /> {item.description}
                </TableCell>
                <TableCell>{item.due}</TableCell>
                <TableCell>{item.assignedTo}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="relative">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === item.id ? null : item.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === item.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10 rounded-md">
                      <button onClick={() => handleDelete(item.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isNewCommitOpen} onOpenChange={setIsNewCommitOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Commitment</DialogTitle></DialogHeader>
          <div className="space-y-3">
             <Input placeholder="Description" />
             <Input type="date" />
             <Input placeholder="Assigned To" />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsNewCommitOpen(false)} className="bg-[#E11D48]">Create Commitment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}