import React, { useState } from 'react';
import { 
  UserCircle, 
  Award, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  FileText, 
  GraduationCap, 
  QrCode, 
  Phone, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { UserRole, Student, StaffMember } from '../../types';

interface RolePortalViewProps {
  activeRole: UserRole;
  students: Student[];
  staff: StaffMember[];
  onOpenAttendanceMarker: () => void;
  onOpenQrProjector: () => void;
}

export const RolePortalView: React.FC<RolePortalViewProps> = ({
  activeRole,
  students,
  staff,
  onOpenAttendanceMarker,
  onOpenQrProjector,
}) => {
  // Select active student (default to first or shortage student for demo)
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-001');
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staff[0]?.id || 'stf-001');
  const [downloadingAdmitCard, setDownloadingAdmitCard] = useState(false);
  const [admitCardSuccess, setAdmitCardSuccess] = useState(false);

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const activeStaff = staff.find(s => s.id === selectedStaffId) || staff[0];

  const handleDownloadAdmitCard = () => {
    if (activeStudent.overallAttendance < 75) {
      alert(`Autonomous Examination Cell Notice: Admit card generation is restricted for ${activeStudent.name} because cumulative attendance (${activeStudent.overallAttendance}%) is below the mandatory 75% threshold.`);
      return;
    }
    setDownloadingAdmitCard(true);
    setTimeout(() => {
      setDownloadingAdmitCard(false);
      setAdmitCardSuccess(true);
      setTimeout(() => setAdmitCardSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Role Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            {activeRole === 'STUDENT' ? 'Student Academic Dashboard' : activeRole === 'FACULTY' ? 'Faculty & HoD Workstation' : 'Director / Dean Executive Portal'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif mt-1">
            {activeRole === 'STUDENT'
              ? `Welcome back, ${activeStudent?.name}`
              : activeRole === 'FACULTY'
              ? `Faculty Desk: ${activeStaff?.name}`
              : 'MITS Executive Directorate'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {activeRole === 'STUDENT'
              ? `Enrollment: ${activeStudent?.enrollmentNo} • B.Tech ${activeStudent?.department} (Sem ${activeStudent?.semester}, Sec ${activeStudent?.section})`
              : activeRole === 'FACULTY'
              ? `${activeStaff?.designation} • Dept. of ${activeStaff?.department} • ID: ${activeStaff?.employeeId}`
              : 'Institutional management, administrative approvals, and real-time oversight'}
          </p>
        </div>

        {/* Persona quick switch */}
        {activeRole === 'STUDENT' && (
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700 text-xs">
            <label className="block text-[10px] text-slate-400 mb-1">Switch Demo Student Record:</label>
            <select
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="bg-slate-900 text-white font-bold p-1.5 rounded-lg border border-slate-700 text-xs focus:outline-none"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.department} - {s.overallAttendance}%) {s.overallAttendance < 75 ? '⚠️ Shortage' : '✅ Regular'}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeRole === 'FACULTY' && (
          <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700 text-xs">
            <label className="block text-[10px] text-slate-400 mb-1">Switch Faculty Profile:</label>
            <select
              value={selectedStaffId}
              onChange={e => setSelectedStaffId(e.target.value)}
              className="bg-slate-900 text-white font-bold p-1.5 rounded-lg border border-slate-700 text-xs focus:outline-none"
            >
              {staff.map(st => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.department} - {st.designation})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* VIEW: STUDENT PERSONA */}
      {activeRole === 'STUDENT' && activeStudent && (
        <div className="space-y-6">
          {/* Attendance Warning or Safe Banner */}
          {activeStudent.overallAttendance < 75 ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm">
                    Autonomous Attendance Shortage Warning: {activeStudent.overallAttendance}%
                  </div>
                  <div className="text-rose-700 mt-0.5">
                    Your attendance is below the statutory 75% threshold required to appear for End-Semester Examinations.
                    Automated SMS alerts have been dispatched to your registered parent contact.
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-rose-600 text-white font-bold font-mono text-xs rounded-lg uppercase tracking-wider self-end sm:self-auto flex-shrink-0">
                Action Required
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm">
                    Attendance Status: Satisfactory ({activeStudent.overallAttendance}%)
                  </div>
                  <div className="text-emerald-700 mt-0.5">
                    You have maintained regular attendance well above the autonomous 75% criterion. Hall ticket is cleared for download.
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white font-bold font-mono text-xs rounded-lg uppercase tracking-wider">
                Exam Qualified
              </span>
            </div>
          )}

          {admitCardSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Autonomous End-Semester Hall Ticket successfully downloaded with verified QR security stamp!</span>
            </div>
          )}

          {/* Student Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: Subject Attendance breakdown & CGPA */}
            <div className="lg:col-span-8 space-y-6">
              {/* Subject Attendance Breakdown */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    Enrolled Courses & Attendance Telemetry
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Semester {activeStudent.semester} ({activeStudent.batch})
                  </span>
                </div>

                <div className="space-y-4">
                  {activeStudent.subjectAttendance.map((sub, idx) => {
                    const pct = Math.round((sub.attended / sub.total) * 100);
                    const isLow = pct < 75;
                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">
                            {sub.subjectCode} - {sub.subjectName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-mono">
                              {sub.attended}/{sub.total} Classes
                            </span>
                            <span
                              className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                                isLow ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isLow ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Class Schedule Today */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Today's Scheduled Academic Slots
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">09:00 AM - 10:00 AM: CS-501 Compiler Design</div>
                      <div className="text-[11px] text-slate-500">Dr. Manish Dixit &bull; Room 204, CSE Main Block</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      ATTENDED (P)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">10:00 AM - 11:00 AM: CS-502 Operating Systems</div>
                      <div className="text-[11px] text-slate-500">Prof. Neha Bharadwaj &bull; Room 206, CSE Block</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px]">
                      SCHEDULED
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">02:00 PM - 04:00 PM: IDEA Lab Prototyping Workshop</div>
                      <div className="text-[11px] text-slate-500">Dr. Hemant Shrivastava &bull; AICTE IDEA Lab</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                      LAB SESSION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Student ID Card & Admit Card */}
            <div className="lg:col-span-4 space-y-4">
              {/* Digital ID Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white border border-amber-500/30 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="text-xs font-bold text-amber-400 font-serif">MITS GWALIOR</div>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                    SMART ID
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl font-serif flex-shrink-0 shadow-md">
                    {activeStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{activeStudent.name}</h4>
                    <p className="text-[11px] font-mono text-amber-300">{activeStudent.enrollmentNo}</p>
                    <p className="text-[10px] text-slate-400">B.Tech {activeStudent.department} (2022-26)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                  <div className="bg-slate-800/60 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Overall CGPA</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">{activeStudent.cgpa}</span>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Fee Status</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{activeStudent.feeStatus}</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="bg-white p-2 rounded-lg flex flex-col items-center justify-center">
                  <div className="h-6 w-full flex items-center justify-between gap-0.5 overflow-hidden">
                    {Array.from({ length: 42 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full ${i % 3 === 0 ? 'w-1 bg-black' : i % 5 === 0 ? 'w-0.5 bg-black' : 'w-1.5 bg-black'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 mt-1">{activeStudent.enrollmentNo}</span>
                </div>
              </div>

              {/* Hall Ticket Download Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Autonomous Examination Services
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  End-Semester Examination (Nov-Dec 2026) admit cards are generated digitally for students with cumulative attendance &gt;= 75%.
                </p>

                <button
                  onClick={handleDownloadAdmitCard}
                  disabled={downloadingAdmitCard}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                    activeStudent.overallAttendance < 75
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {downloadingAdmitCard
                      ? 'Verifying Biometric Roster...'
                      : activeStudent.overallAttendance < 75
                      ? 'Locked (Attendance < 75%)'
                      : 'Download Exam Hall Ticket'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: FACULTY PERSONA */}
      {activeRole === 'FACULTY' && activeStaff && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase">Biometric Punch</span>
              <div className="text-2xl font-bold font-mono text-emerald-700">
                {activeStaff.biometricStatus}
              </div>
              <div className="text-xs text-slate-400">
                {activeStaff.punchInTime ? `Punched at ${activeStaff.punchInTime}` : 'Terminal 1'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase">Weekly Teaching Load</span>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {activeStaff.weeklyTeachingHours} Hours
              </div>
              <div className="text-xs text-slate-400">Across 3 theory & 2 lab batches</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase">Research Output</span>
              <div className="text-2xl font-bold font-mono text-amber-700">
                {activeStaff.publicationsCount} Scopus/IEEE
              </div>
              <div className="text-xs text-slate-400">2 patents granted by Indian Patent Office</div>
            </div>
          </div>

          {/* Faculty Action Shortcuts */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Assigned Courses & Lecture Sessions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStaff.assignedSubjects.map((sub, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{sub}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Section A &bull; 64 Students Enrolled &bull; Slot: Today 09:00 AM</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={onOpenAttendanceMarker}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark Class Roster</span>
                    </button>
                    <button
                      onClick={onOpenQrProjector}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold text-xs flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Launch QR Code</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: ADMIN PERSONA */}
      {activeRole === 'ADMIN' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Super Admin Executive Overview & Policy Controls
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive institutional management across academic councils, board approvals, and audit telemetry
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Board of Governors</span>
              <div className="font-bold text-slate-900">Next Meeting: 14th Oct 2026</div>
              <p className="text-[11px] text-slate-600">Reviewing Autonomous Deemed University Transition & Capital Budget</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">NBA & NAAC Accreditation</span>
              <div className="font-bold text-emerald-700">Tier-I Compliant (A++)</div>
              <p className="text-[11px] text-slate-600">Annual Quality Assurance Report (AQAR) uploaded to UGC</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Attendance Policy Sentinel</span>
              <div className="font-bold text-amber-700">75% Mandatory Active</div>
              <p className="text-[11px] text-slate-600">Automated parent communications dispatched without human intervention</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
