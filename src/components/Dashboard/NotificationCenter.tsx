import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  Radio, 
  Clock, 
  Plus, 
  Eye, 
  Check, 
  Bot,
  Zap,
  Filter,
  FileText
} from 'lucide-react';
import { Announcement, PriorityLevel, NotificationCategory, DepartmentCode, Student } from '../../types';
import { MITS_DEPARTMENTS } from '../../data/initialData';

interface NotificationCenterProps {
  announcements: Announcement[];
  students: Student[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onSelectAnnouncement?: (announcement: Announcement) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  announcements,
  students,
  onAddAnnouncement,
  onSelectAnnouncement,
}) => {
  const [activeTab, setActiveTab] = useState<'FEED' | 'COMPOSE' | 'AUTOMATED_TRIGGERS'>('FEED');

  // Compose Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('INFO');
  const [category, setCategory] = useState<NotificationCategory>('ACADEMIC');
  const [targetAudience, setTargetAudience] = useState<'ALL' | 'STUDENTS' | 'FACULTY' | 'STAFF' | 'DEPT_SPECIFIC'>('ALL');
  const [departmentScope, setDepartmentScope] = useState<DepartmentCode>('CSE');
  const [channels, setChannels] = useState<('PORTAL' | 'EMAIL' | 'SMS' | 'APP_PUSH')[]>(['PORTAL', 'EMAIL']);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Filter State
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [previewItem, setPreviewItem] = useState<Announcement | null>(null);

  // Automated audit trigger simulation
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditFeedback, setAuditFeedback] = useState<string | null>(null);

  const toggleChannel = (ch: 'PORTAL' | 'EMAIL' | 'SMS' | 'APP_PUSH') => {
    setChannels(prev => 
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      author: 'Office of Dean Academics',
      authorRole: 'Administrative Directorate',
      priority,
      category,
      timestamp: 'Just now',
      targetAudience,
      departmentScope: targetAudience === 'DEPT_SPECIFIC' ? departmentScope : undefined,
      channels,
      isAutomated: false,
      readBy: [],
      acknowledgedCount: 0,
      pinned: priority === 'URGENT' || priority === 'HIGH'
    };

    onAddAnnouncement(newNotice);
    setTitle('');
    setContent('');
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setActiveTab('FEED');
    }, 1500);
  };

  const runAutomatedAudit = () => {
    setAuditRunning(true);
    setAuditFeedback('Scanning student attendance records against 75% autonomous threshold...');

    setTimeout(() => {
      const shortageStudents = students.filter(s => s.overallAttendance < 75);
      const newAutoNotice: Announcement = {
        id: `ann-auto-${Date.now()}`,
        title: `Automated Audit Alert: ${shortageStudents.length} Students Flagged Below 75% Attendance Threshold`,
        content: `IMS Autonomous Telemetry Bot executed routine audit. ${shortageStudents.length} candidates (${shortageStudents.map(s => s.enrollmentNo).slice(0, 3).join(', ')}...) have been issued automatic caution SMS and email alerts. Parents have been notified.`,
        author: 'IMS Autonomous Audit Engine',
        authorRole: 'System Bot',
        priority: 'URGENT',
        category: 'ATTENDANCE',
        timestamp: 'Just now',
        targetAudience: 'ALL',
        channels: ['PORTAL', 'EMAIL', 'SMS'],
        isAutomated: true,
        automatedTriggerType: 'LOW_ATTENDANCE',
        readBy: [],
        pinned: true,
        acknowledgedCount: 0
      };

      onAddAnnouncement(newAutoNotice);
      setAuditRunning(false);
      setAuditFeedback(`Audit Complete! Generated 1 automated urgent circular and dispatched ${shortageStudents.length} SMS/Email alerts.`);
      setTimeout(() => setAuditFeedback(null), 5000);
    }, 1500);
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchCat = filterCategory === 'ALL' || a.category === filterCategory;
    const matchPri = filterPriority === 'ALL' || a.priority === filterPriority;
    return matchCat && matchPri;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar with Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
            <Radio className="w-5 h-5 text-amber-600" />
            Automated Notification & Announcement Engine
          </h2>
          <p className="text-xs text-slate-500">
            Omni-channel broadcast center with automated triggers for attendance shortage, examination schedules & placement drives
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('FEED')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'FEED' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Announcements ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('COMPOSE')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'COMPOSE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Broadcast New</span>
          </button>
          <button
            onClick={() => setActiveTab('AUTOMATED_TRIGGERS')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'AUTOMATED_TRIGGERS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Automated Triggers</span>
          </button>
        </div>
      </div>

      {/* Audit Feedback Banner */}
      {auditFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{auditFeedback}</span>
        </div>
      )}

      {/* TAB 1: LIVE NOTICES FEED */}
      {activeTab === 'FEED' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">Category:</span>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800"
              >
                <option value="ALL">All Categories</option>
                <option value="ATTENDANCE">Attendance Alarms</option>
                <option value="EXAM">Examination</option>
                <option value="PLACEMENT">Placements</option>
                <option value="ADMINISTRATIVE">Administrative</option>
                <option value="EVENT">Events & Hackathons</option>
              </select>

              <span className="text-slate-500 font-semibold ml-2">Priority:</span>
              <select
                value={filterPriority}
                onChange={e => setFilterPriority(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800"
              >
                <option value="ALL">All Priorities</option>
                <option value="URGENT">Urgent Only</option>
                <option value="HIGH">High Priority</option>
                <option value="INFO">Info</option>
              </select>
            </div>

            <button
              onClick={runAutomatedAudit}
              disabled={auditRunning}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Zap className={`w-3.5 h-3.5 ${auditRunning ? 'animate-spin' : ''}`} />
              <span>{auditRunning ? 'Running Audit...' : 'Run Automated Shortage Audit Now'}</span>
            </button>
          </div>

          {/* Notices List */}
          <div className="space-y-3">
            {filteredAnnouncements.map(item => (
              <div
                key={item.id}
                className={`bg-white rounded-xl border p-5 transition-all hover:shadow-sm ${
                  item.priority === 'URGENT'
                    ? 'border-rose-300 bg-rose-50/20'
                    : item.priority === 'HIGH'
                    ? 'border-amber-300'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          item.priority === 'URGENT'
                            ? 'bg-rose-600 text-white'
                            : item.priority === 'HIGH'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.priority}
                      </span>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-mono">
                        {item.category}
                      </span>

                      {item.isAutomated && (
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <Bot className="w-3 h-3 text-emerald-600" />
                          Automated Trigger
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400">&bull; {item.timestamp}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  {/* Channels preview badges */}
                  <div className="flex items-center gap-1.5 self-start">
                    {item.channels.map(ch => (
                      <span
                        key={ch}
                        className="p-1 rounded bg-slate-100 text-slate-600 text-[10px] font-mono font-bold"
                        title={`Dispatched via ${ch}`}
                      >
                        {ch === 'PORTAL' && 'Web'}
                        {ch === 'EMAIL' && 'Email'}
                        {ch === 'SMS' && 'SMS'}
                        {ch === 'APP_PUSH' && 'Push'}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-normal">
                  {item.content}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <div>
                    Author: <strong className="text-slate-800">{item.author}</strong> ({item.authorRole}) &bull; Target: {item.targetAudience}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Preview SMS/Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMPOSE NEW ANNOUNCEMENT */}
      {activeTab === 'COMPOSE' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-900 font-serif">
              Broadcast Institutional Announcement
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft and push automated notifications across web portal, SMS gateway, parent emails, and mobile app
            </p>
          </div>

          {broadcastSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Announcement successfully published and dispatched to specified channels!</span>
            </div>
          )}

          <form onSubmit={handleComposeSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Announcement Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. End-Semester Lab Exam Schedule Published..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as PriorityLevel)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                >
                  <option value="INFO">Info (Normal)</option>
                  <option value="HIGH">High Priority</option>
                  <option value="URGENT">Urgent Alert (Red Flash)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as NotificationCategory)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                >
                  <option value="ACADEMIC">Academic</option>
                  <option value="EXAM">Examination</option>
                  <option value="ATTENDANCE">Attendance Shortage</option>
                  <option value="PLACEMENT">Placements</option>
                  <option value="ADMINISTRATIVE">Administrative</option>
                  <option value="EVENT">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Target Audience</label>
                <select
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                >
                  <option value="ALL">Entire Institute (All)</option>
                  <option value="STUDENTS">Students Only</option>
                  <option value="FACULTY">Faculty & Staff Only</option>
                  <option value="DEPT_SPECIFIC">Department Specific</option>
                </select>
              </div>
            </div>

            {targetAudience === 'DEPT_SPECIFIC' && (
              <div>
                <label className="block text-slate-600 font-bold mb-1">Select Department</label>
                <select
                  value={departmentScope}
                  onChange={e => setDepartmentScope(e.target.value as DepartmentCode)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                >
                  {MITS_DEPARTMENTS.map(d => (
                    <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-slate-600 font-bold mb-1">Detailed Content *</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write official message, instructions, and required student actions..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            {/* Delivery Channels Selector */}
            <div>
              <label className="block text-slate-600 font-bold mb-2">Multi-Channel Delivery Options</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'PORTAL', label: 'Web Portal Banner', icon: Bell },
                  { key: 'EMAIL', label: 'Official Webmail', icon: Mail },
                  { key: 'SMS', label: 'SMS Gateway (Parent)', icon: MessageSquare },
                  { key: 'APP_PUSH', label: 'MITS Mobile App Push', icon: Smartphone },
                ].map(item => {
                  const isChecked = channels.includes(item.key as any);
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => toggleChannel(item.key as any)}
                      className={`p-3 rounded-xl border font-semibold flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                        isChecked
                          ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isChecked ? 'text-amber-600' : 'text-slate-400'}`} />
                      <span className="text-[11px]">{item.label}</span>
                      {isChecked && <span className="text-[9px] text-amber-700 font-mono font-bold">ACTIVE</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('FEED')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>Broadcast Announcement Now</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: AUTOMATED TRIGGERS SETUP */}
      {activeTab === 'AUTOMATED_TRIGGERS' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-600" />
                  MITS Autonomous IMS Rule & Trigger Automations
                </h3>
                <p className="text-xs text-slate-500">
                  Background listener bots that continuously evaluate student and staff telemetry
                </p>
              </div>
              <button
                onClick={runAutomatedAudit}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Execute Trigger Audit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Rule 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Attendance Shortage Sentinel (&lt;75%)
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Triggers an automatic parental SMS & Student Webmail alert whenever cumulative attendance drops below 75.0% or 3 consecutive absences are recorded.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Dispatched: 14 alerts this semester &bull; Auto-Retry on failure
                </div>
              </div>

              {/* Rule 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Examination Hall Ticket Debarment Lock
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Automatically holds admit card generation 7 days prior to autonomous exams if attendance remains below 65.0% without approved medical certificate.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Controlled by Controller of Examinations (CoE) Cell
                </div>
              </div>

              {/* Rule 3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Placement Eligibility Filter & Push
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pushes urgent recruitment notifications exclusively to final & pre-final year students matching GPA &gt;= 7.5 with 0 backlogs.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Connected to Training & Placement Cell DB
                </div>
              </div>

              {/* Rule 4 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Faculty Biometric Punctuality Alarm
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Notifies respective Department HoD if scheduled morning slot lectures are unpunched at RFID bio-terminal past 09:20 AM.
                </p>
                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  Linked to RGPV Biometric Terminal Gateway
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW SMS & EMAIL */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-600" />
                Omni-Channel Automated Broadcast Preview
              </h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Mobile SMS Simulation */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Parent & Student SMS Gateway View:
              </span>
              <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-xs space-y-2 border border-slate-700 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                  <span>Sender: VM-MITSGW</span>
                  <span>{previewItem.timestamp}</span>
                </div>
                <p className="text-amber-200 leading-relaxed">
                  MITS GWALIOR ALERT: {previewItem.title} - {previewItem.content.slice(0, 140)}... Pls check IMS Portal: mitsgwalior.in/ims
                </p>
              </div>
            </div>

            {/* Institutional Email Simulation */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Institutional Webmail View:
              </span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="text-slate-500 border-b border-slate-200 pb-2 space-y-0.5 text-[11px]">
                  <div><strong>From:</strong> {previewItem.author} &lt;noreply-ims@mitsgwalior.in&gt;</div>
                  <div><strong>To:</strong> All Enrolled Scholars & Mentors</div>
                  <div><strong>Subject:</strong> [{previewItem.priority}] {previewItem.title}</div>
                </div>
                <p className="text-slate-700 leading-relaxed pt-1">
                  {previewItem.content}
                </p>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
