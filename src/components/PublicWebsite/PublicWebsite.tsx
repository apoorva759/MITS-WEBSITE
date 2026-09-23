import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  MapPin,
  Laptop
} from 'lucide-react';
import { MITS_DEPARTMENTS } from '../../data/initialData';
import { Announcement, DepartmentStructure } from '../../types';

interface PublicWebsiteProps {
  onGoToDashboard: () => void;
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  onGoToDashboard,
  announcements,
  onSelectAnnouncement,
}) => {
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>('CSE');
  const [noticeFilter, setNoticeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDept = MITS_DEPARTMENTS.find(d => d.code === selectedDeptCode) || MITS_DEPARTMENTS[0];

  const filteredNotices = announcements.filter(a => {
    const matchesFilter = noticeFilter === 'ALL' || a.category === noticeFilter;
    const matchesSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white pt-12 pb-20 px-4">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Autonomous Institute • Estd. 1957 by Maharaja J.R. Scindia</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
                Madhav Institute of Technology & Science
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Gwalior (M.P.), India
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Empowering visionary engineers and researchers for over 68 years. Recognized with{' '}
                <strong className="text-amber-300 font-semibold">NAAC A++ Grade</strong>, NBA accredited programs,
                and state-of-the-art AICTE IDEA Lab infrastructure.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-go-dashboard-btn"
                  onClick={onGoToDashboard}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Launch Institute Management System (IMS)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#departments-section"
                  className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-sm border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Explore Academic Webstructure</span>
                </a>
              </div>

              {/* Accreditations Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>NAAC A++ (Highest Accreditation)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>NBA Tier-I Accredited Branches</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>AICTE IDEA Lab Center</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>RGPV Affiliated Autonomous</span>
                </div>
              </div>
            </div>

            {/* Hero Right Quick IMS Portal Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      IMS Webstructure Live Hub
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">Real-time gateway for students, faculty & administration</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Session
                  </span>
                </div>

                {/* Quick stats counter */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-2xl font-black text-amber-400 font-mono">3,850+</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">Enrolled Scholars</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-2xl font-black text-emerald-400 font-mono">88.4%</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">Campus Attendance Today</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-2xl font-black text-blue-400 font-mono">180+</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">Faculty Members</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-2xl font-black text-purple-400 font-mono">44 LPA</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">Highest Package 2026</div>
                  </div>
                </div>

                {/* Direct quick action */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={onGoToDashboard}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>Enter Student & Staff Attendance Tracking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    Automated shortage tracking, class rosters, QR check-in & announcements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker for latest circulars */}
      <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-wider flex-shrink-0">
            OFFICIAL NOTICE
          </span>
          <div className="truncate flex-1">
            {announcements[0]?.title || 'Autonomous End-Semester Examination Schedule Published for Nov-Dec 2026'}
          </div>
          <button
            onClick={() => onSelectAnnouncement(announcements[0])}
            className="text-amber-200 hover:text-white underline text-[11px] flex-shrink-0"
          >
            Read Notice &rarr;
          </button>
        </div>
      </div>

      {/* Main Content Area: Notices & Academic Webstructure */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Section 1: Live Announcements & Circulars Feed */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <FileText className="w-4 h-4" />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                  Automated Institutional Notices & Announcements
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time circulars with automated triggers for attendance shortage, examination, and recruitment
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {(['ALL', 'ATTENDANCE', 'EXAM', 'PLACEMENT', 'ADMINISTRATIVE'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setNoticeFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    noticeFilter === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All Notices' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotices.slice(0, 6).map(notice => (
              <div
                key={notice.id}
                onClick={() => onSelectAnnouncement(notice)}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        notice.priority === 'URGENT'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : notice.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {notice.priority}
                    </span>

                    {notice.isAutomated && (
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                        Automated Bot
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notice.timestamp}
                  </span>
                  <span className="text-amber-700 font-semibold group-hover:underline flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Departments & Academic Webstructure */}
        <section id="departments-section">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Institutional Hierarchy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
              Academic Departments & Research Centers
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Comprehensive webstructure across undergraduate, postgraduate, and doctoral centers at MITS Gwalior
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-6">
            {MITS_DEPARTMENTS.map(dept => (
              <button
                key={dept.code}
                onClick={() => setSelectedDeptCode(dept.code)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedDeptCode === dept.code
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{dept.code}</span>
                <span className="text-[10px] font-mono opacity-80">({dept.facultyCount} Faculty)</span>
              </button>
            ))}
          </div>

          {/* Active Department Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-100 text-amber-900 font-mono">
                      Department Code: {activeDept.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Established in {activeDept.establishedYear}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {activeDept.accreditedUntil}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
                    Department of {activeDept.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    {activeDept.description}
                  </p>
                </div>

                {/* Programs Offered */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Programs & Degrees Awarded
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDept.programsOffered.map(prog => (
                      <span
                        key={prog}
                        className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Departmental Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xl font-bold font-mono text-slate-900">{activeDept.totalStudents}</div>
                    <div className="text-[11px] text-slate-500">Total Enrolled Scholars</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xl font-bold font-mono text-slate-900">{activeDept.facultyCount}</div>
                    <div className="text-[11px] text-slate-500">Core Faculty Members</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xl font-bold font-mono text-slate-900">{activeDept.labsCount}</div>
                    <div className="text-[11px] text-slate-500">Specialized Research Labs</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xl font-bold font-mono text-emerald-700">{activeDept.averageAttendance}%</div>
                    <div className="text-[11px] text-slate-500">Current Semester Avg Attendance</div>
                  </div>
                </div>
              </div>

              {/* Department Head & Quick Access */}
              <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    Head of Department
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{activeDept.hodName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{activeDept.hodEmail}</p>
                  <p className="text-xs text-slate-600 mt-2 italic bg-white p-3 rounded-lg border border-slate-200">
                    "Our focus remains fostering outcome-based engineering education with hands-on lab experimentation and industry-sponsored capstone research."
                  </p>
                </div>

                <button
                  onClick={onGoToDashboard}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Department Class Rosters</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Director's Desk & Autonomous Governance */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl text-white p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DIRECTOR'S DESK
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                "Pioneering Engineering Rigor, Innovation, and Character Since 1957"
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                As one of Central India's oldest and most prestigious technological institutions, Madhav Institute of Technology & Science (MITS) Gwalior continues to set academic benchmarks. With our autonomous framework, cutting-edge AICTE IDEA Lab, flexible credit systems, and real-time biometric and attendance telemetry, we ensure that every student and faculty member thrives in a disciplined, world-class academic environment.
              </p>
              <div className="pt-2">
                <div className="font-bold text-base text-amber-300">Dr. R. K. Pandit</div>
                <div className="text-xs text-slate-400">Director, Madhav Institute of Technology & Science, Gwalior</div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
              <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
                Institutional Milestones
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>NAAC A++ Accreditation with 3.57 Institutional Score</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Full UGC & RGPV Autonomous Curriculum Freedom</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>AICTE IDEA Lab with 24x7 Prototyping Facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Integrated IMS with automated attendance & notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Institutional Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase font-serif">MITS Gwalior</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Madhav Institute of Technology & Science, established in 1957 by His Highness Sir Jiwaji Rao Scindia, Maharaja of Gwalior. A Grant-in-Aid Autonomous Institute affiliated to RGPV, Bhopal.
            </p>
            <div className="text-amber-400 text-[11px] font-semibold">
              Race Course Road, Gola Ka Mandir, Gwalior (M.P.) - 474005
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white uppercase mb-3">Academic Webstructure</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="#departments-section" className="hover:text-amber-300">Computer Science & Engg.</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">Information Technology</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">AI & Data Science</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">Electronics & Telecom</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">Electrical Engineering</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">Mechanical Engineering</a></li>
              <li><a href="#departments-section" className="hover:text-amber-300">Civil Engineering</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white uppercase mb-3">Governance & Compliance</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>Board of Governors (BoG)</li>
              <li>Academic Council</li>
              <li>Internal Quality Assurance Cell (IQAC)</li>
              <li>National Institutional Ranking Framework (NIRF)</li>
              <li>Right to Information (RTI Cell)</li>
              <li>Anti-Ragging Helpline: 1800-180-5522</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white uppercase mb-3">IMS Quick Access</h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Direct access for faculty attendance logging, student academic tracking, and real-time automated announcements.
            </p>
            <button
              onClick={onGoToDashboard}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs w-full transition-colors"
            >
              Open IMS Management Dashboard
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>&copy; {new Date().getFullYear()} Madhav Institute of Technology & Science, Gwalior. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <span>Autonomous Webstructure Portal</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
