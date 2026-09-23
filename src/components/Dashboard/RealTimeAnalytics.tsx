import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Award, 
  Activity, 
  Filter,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Briefcase
} from 'lucide-react';
import { MITS_DEPARTMENTS } from '../../data/initialData';
import { Student, StaffMember, AttendanceRecord, DepartmentCode } from '../../types';

interface RealTimeAnalyticsProps {
  students: Student[];
  staff: StaffMember[];
  attendanceRecords: AttendanceRecord[];
}

export const RealTimeAnalytics: React.FC<RealTimeAnalyticsProps> = ({
  students,
  staff,
  attendanceRecords,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(true);
  const [livePulse, setLivePulse] = useState<number>(0);

  // Periodic heartbeat animation for live telemetry feel
  useEffect(() => {
    if (!isSimulatingLive) return;
    const interval = setInterval(() => {
      setLivePulse(p => p + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  // Filtered dataset
  const filteredStudents = selectedDept === 'ALL'
    ? students
    : students.filter(s => s.department === selectedDept);

  const filteredStaff = selectedDept === 'ALL'
    ? staff
    : staff.filter(s => s.department === selectedDept);

  // Calculations
  const totalStudents = filteredStudents.length;
  const avgAttendance = totalStudents > 0
    ? (filteredStudents.reduce((acc, s) => acc + s.overallAttendance, 0) / totalStudents).toFixed(1)
    : '0';

  const lowAttendanceStudents = filteredStudents.filter(s => s.overallAttendance < 75);
  const criticalLowCount = lowAttendanceStudents.length;

  const totalStaff = filteredStaff.length;
  const staffPresentCount = filteredStaff.filter(s => s.biometricStatus === 'PRESENT' || s.biometricStatus === 'ON_DUTY').length;
  const staffBiometricRate = totalStaff > 0 ? Math.round((staffPresentCount / totalStaff) * 100) : 0;

  const avgCgpa = totalStudents > 0
    ? (filteredStudents.reduce((acc, s) => acc + s.cgpa, 0) / totalStudents).toFixed(2)
    : '0';

  // Department attendance comparison
  const deptAttendanceStats = MITS_DEPARTMENTS.map(dept => {
    const deptStuds = students.filter(s => s.department === dept.code);
    const avg = deptStuds.length > 0
      ? deptStuds.reduce((acc, s) => acc + s.overallAttendance, 0) / deptStuds.length
      : dept.averageAttendance;
    return {
      code: dept.code,
      name: dept.name,
      attendance: Number(avg.toFixed(1)),
      students: dept.totalStudents,
      faculty: dept.facultyCount,
      isBelowThreshold: avg < 75,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Controls & Live Indicator Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>MITS Gwalior Real-Time Institutional Analytics</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                LIVE STREAM
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Synchronized attendance telemetry, biometric gate logs, academic GPA distributions & shortage alarms
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Department:</span>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Engineering Branches</option>
              {MITS_DEPARTMENTS.map(d => (
                <option key={d.code} value={d.code}>{d.code} - {d.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsSimulatingLive(!isSimulatingLive)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
              isSimulatingLive
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingLive ? 'animate-spin' : ''}`} />
            <span>{isSimulatingLive ? 'Live Feed Active' : 'Feed Paused'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Student Attendance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Student Attendance</span>
            <span className="flex items-center gap-0.5 text-emerald-600 font-bold text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" /> +1.4% today
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900">{avgAttendance}%</span>
            <span className="text-xs text-slate-400">/ 75% target</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                Number(avgAttendance) >= 75 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Number(avgAttendance))}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Autonomous threshold: 75% mandatory for hall tickets
          </p>
        </div>

        {/* KPI 2: Critical Shortage Alert */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-rose-700">Shortage Alarm (&lt;75%)</span>
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">
              AUTO-TRIGGER
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-rose-600">{criticalLowCount}</span>
            <span className="text-xs text-slate-500">Students Flagged</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200">
            <span>Automated SMS/Email sent:</span>
            <strong className="font-mono">{criticalLowCount} Parents Alerted</strong>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            De-barment notice generated if attendance &lt; 65%
          </p>
        </div>

        {/* KPI 3: Staff Biometric Check-In */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Staff Biometric Status</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
              <Clock className="w-3 h-3" /> Cutoff 09:15 AM
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900">{staffBiometricRate}%</span>
            <span className="text-xs text-slate-500">Punch Compliance</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              {staffPresentCount} Present
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
              {totalStaff - staffPresentCount} Absent/Leave
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            RGPV Bio-Terminal 1 to 4 active & geo-fenced
          </p>
        </div>

        {/* KPI 4: Academic Performance & CGPA */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Academic Index</span>
            <span className="text-amber-600 font-bold text-[11px] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Autonomous
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-amber-700">{avgCgpa}</span>
            <span className="text-xs text-slate-500">/ 10.00 CGPA</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg">
            <span>Dean's Honor Roll (&gt;8.5):</span>
            <strong className="font-mono text-amber-800">
              {filteredStudents.filter(s => s.cgpa >= 8.5).length} Scholars
            </strong>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Outcome Based Education (OBE) credit metrics
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Department Attendance Comparison with 75% Target Line */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Departmental Attendance Telemetry vs 75% Mandatory Baseline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time cumulative attendance percentage by engineering department
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-amber-500 inline-block"></span> Safe (&gt;=75%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span> Warning (&lt;75%)
              </span>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="space-y-3 pt-2">
            {deptAttendanceStats.map(item => (
              <div key={item.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-8 font-mono">{item.code}</span>
                    <span className="font-normal text-slate-500 hidden sm:inline">{item.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.students} Students
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        item.attendance >= 75 ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {item.attendance}%
                    </span>
                  </div>
                </div>

                <div className="relative w-full h-5 bg-slate-100 rounded-md overflow-hidden flex items-center">
                  {/* 75% statutory marker line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10"
                    style={{ left: '75%' }}
                    title="Mandatory 75% threshold"
                  ></div>

                  {/* Attendance fill bar */}
                  <div
                    className={`h-full rounded-md transition-all duration-700 ${
                      item.attendance >= 85
                        ? 'bg-emerald-500'
                        : item.attendance >= 75
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${item.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
            <span>Red vertical line denotes Autonomous 75% exam qualification barrier</span>
            <span className="font-mono">Updated: Real-time telemetry feed</span>
          </div>
        </div>

        {/* Right Side: Staff Productivity & Placement Telemetry */}
        <div className="lg:col-span-4 space-y-4">
          {/* Staff Workload & Biometric Radar */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              Faculty Workload & Biometrics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Avg Teaching Hours/Wk</span>
                <span className="font-mono font-bold text-slate-900">16.4 hrs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Student-to-Faculty Ratio</span>
                <span className="font-mono font-bold text-emerald-700">1 : 14.8 (Compliant)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Scopus/IEEE Papers (2026)</span>
                <span className="font-mono font-bold text-amber-700">142 Publications</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Active AICTE Research Grants</span>
                <span className="font-mono font-bold text-blue-700">₹ 2.18 Crores</span>
              </div>
            </div>
          </div>

          {/* Training & Placement Real-Time Snapshot */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-xl text-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Placements 2026
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                89.2% Placed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-lg font-mono font-bold text-amber-300">₹ 44.0 LPA</div>
                <div className="text-[10px] text-slate-400">Highest Package</div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="text-lg font-mono font-bold text-emerald-300">₹ 8.65 LPA</div>
                <div className="text-[10px] text-slate-400">Average Package</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Top recruiters active this week: Goldman Sachs, Cisco, Infosys Digital, Tata Motors & L&T.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Attendance Shortage Roster Alert Table */}
      {criticalLowCount > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">
                  Active Attendance Shortage Red-Zone (&lt;75% Autonomous Criteria)
                </h4>
                <p className="text-xs text-rose-700">
                  These scholars have received automated SMS & Email warnings. Immediate academic counseling advised.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-rose-600 text-white px-2.5 py-1 rounded-md self-start sm:self-auto">
              {criticalLowCount} Active Cases
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg border border-rose-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-100/60 text-rose-900 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-3 py-2">Enrollment No</th>
                  <th className="px-3 py-2">Student Name</th>
                  <th className="px-3 py-2">Dept / Sem</th>
                  <th className="px-3 py-2">Current Attendance</th>
                  <th className="px-3 py-2">Classes Needed for 75%</th>
                  <th className="px-3 py-2">Automated Alert Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {lowAttendanceStudents.map(std => {
                  // Approximate classes to recover to 75%:
                  // If attended A out of T, (A + x)/(T + x) = 0.75 => x = 3T - 4A
                  const totalEst = 32;
                  const attendedEst = Math.round((std.overallAttendance / 100) * totalEst);
                  const needed = Math.max(1, (3 * totalEst) - (4 * attendedEst));

                  return (
                    <tr key={std.id} className="hover:bg-rose-50/50">
                      <td className="px-3 py-2 font-mono font-bold text-slate-900">{std.enrollmentNo}</td>
                      <td className="px-3 py-2 font-semibold text-slate-800">{std.name}</td>
                      <td className="px-3 py-2 font-mono text-slate-600">{std.department} - Sem {std.semester}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-rose-700 bg-rose-100">
                          {std.overallAttendance}%
                        </span>
                      </td>
                      <td className="px-3 py-2 font-mono font-bold text-amber-700">
                        +{needed} consecutive lectures
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          SMS Dispatched to Parent
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
