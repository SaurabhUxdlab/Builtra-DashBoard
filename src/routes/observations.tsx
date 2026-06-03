import { createFileRoute } from '@tanstack/react-router';
import { Search, Filter, Plus, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/observations')({
  component: ObservationsPage,
});

function ObservationsPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      role: 'Architect',
      name: 'Arthur Vandeley (Art Vendeley Architecture & Planning)',
      email: 'arthur.vendeley@gmail.com',
      office: '(718) 555-1234',
      mobile: '(718) 555-1234',
    },
    {
      id: 2,
      role: 'Project Manager',
      name: 'Chris Berkley (Golden Key Construction)',
      email: 'chris.berkley@gmail.com',
      office: '(718) 555-1234',
      mobile: '(718) 555-1234',
    },
    {
      id: 3,
      role: 'Super intendent',
      name: 'Luke Prescott (Golden Key Construction)',
      email: 'luke.prescott@gmail.com',
      office: '(718) 555-1234',
      mobile: '(718) 555-1234',
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States for New Member
  const [newRole, setNewRole] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newOffice, setNewOffice] = useState("");
  const [newMobile, setNewMobile] = useState("");

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) {
      toast.error("Please fill required fields (Name, Role)");
      return;
    }

    const newItem = {
      id: Date.now(),
      role: newRole,
      name: newName,
      email: newEmail || "-",
      office: newOffice || "-",
      mobile: newMobile || "-"
    };

    setItems([...items, newItem]);
    setIsModalOpen(false);
    
    // reset form
    setNewRole("");
    setNewName("");
    setNewEmail("");
    setNewOffice("");
    setNewMobile("");
    
    toast.success("New member added successfully!");
  };

  return (
    <div className="p-8 bg-white min-h-screen relative">
      <div className="mb-2 text-sm text-gray-500 font-medium">Dashboard &gt; Observations</div>
      <h1 className="text-3xl font-bold mb-8 text-black">Observations</h1>

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
              <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">ROLE</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider w-[35%]">NAME</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">EMAIL</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">OFFICE</TableHead>
              <TableHead className="text-[10px] font-bold uppercase text-gray-500 py-4 tracking-wider">MOBILE</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                  <TableCell className="py-4 font-semibold text-[12px] text-gray-700">{item.role}</TableCell>
                  <TableCell className="py-4 text-[12px] font-medium text-gray-700">{item.name}</TableCell>
                  <TableCell className="py-4 text-[12px] font-medium text-gray-700">{item.email}</TableCell>
                  <TableCell className="py-4 text-[12px] font-medium text-gray-700">{item.office}</TableCell>
                  <TableCell className="py-4 text-[12px] font-medium text-gray-700">{item.mobile}</TableCell>
                  <TableCell className="py-4 text-center">
                    {/* The image shows a tiny eye icon bordered button */}
                    <Button variant="outline" size="icon" onClick={() => toast("Viewing member details...")} className="h-6 w-6 text-gray-500 border-gray-200 bg-white hover:bg-gray-100">
                      <Eye className="h-3 w-3" fill="currentColor" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No members match "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border w-full max-w-md p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X className="h-4 w-4" />
            </button>
            
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">Add New Member</h2>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Role *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., Architect" 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Name *</label>
                <Input 
                  type="text" 
                  required
                  placeholder="e.g., John Doe (Company Name)" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email</label>
                <Input 
                  type="email" 
                  placeholder="e.g., john@example.com" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Office</label>
                  <Input 
                    type="text" 
                    placeholder="e.g., (718) 555-1234" 
                    value={newOffice}
                    onChange={(e) => setNewOffice(e.target.value)}
                    className="w-full bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Mobile</label>
                  <Input 
                    type="text" 
                    placeholder="e.g., (718) 555-1234" 
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    className="w-full bg-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-500">Cancel</Button>
                <Button type="submit" className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold">Add Member</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}