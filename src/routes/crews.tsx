import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { MoreHorizontal, Plus, Search, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute('/crews')({
  component: CrewsPage,
});

function CrewsPage() {
  const [crews, setCrews] = useState([
    { id: "CR-001", name: "Golden Key Framing Team", trade: "Carpentry", members: 8, supervisor: "Luke Prescott" },
    { id: "CR-002", name: "Apex Electrical Solutions", trade: "Electrical", members: 4, supervisor: "Sarah Chen" },
    { id: "CR-003", name: "Rapid Concrete Pourers", trade: "Concrete", members: 12, supervisor: "Mike Ross" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newCrew, setNewCrew] = useState({ name: "", trade: "", members: "", supervisor: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCrews = crews.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.trade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    const entry = { id: `CR-00${crews.length + 1}`, ...newCrew, members: Number(newCrew.members) };
    setCrews([...crews, entry]);
    setIsAddOpen(false);
    setNewCrew({ name: "", trade: "", members: "", supervisor: "" });
  };

  const handleDelete = (id: string) => {
    setCrews(crews.filter(c => c.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="p-8" onClick={() => setActiveMenuId(null)}>
      <h1 className="text-2xl font-bold mb-6">Crews</h1>
      
      <div className="bg-slate-50 border p-4 rounded-lg mb-6 w-1/3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Active Crews</p>
            <p className="text-2xl font-bold">{crews.length}</p>
          </div>
          <Users className="h-6 w-6 text-slate-400" />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <Input 
          placeholder="Search crews or trades..." 
          className="w-80" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setIsAddOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C]">
          <Plus className="mr-2 h-4 w-4" /> Add New Crew
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CREW ID</TableHead>
              <TableHead>CREW NAME</TableHead>
              <TableHead>TRADE</TableHead>
              <TableHead>MEMBERS</TableHead>
              <TableHead>SUPERVISOR</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCrews.map((crew) => (
              <TableRow key={crew.id}>
                <TableCell>{crew.id}</TableCell>
                <TableCell className="font-medium">{crew.name}</TableCell>
                <TableCell>{crew.trade}</TableCell>
                <TableCell>{crew.members}</TableCell>
                <TableCell>{crew.supervisor}</TableCell>
                <TableCell className="relative">
                  <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === crew.id ? null : crew.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === crew.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10 rounded-md">
                      <button onClick={() => handleDelete(crew.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Crew</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Crew Name" onChange={e => setNewCrew({...newCrew, name: e.target.value})} />
            <Input placeholder="Trade" onChange={e => setNewCrew({...newCrew, trade: e.target.value})} />
            <Input placeholder="Members" onChange={e => setNewCrew({...newCrew, members: e.target.value})} />
            <Input placeholder="Supervisor" onChange={e => setNewCrew({...newCrew, supervisor: e.target.value})} />
          </div>
          <DialogFooter>
            <Button onClick={handleAdd} className="bg-[#E11D48]">Add Crew</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}