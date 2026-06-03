import { createFileRoute } from '@tanstack/react-router';
import { Search, Filter, Plus, Download, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/punch-list')({
  component: PunchListPage,
});

function PunchListPage() {
  const [items, setItems] = useState([
    { 
      task: 'Concrete Imperfection', 
      assignee: 'Mateo Lopez', 
      dueDate: 'May 12, 2026', 
      status: 'Work Required', 
      statusColor: 'bg-red-600 text-white' 
    },
    { 
      task: 'Non-functioning Emergency Exit Signs', 
      assignee: 'Jim Taylor', 
      dueDate: 'May 10, 2026', 
      status: 'Initiated', 
      statusColor: 'bg-blue-500 text-white' 
    },
    { 
      task: 'Exposed Wiring in Shared Office', 
      assignee: 'Josh Grey', 
      dueDate: 'May 9, 2026', 
      status: 'Closed', 
      statusColor: 'bg-gray-500 text-white' 
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States for New Item
  const [newTask, setNewTask] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newStatus, setNewStatus] = useState("Work Required");

  // Dynamic Search Filter
  const filteredItems = items.filter(item => 
    item.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Download functionality
  const handleDownloadCSV = () => {
    if (items.length === 0) {
      toast.error("No data to download");
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
        + "TASK,ASSIGNEE,DUE DATE,STATUS\n"
        + items.map(e => `"${e.task}","${e.assignee}","${e.dueDate}","${e.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "punch_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started!");
  };

  // Add Item Logic
  const handleAddPunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !newAssignee.trim() || !newDueDate.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    let color = 'bg-gray-500 text-white';
    if(newStatus === 'Work Required') color = 'bg-red-600 text-white';
    if(newStatus === 'Initiated') color = 'bg-blue-500 text-white';

    const newItem = {
      task: newTask,
      assignee: newAssignee,
      dueDate: newDueDate,
      status: newStatus,
      statusColor: color
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setNewTask("");
    setNewAssignee("");
    setNewDueDate("");
    setNewStatus("Work Required");
    toast.success("New punch item added!");
  };

  return (
    <div className="p-8 bg-white min-h-screen relative">
      <div className="mb-2 text-sm text-gray-500 font-medium">Dashboard &gt; Punch List</div>
      <h1 className="text-3xl font-bold mb-8 text-black">Punch List</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 w-full max-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-100/80 border-none focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => toast("Advanced filters opened")} className="bg-gray-100/80 border-none text-gray-500 hover:bg-gray-200/80">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDownloadCSV} className="text-rose-600 border-rose-200 bg-white hover:bg-rose-50 hover:text-rose-700 px-6 font-semibold">
            <Download className="h-4 w-4 mr-2" /> Download List
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-6 font-semibold shadow-sm">
            <Plus className="h-4 w-4 mr-2" /> New Punch
          </Button>
        </div>
      </div>

      <div className="border border-gray-100 rounded-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-b border-gray-100">
              <TableHead className="text-[11px] font-bold uppercase text-gray-500 py-4 tracking-wider w-[40%]">TASK</TableHead>
              <TableHead className="text-[11px] font-bold uppercase text-gray-500 py-4 tracking-wider">ASSIGNEE</TableHead>
              <TableHead className="text-[11px] font-bold uppercase text-gray-500 py-4 tracking-wider">DUE DATE</TableHead>
              <TableHead className="text-[11px] font-bold uppercase text-gray-500 py-4 tracking-wider">STATUS</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/30">
                  <TableCell className="py-4 font-semibold text-[13px] text-gray-900">{item.task}</TableCell>
                  <TableCell className="py-4 text-[13px] font-medium text-gray-600">{item.assignee}</TableCell>
                  <TableCell className="py-4 text-[13px] font-medium text-gray-600">{item.dueDate}</TableCell>
                  <TableCell className="py-4">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <Button variant="outline" size="icon" onClick={() => toast(`Viewing details for: ${item.task}`)} className="h-6 w-6 text-gray-400 border-gray-200 bg-white">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-gray-500">
                  No punch items match "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* NEW PUNCH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
            
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">Add New Punch Item</h2>
            
            <form onSubmit={handleAddPunch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Task Description *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., Fix broken window" 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Assignee *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., John Doe" 
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Due Date *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., May 20, 2026" 
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                >
                  <option value="Work Required">Work Required</option>
                  <option value="Initiated">Initiated</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-500">Cancel</Button>
                <Button type="submit" className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold">Create Item</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}