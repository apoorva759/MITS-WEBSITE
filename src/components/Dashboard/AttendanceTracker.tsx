import React, { useState } from 'react';
import { 
  CheckSquare, 
  QrCode, 
  Fingerprint, 
  Users, 
  AlertTriangle, 
  Clock, 
  Save, 
  Download, 
  Search, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  Send,
  Calendar,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { MITS_DEPARTMENTS } from '../../data/initialData';
import { 
  Student, 
  StaffMember, 
  AttendanceRecord, 
  DepartmentCode, 
  AttendanceStatus,
  Announcement 
} from '../../types';

interface AttendanceTrackerProps {
  students: Student[];
  staff: StaffMember[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendanceRecord: (record: AttendanceRecord) => void;
  onTriggerAutomatedShortageAlert: (student: Student) => void;
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  students,
  staff,
  attendanceRecords,
  onSaveAttendanceRecord,
  onTriggerAutomatedShortageAlert,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'MARK_SESSION' | 'QR_PROJECTOR' | 'BIOMETRIC_LOGS' | 'SHORTAGE_MONITOR'>('MARK_SESSION');

  // Session Marker State
  const [selectedDept, setSelectedDept] = useState<DepartmentCode>('CSE');
  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [selectedSection, setSelectedSection] = useState<string>('A');
  const [selectedSubject, setSelectedSubject] = useState<string>('CS-501 Compiler Design');
  const [selectedSlot, setSelectedSlot] = useState<string>('09:00 AM - 10:00 AM');
  const [facultyInCharge, setFacultyInCharge] = useState<string>('Dr. Manish Dixit (MITS-FAC-104)');

  // Attendance status mapping for the active roster session
  const [sessionRoster, setSessionRoster] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    students.forEach(s => {
      initial[s.id] = s.overallAttendance < 75 ? 'A' : 'P';
    });
    return initial;
  });

  const [sessionSavedSuccess, setSessionSavedSuccess] = useState<boolean>(false);
  const [qrToken, setQrToken] = useState<string>('MITS-QR-SEC-9842');
  const [qrSecondsLeft, setQrSecondsLeft] = useState<number>(24);
  const [recentQrScans, setRecentQrScans] = useState<string[]>([]);

  // Filter students for current selected class
  const classStudents = students.filter(
    s => s.department === selectedDept && s.semester === selectedSemester
  );

  const toggleStudentStatus = (studentId: string) => {
    setSessionRoster(prev => {
      const current = prev[studentId] || 'P';
      const nextStatus: AttendanceStatus = 
        current === 'P' ? 'A' : current === 'A' ? 'L' : current === 'L' ? 'E' : 'P';
      return { ...prev, [studentId]: nextStatus };
    });
  };

  const markAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = { ...sessionRoster };
    classStudents.forEach(s => {
      updated[s.id] = status;
    });
    setSessionRoster(updated);
  };

  const handleSaveAttendance = () => {
    const presentCount = classStudents.filter(s => sessionRoster[s.id] === 'P').length;
    const absentCount = classStudents.filter(s => sessionRoster[s.id] === 'A').length;
    const lateCount = classStudents.filter(s => sessionRoster[s.id] === 'L').length;

    const newRecord: AttendanceRecord = {
      id: `att-rec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      slot: selectedSlot,
      subjectCode: selectedSubject.split(' ')[0],
      subjectName: selectedSubject,
      department: selectedDept,
      semester: selectedSemester,
      section: selectedSection,
      facultyId: 'stf-001',
      facultyName: facultyInCharge,
      totalStudents: classStudents.length,
      presentCount,
      absentCount,
      lateCount,
      mode: 'MANUAL_ROSTER',
      studentStatus: { ...sessionRoster }
    };

    onSaveAttendanceRecord(newRecord);
    setSessionSavedSuccess(true);
    setTimeout(() => setSessionSavedSuccess(false), 4000);
  };

  const handleSimulateQrScan = () => {
    const absentCandidate = classStudents.find(s => sessionRoster[s.id] === 'A') || classStudents[0];
    if (absentCandidate) {
      setSessionRoster(prev => ({ ...prev, [absentCandidate.id]: 'P' }));
      setRecentQrScans(prev => [
        `${absentCandidate.name} (${absentCandidate.enrollmentNo}) verified via GPS Geofence (accuracy: 1.2m)`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  const exportToCsv = () => {
    const headers = ['Enrollment No', 'Name', 'Department', 'Semester', 'Overall Attendance %', 'Session Status'];
    const rows = classStudents.map(s => [
      s.enrollmentNo,
      s.name,
      s.department,
      s.semester,
      `${s.overallAttendance}%`,
      sessionRoster[s.id] || 'P'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MITS_Attendance_${selectedDept}_Sem${selectedSemester}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const presentCount = classStudents.filter(s => (sessionRoster[s.id] || 'P') === 'P').length;
  const absentCount = classStudents.filter(s => sessionRoster[s.id] === 'A').length;
  const lateCount = classStudents.filter(s => sessionRoster[s.id] === 'L').length;
  const attendanceRate = classStudents.length > 0 
    ? Math.round((presentCount / classStudents.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Navigation sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <CheckSquare className="w-5 h-5 text-amber-600" />
            MITS Integrated Attendance Tracking Engine
          </h2>
          <p className="text-xs text-slate-500">
            Real-time classroom session marker, dynamic QR projector scanner, RFID biometric streams & shortage alerts
          </p>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('MARK_SESSION')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSubTab === 'MARK_SESSION' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mark Class Session
          </button>
          <button
            onClick={() => setActiveSubTab('QR_PROJECTOR')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              activeSubTab === 'QR_PROJECTOR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-amber-600" />
            <span>QR Projector View</span>
          </button>
          <button
            onClick={() => setActiveSubTab('SHORTAGE_MONITOR')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSubTab === 'SHORTAGE_MONITOR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shortage Monitor (&lt;75%)
          </button>
          <button
            onClick={() => setActiveSubTab('BIOMETRIC_LOGS')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSubTab === 'BIOMETRIC_LOGS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Staff Biometrics
          </button>
        </div>
      </div>

      {/* SUCCESS BANNER WHEN SAVED */}
      {sessionSavedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">
              Attendance Session Successfully Synchronized! Telemetry updated across student portal and automated alerts evaluated.
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase bg-emerald-200 px-2 py-0.5 rounded">
            SYNCED WITH RGPV AUTONOMOUS LEDGER
          </span>
        </div>
      )}

      {/* SUB-TAB 1: MARK CLASS SESSION */}
      {activeSubTab === 'MARK_SESSION' && (
        <div className="space-y-6">
          {/* Class Configuration Bar */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Department</label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value as DepartmentCode)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
              >
                {MITS_DEPARTMENTS.map(d => (
                  <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Semester & Section</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedSemester}
                  onChange={e => setSelectedSemester(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Sem {s}</option>
                  ))}
                </select>
                <select
                  value={selectedSection}
                  onChange={e => setSelectedSection(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
                >
                  {['A', 'B', 'C'].map(sec => (
                    <option key={sec} value={sec}>Sec {sec}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Subject / Course Code</label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
              >
                <option value="CS-501 Compiler Design">CS-501 Compiler Design</option>
                <option value="CS-502 Operating Systems">CS-502 Operating Systems</option>
                <option value="CS-503 Computer Networks">CS-503 Computer Networks</option>
                <option value="IT-501 Cloud Architecture">IT-501 Cloud Architecture</option>
                <option value="AI-501 Neural Networks">AI-501 Neural Networks</option>
                <option value="EC-501 Microcontrollers">EC-501 Microcontrollers</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Lecture Time Slot</label>
              <select
                value={selectedSlot}
                onChange={e => setSelectedSlot(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 focus:outline-none"
              >
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:15 AM - 12:15 PM">11:15 AM - 12:15 PM</option>
                <option value="12:15 PM - 01:15 PM">12:15 PM - 01:15 PM</option>
                <option value="02:00 PM - 04:00 PM (Lab)">02:00 PM - 04:00 PM (Lab)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Faculty In-Charge</label>
              <input
                type="text"
                value={facultyInCharge}
                onChange={e => setFacultyInCharge(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Roster Actions & Stats Bar */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Enrolled</span>
                <span className="font-bold text-base font-mono">{classStudents.length}</span>
              </div>
              <div className="h-6 w-px bg-slate-700"></div>
              <div>
                <span className="text-emerald-400 block text-[10px]">Present</span>
                <span className="font-bold text-base font-mono text-emerald-300">{presentCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-700"></div>
              <div>
                <span className="text-rose-400 block text-[10px]">Absent</span>
                <span className="font-bold text-base font-mono text-rose-300">{absentCount}</span>
              </div>
              <div className="h-6 w-px bg-slate-700"></div>
              <div>
                <span className="text-amber-400 block text-[10px]">Attendance Rate</span>
                <span className="font-bold text-base font-mono text-amber-300">{attendanceRate}%</span>
              </div>
            </div>

            {/* Bulk Action Buttons */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => markAll('P')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg transition-colors"
              >
                Mark All Present (P)
              </button>
              <button
                onClick={() => markAll('A')}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 font-bold rounded-lg transition-colors"
              >
                Clear All (A)
              </button>
              <button
                onClick={exportToCsv}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleSaveAttendance}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 shadow-md transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Submit & Log Session</span>
              </button>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">
                Interactive Classroom Attendance Roster ({classStudents.length} Students)
              </h3>
              <div className="text-xs text-slate-500">
                Click any status badge to toggle: <span className="font-bold text-emerald-700">P</span> &rarr; <span className="font-bold text-rose-700">A</span> &rarr; <span className="font-bold text-amber-700">L</span> &rarr; <span className="font-bold text-blue-700">E</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Enrollment No</th>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Cumulative Attendance</th>
                    <th className="px-4 py-3">Consecutive Absences</th>
                    <th className="px-4 py-3">Session Status</th>
                    <th className="px-4 py-3">Automated Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map(student => {
                    const status = sessionRoster[student.id] || 'P';
                    const isShortage = student.overallAttendance < 75;

                    return (
                      <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {student.enrollmentNo}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800">{student.name}</div>
                          <div className="text-[11px] text-slate-400">{student.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono font-bold text-xs ${
                                isShortage ? 'text-rose-600' : 'text-emerald-700'
                              }`}
                            >
                              {student.overallAttendance}%
                            </span>
                            {isShortage && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[9px] uppercase tracking-wider">
                                Shortage
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600">
                          {student.consecutiveAbsents > 0 ? (
                            <span className="text-amber-700 font-bold">
                              {student.consecutiveAbsents} day(s) missed
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-medium">Regular</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleStudentStatus(student.id)}
                            className={`px-3 py-1.5 rounded-lg font-bold font-mono text-xs flex items-center gap-1.5 shadow-sm transition-all ${
                              status === 'P'
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : status === 'A'
                                ? 'bg-rose-600 text-white hover:bg-rose-700'
                                : status === 'L'
                                ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            <span>{status === 'P' ? 'PRESENT (P)' : status === 'A' ? 'ABSENT (A)' : status === 'L' ? 'LATE (L)' : 'EXCUSED (E)'}</span>
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          {isShortage ? (
                            <button
                              onClick={() => onTriggerAutomatedShortageAlert(student)}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md font-bold text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <Send className="w-3 h-3" />
                              <span>Trigger Parent SMS</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">
                              Satisfies criteria
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: QR PROJECTOR VIEW */}
      {activeSubTab === 'QR_PROJECTOR' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6 max-w-3xl mx-auto">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Autonomous Classroom QR Projector Mode
            </span>
            <h3 className="text-2xl font-black font-serif text-slate-900 mt-2">
              Scan Dynamic Attendance Code
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Project this screen in lecture halls. Students scan via the MITS mobile app within geofenced campus coordinates.
            </p>
          </div>

          {/* QR Box simulator */}
          <div className="relative inline-block p-6 rounded-2xl bg-slate-900 border-4 border-amber-500 shadow-2xl">
            {/* SVG QR Code Simulation */}
            <div className="w-64 h-64 bg-white p-3 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                {/* QR corner 1 */}
                <rect x="5" y="5" width="28" height="28" rx="2" fill="currentColor" />
                <rect x="9" y="9" width="20" height="20" rx="1" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="currentColor" />

                {/* QR corner 2 */}
                <rect x="67" y="5" width="28" height="28" rx="2" fill="currentColor" />
                <rect x="71" y="9" width="20" height="20" rx="1" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="currentColor" />

                {/* QR corner 3 */}
                <rect x="5" y="67" width="28" height="28" rx="2" fill="currentColor" />
                <rect x="9" y="71" width="20" height="20" rx="1" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="currentColor" />

                {/* QR Matrix Pattern Dots */}
                <rect x="38" y="10" width="8" height="8" fill="currentColor" />
                <rect x="50" y="14" width="8" height="8" fill="currentColor" />
                <rect x="38" y="24" width="6" height="6" fill="currentColor" />
                <rect x="48" y="24" width="10" height="6" fill="currentColor" />
                <rect x="10" y="38" width="6" height="10" fill="currentColor" />
                <rect x="20" y="42" width="8" height="8" fill="currentColor" />
                <rect x="38" y="38" width="24" height="24" rx="3" fill="#b45309" />
                <circle cx="50" cy="50" r="6" fill="white" />
                <rect x="68" y="38" width="8" height="8" fill="currentColor" />
                <rect x="80" y="44" width="10" height="6" fill="currentColor" />
                <rect x="38" y="68" width="12" height="8" fill="currentColor" />
                <rect x="54" y="72" width="6" height="12" fill="currentColor" />
                <rect x="68" y="68" width="10" height="10" fill="currentColor" />
                <rect x="82" y="80" width="10" height="10" fill="currentColor" />
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-amber-300 font-mono">
              <span>Token: {qrToken}</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <RotateCw className="w-3 h-3 animate-spin" />
                Refreshing in {qrSecondsLeft}s
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSimulateQrScan}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate Student Mobile App Scan (Demo Trigger)</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Validates GPS Lat: 26.2307° N, Lon: 78.2045° E (MITS Gwalior Geofence Range &lt; 50m)
            </p>
          </div>

          {recentQrScans.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live Check-In Ingress Telemetry:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {recentQrScans.map((scan, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-emerald-700 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{scan}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SHORTAGE MONITOR (<75%) */}
      {activeSubTab === 'SHORTAGE_MONITOR' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Autonomous Attendance Shortage Registry (&lt;75% Criteria)
              </h3>
              <p className="text-xs text-slate-500">
                Automated show-cause notice generator and parental communication dispatch
              </p>
            </div>
            <button
              onClick={() => {
                students.filter(s => s.overallAttendance < 75).forEach(s => onTriggerAutomatedShortageAlert(s));
              }}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Warning to All Parents</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Enrollment No</th>
                  <th className="px-4 py-3">Student & Contact</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Overall Attendance</th>
                  <th className="px-4 py-3">Deficit Classes</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.filter(s => s.overallAttendance < 75).map(std => {
                  const needed = Math.max(2, Math.round((75 - std.overallAttendance) * 0.4));
                  return (
                    <tr key={std.id} className="hover:bg-rose-50/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {std.enrollmentNo}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">{std.name}</div>
                        <div className="text-[11px] text-slate-400">{std.phone} &bull; {std.email}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700">
                        {std.department} - Sem {std.semester}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-rose-700 bg-rose-100">
                          {std.overallAttendance}%
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-amber-700">
                        Needs +{needed} classes to reach 75%
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onTriggerAutomatedShortageAlert(std)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded font-bold text-[11px] flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Dispatch Alert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: STAFF BIOMETRICS */}
      {activeSubTab === 'BIOMETRIC_LOGS' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-emerald-600" />
                Staff Biometric Terminal Logs & Geo-Fenced Punching
              </h3>
              <p className="text-xs text-slate-500">
                Live feed from Bio-Terminals at Main Gate, Admin Block, and Engineering Blocks
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-bold">
              Terminal Status: All 6 Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {staff.map(member => (
              <div
                key={member.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{member.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {member.employeeId} &bull; {member.department} &bull; {member.designation}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Teaching Load: {member.weeklyTeachingHours} hrs/wk &bull; {member.cabinNumber}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      member.biometricStatus === 'PRESENT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : member.biometricStatus === 'ON_DUTY'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {member.biometricStatus}
                  </span>
                  <div className="text-[10px] font-mono text-slate-400">
                    {member.punchInTime ? `Punched: ${member.punchInTime}` : 'Not Checked In'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
