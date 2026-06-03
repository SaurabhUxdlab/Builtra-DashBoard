import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";

const members = [
  {
    role: "Architect",
    name: "Arthur Vandeley (Art Vendeley Architecture & Planning)",
    email: "arthur.vendeley@gmail.com",
    office: "(718) 555-1234",
    mobile: "(718) 555-1234",
  },
  {
    role: "Project Manager",
    name: "Chris Berkley (Golden Key Construction)",
    email: "chris.berkley@gmail.com",
    office: "(718) 555-1234",
    mobile: "(718) 555-1234",
  },
  {
    role: "Super Intendent",
    name: "Luke Prescott (Golden Key Construction)",
    email: "luke.prescott@gmail.com",
    office: "(718) 555-1234",
    mobile: "(718) 555-1234",
  },
];

const Documents = () => {
  return (
      <div className="flex flex-col h-full">
        {/* Breadcrumb */}
        <div className="mb-2 text-xs text-gray-500">
          Dashboard &gt;{" "}
          <span className="font-semibold text-gray-900">Documents</span>
        </div>
  
        {/* Heading */}
        <h1 className="text-[34px] font-bold text-gray-900 mb-6">
          Documents
        </h1>
  
        {/* Main White Container */}
        <div className="flex flex-col flex-1 bg-white border border-[#d9d9d9] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-[#d9d9d9]">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-[300px] h-[38px] pl-4 pr-10 text-sm bg-[#f7f7f7] border border-[#d9d9d9] rounded-md outline-none"
                />
  
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
  
              {/* Filter */}
              <button className="h-[38px] w-[38px] flex items-center justify-center border border-[#d9d9d9] bg-[#f7f7f7] rounded-md cursor-pointer">
                <Filter size={15} />
              </button>
            </div>
  
            {/* New Member */}
            <button className="h-[38px] px-6 bg-pink-600 hover:bg-pink-700 text-white rounded-md flex items-center gap-2 text-sm font-medium cursor-pointer">
              <Plus size={15} />
              New Member
            </button>
          </div>
  
          {/* Scrollable Table Area */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-[#f3f4f6]">
                <tr>
                  <th className="border border-[#d9d9d9] px-4 py-3 text-left text-[11px] font-semibold uppercase text-gray-600">
                    Role
                  </th>
  
                  <th className="border border-[#d9d9d9] px-4 py-3 text-left text-[11px] font-semibold uppercase text-gray-600">
                    Name
                  </th>
  
                  <th className="border border-[#d9d9d9] px-4 py-3 text-left text-[11px] font-semibold uppercase text-gray-600">
                    Email
                  </th>
  
                  <th className="border border-[#d9d9d9] px-4 py-3 text-left text-[11px] font-semibold uppercase text-gray-600">
                    Office
                  </th>
  
                  <th className="border border-[#d9d9d9] px-4 py-3 text-left text-[11px] font-semibold uppercase text-gray-600">
                    Mobile
                  </th>
  
                  <th className="border border-[#d9d9d9] w-12"></th>
                </tr>
              </thead>
  
              <tbody>
                {members.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-[#d9d9d9] px-4 py-3 text-sm">
                      {member.role}
                    </td>
  
                    <td className="border border-[#d9d9d9] px-4 py-3 text-sm">
                      {member.name}
                    </td>
  
                    <td className="border border-[#d9d9d9] px-4 py-3 text-sm">
                      {member.email}
                    </td>
  
                    <td className="border border-[#d9d9d9] px-4 py-3 text-sm">
                      {member.office}
                    </td>
  
                    <td className="border border-[#d9d9d9] px-4 py-3 text-sm">
                      {member.mobile}
                    </td>
  
                    <td className="border border-[#d9d9d9] text-center">
                      <button>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            {/* Empty White Space */}
            <div className="flex-1 min-h-[400px] bg-white"></div>
          </div>
        </div>
      </div>
    );
}

export default Documents