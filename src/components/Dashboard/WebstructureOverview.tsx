import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Layers, 
  ChevronRight, 
  Search, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { MITS_DEPARTMENTS, MITS_WEBSTRUCTURE_HIERARCHY } from '../../data/initialData';
import { StaffMember, Student, DepartmentCode, WebstructureNode } from '../../types';

interface WebstructureOverviewProps {
  staffList: StaffMember[];
  studentList: Student[];
  onSelectDepartment?: (deptCode: DepartmentCode) => void;
}

export const WebstructureOverview: React.FC<WebstructureOverviewProps> = ({
  staffList,
  studentList,
  onSelectDepartment,
}) => {
  const [activeTab, setActiveTab] = useState<'HIERARCHY' | 'DEPARTMENTS' | 'STAFF_DIRECTORY'>('DEPARTMENTS');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');
  const [staffSearch, setStaffSearch] = useState<string>('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'bog': true,
    'director': true,
    'dean-academics': true,
    'dean-admin': true,
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const filteredStaff = staffList.filter(s => {
    const matchesDept = selectedDeptFilter === 'ALL' || s.department === selectedDeptFilter;
    const matchesSearch = staffSearch === '' ||
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.designation.toLowerCase().includes(staffSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const renderHierarchyNode = (node: WebstructureNode, level = 0) => {
    const isExpanded = expandedNodes[node.id] !== false;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative space-y-2">
        <div
          className={`flex items-start justify-between p-3.5 rounded-xl border transition-all ${
            level === 0
              ? 'bg-slate-900 text-white border-slate-800'
              : level === 1
              ? 'bg-amber-50 text-slate-900 border-amber-200'
              : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
          }`}
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => hasChildren && toggleNode(node.id)}
              className={`mt-0.5 p-1 rounded hover:bg-black/10 transition-colors ${!hasChildren ? 'invisible' : ''}`}
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{node.title}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    node.type === 'GOVERNANCE'
                      ? 'bg-amber-500 text-slate-950'
                      : node.type === 'ACADEMIC'
                      ? 'bg-blue-100 text-blue-800'
                      : node.type === 'ADMINISTRATION'
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {node.type}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <strong className={level === 0 ? 'text-amber-300' : 'text-slate-800'}>
                  {node.head}
                </strong>{' '}
                &bull; {node.designation}
              </div>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2 relative before:absolute before:left-4 before:top-0 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {node.children!.map(child => renderHierarchyNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sub-header navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <Layers className="w-5 h-5 text-amber-600" />
            Institute Webstructure & Governance Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Madhav Institute of Technology & Science administrative hierarchy, departmental matrix & staff deployment
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('DEPARTMENTS')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'DEPARTMENTS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Departments Matrix ({MITS_DEPARTMENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('HIERARCHY')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'HIERARCHY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Org Hierarchy Tree
          </button>
          <button
            onClick={() => setActiveTab('STAFF_DIRECTORY')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'STAFF_DIRECTORY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faculty & Staff Directory ({staffList.length})
          </button>
        </div>
      </div>

      {/* TAB 1: DEPARTMENTS MATRIX */}
      {activeTab === 'DEPARTMENTS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MITS_DEPARTMENTS.map(dept => {
              const deptStudents = studentList.filter(s => s.department === dept.code);
              const deptStaff = staffList.filter(s => s.department === dept.code);
              const lowAttendanceCount = deptStudents.filter(s => s.overallAttendance < 75).length;

              return (
                <div
                  key={dept.code}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold">
                        {dept.code}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {dept.accreditedUntil}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Estd. {dept.establishedYear} &bull; HoD: {dept.hodName}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {dept.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Student Strength</span>
                        <span className="font-bold text-slate-800 font-mono">{dept.totalStudents}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Core Faculty</span>
                        <span className="font-bold text-slate-800 font-mono">{dept.facultyCount}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Avg Attendance</span>
                        <span className="font-bold text-emerald-700 font-mono">{dept.averageAttendance}%</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Research Labs</span>
                        <span className="font-bold text-slate-800 font-mono">{dept.labsCount} Labs</span>
                      </div>
                    </div>

                    {lowAttendanceCount > 0 && (
                      <div className="px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center justify-between">
                        <span>Attendance Shortage (&lt;75%):</span>
                        <span className="font-mono font-bold">{lowAttendanceCount} Students Flagged</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">{dept.programsOffered.length} Programs</span>
                    {onSelectDepartment && (
                      <button
                        onClick={() => onSelectDepartment(dept.code)}
                        className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
                      >
                        Track Department &rarr;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HIERARCHY TREE */}
      {activeTab === 'HIERARCHY' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                MITS Gwalior Statutory Webstructure & Administrative Lines
              </h3>
              <p className="text-xs text-slate-500">
                Autonomous governance tree from Board of Governors down to academic and research wings
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">Expand/Collapse Interactive Nodes</div>
          </div>

          <div className="space-y-2 pt-2">
            {renderHierarchyNode(MITS_WEBSTRUCTURE_HIERARCHY)}
          </div>
        </div>
      )}

      {/* TAB 3: STAFF DIRECTORY */}
      {activeTab === 'STAFF_DIRECTORY' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={staffSearch}
                onChange={e => setStaffSearch(e.target.value)}
                placeholder="Search staff by name, employee ID, designation..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedDeptFilter}
                onChange={e => setSelectedDeptFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
              >
                <option value="ALL">All Departments</option>
                {MITS_DEPARTMENTS.map(d => (
                  <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Staff Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Faculty Member</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Designation & Cabin</th>
                  <th className="px-4 py-3">Biometric Check-In</th>
                  <th className="px-4 py-3">Workload / Wk</th>
                  <th className="px-4 py-3">Research Papers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map(member => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{member.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{member.employeeId} &bull; {member.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-800 text-[10px]">
                        {member.department}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-800 font-medium">{member.designation}</div>
                      <div className="text-[11px] text-slate-400">{member.cabinNumber}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          member.biometricStatus === 'PRESENT'
                            ? 'bg-emerald-100 text-emerald-800'
                            : member.biometricStatus === 'ON_DUTY'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          member.biometricStatus === 'PRESENT' ? 'bg-emerald-500' : member.biometricStatus === 'ON_DUTY' ? 'bg-blue-500' : 'bg-rose-500'
                        }`}></span>
                        {member.biometricStatus} {member.punchInTime && `(${member.punchInTime})`}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">
                      {member.weeklyTeachingHours} hrs/wk
                    </td>
                    <td className="px-4 py-3 font-mono text-amber-700 font-bold">
                      {member.publicationsCount} Scopus/IEEE
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
