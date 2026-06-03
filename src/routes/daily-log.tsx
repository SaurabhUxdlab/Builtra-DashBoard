import { createFileRoute } from '@tanstack/react-router';
import { Search, Filter, Plus, Pencil, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/daily-log')({
  component: DailyLogPage,
});

function DailyLogPage() {
  const [items, setItems] = useState([
    { 
      id: 1,
      resource: 'AQR', 
      scheduledTasks: 'PHASE 2 (E) Nurse Station Area Construction : PHASE 2 Air Balance Approval', 
      startDate: '7-18-2026', 
      finishDate: '7-24-2026',
      workers: '4',
      hours: '4',
      rate: '45',
      comments: 'No Comments'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States for New Member/Item
  const [newResource, setNewResource] = useState("");
  const [newTasks, setNewTasks] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newFinishDate, setNewFinishDate] = useState("");
  const [newWorkers, setNewWorkers] = useState("");
  const [newHours, setNewHours] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newComments, setNewComments] = useState("");

  const filteredItems = items.filter(item => 
    item.resource.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.scheduledTasks.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.trim() || !newTasks.trim()) {
      toast.error("Please fill required fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      resource: newResource,
      scheduledTasks: newTasks,
      startDate: newStartDate || "-",
      finishDate: newFinishDate || "-",
      workers: newWorkers || "0",
      hours: newHours || "0",
      rate: newRate || "0",
      comments: newComments || "No Comments"
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    
    // reset form
    setNewResource("");
    setNewTasks("");
    setNewStartDate("");
    setNewFinishDate("");
    setNewWorkers("");
    setNewHours("");
    setNewRate("");
    setNewComments("");
    
    toast.success("New entry added successfully!");
  };

  return (
    <div className="p-8 bg-white min-h-screen relative">
      <div className="mb-2 text-sm text-gray-500 font-medium">Dashboard &gt; Documents</div>
      <h1 className="text-3xl font-bold mb-8 text-black">Daily Log</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 w-full max-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-100/80 border-none focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => toast("Advanced filters opened")} className="bg-gray-100/80 border-none text-gray-500 hover:bg-gray-200/80">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 font-semibold shadow-sm">
          <Plus className="h-4 w-4 mr-2" /> New Member
        </Button>
      </div>

      <div className="border border-gray-100 rounded-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-100">
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">RESOURCE</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider w-[25%]">SCHEDULED TASKS</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">START DATE</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">FINISH DATE</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">WORKERS</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">HOURS</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">RATE (USD)</TableHead>
              <TableHead className="border-r border-gray-100 text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">COMMENTS</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                  <TableCell className="border-r border-gray-100 py-4 font-semibold text-[12px] text-gray-700">{item.resource}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-medium text-rose-500">{item.scheduledTasks}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-bold text-gray-700">{item.startDate}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-bold text-gray-700">{item.finishDate}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-bold text-gray-700">{item.workers}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-bold text-gray-700">{item.hours}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] font-bold text-gray-700">{item.rate}</TableCell>
                  <TableCell className="border-r border-gray-100 py-4 text-[12px] text-gray-500">{item.comments}</TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toast("Editing record...")} className="h-6 w-6 text-blue-500 hover:bg-blue-50">
                        <Pencil className="h-3 w-3" fill="currentColor" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toast("Viewing record details...")} className="h-6 w-6 text-gray-500 hover:bg-gray-100">
                        <Eye className="h-3 w-3" fill="currentColor" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-sm text-gray-500">
                  No records match "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border w-full max-w-2xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
            
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">Add New Record</h2>
            
            <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Scheduled Tasks *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., PHASE 2 Air Balance Approval" 
                  value={newTasks}
                  onChange={(e) => setNewTasks(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Resource *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., AQR" 
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Comments</label>
                <Input 
                  type="text" 
                  placeholder="e.g., No Comments" 
                  value={newComments}
                  onChange={(e) => setNewComments(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Start Date</label>
                <Input 
                  type="text" 
                  placeholder="e.g., 7-18-2026" 
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Finish Date</label>
                <Input 
                  type="text" 
                  placeholder="e.g., 7-24-2026" 
                  value={newFinishDate}
                  onChange={(e) => setNewFinishDate(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Workers</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 4" 
                  value={newWorkers}
                  onChange={(e) => setNewWorkers(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Hours</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 4" 
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Rate (USD)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 45" 
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-500">Cancel</Button>
                <Button type="submit" className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold">Create Record</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}