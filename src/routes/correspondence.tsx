import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, Mail, MoreHorizontal, FileText, Send, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute('/correspondence')({
  component: CorrespondencePage,
});

function CorrespondencePage() {
  const [messages, setMessages] = useState([
    { id: "COR-001", subject: "Site Access Request - Tower B", from: "Sarah Chen", date: "2026-06-02", status: "Open" },
    { id: "COR-002", subject: "Material Delivery Schedule", from: "Luke Prescott", date: "2026-06-01", status: "Closed" },
  ]);

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState({ subject: "", from: "", body: "" });

  const handleCompose = () => {
    const entry = {
      id: `COR-00${messages.length + 1}`,
      subject: newMessage.subject || "New Message",
      from: newMessage.from || "User",
      date: new Date().toISOString().split('T')[0],
      status: "Open"
    };
    setMessages([entry, ...messages]);
    setIsComposeOpen(false);
    setNewMessage({ subject: "", from: "", body: "" });
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="p-8" onClick={() => setActiveMenuId(null)}>
      <h1 className="text-2xl font-bold mb-6">Correspondence</h1>

      <div className="bg-slate-50 border p-4 rounded-lg mb-6 w-1/3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Total Messages</p>
            <p className="text-2xl font-bold">{messages.length}</p>
          </div>
          <Mail className="h-6 w-6 text-slate-400" />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <Input placeholder="Search subject or sender..." className="w-80" />
        <Button onClick={() => setIsComposeOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C]">
          <Plus className="mr-2 h-4 w-4" /> Compose
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>SUBJECT</TableHead>
              <TableHead>FROM</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell className="font-mono text-xs text-slate-500">{msg.id}</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" /> {msg.subject}
                </TableCell>
                <TableCell>{msg.from}</TableCell>
                <TableCell>{msg.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${msg.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {msg.status}
                  </span>
                </TableCell>
                <TableCell className="relative">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === msg.id ? null : msg.id); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {activeMenuId === msg.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg z-10 rounded-md">
                      <button onClick={() => handleDelete(msg.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
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

      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Compose Message</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Sender Name" onChange={e => setNewMessage({...newMessage, from: e.target.value})} />
            <Input placeholder="Subject" onChange={e => setNewMessage({...newMessage, subject: e.target.value})} />
            {/* Yahan Textarea add kiya gaya hai */}
            <textarea 
              className="w-full min-h-[120px] p-2 border rounded-md text-sm border-slate-200" 
              placeholder="Write your message here..."
              onChange={e => setNewMessage({...newMessage, body: e.target.value})}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCompose} className="bg-[#E11D48]"><Send className="mr-2 h-4 w-4" /> Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}