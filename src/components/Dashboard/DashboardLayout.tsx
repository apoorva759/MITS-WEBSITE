import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckSquare, 
  Radio, 
  Layers, 
  UserCheck, 
  Sparkles, 
  Building2,
  Calendar,
  Zap
} from 'lucide-react';
import { 
  Student, 
  StaffMember, 
  AttendanceRecord, 
  Announcement, 
  UserRole, 
  DepartmentCode 
} from '../../types';
import { RealTimeAnalytics } from './RealTimeAnalytics';
import { AttendanceTracker } from './AttendanceTracker';
import { NotificationCenter } from './NotificationCenter';
import { WebstructureOverview } from './WebstructureOverview';
import { RolePortalView } from './RolePortalView';

interface DashboardLayoutProps {
  activeRole: UserRole;
  students: Student[];
  staff: StaffMember[];
  attendanceRecords: AttendanceRecord[];
  announcements: Announcement[];
  onSaveAttendanceRecord: (record: AttendanceRecord) => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  onTriggerAutomatedShortageAlert: (student: Student) => void;
  initialTab?: 'ANALYTICS' | 'ATTENDANCE' | 'NOTIFICATIONS' | 'WEBSTRUCTURE' | 'ROLE_VIEW';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeRole,
  students,
  staff,
  attendanceRecords,
  announcements,
  onSaveAttendanceRecord,
  onAddAnnouncement,
  onTriggerAutomatedShortageAlert,
  initialTab = 'ANALYTICS',
}) => {
  const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'ATTENDANCE' | 'NOTIFICATIONS' | 'WEBSTRUCTURE' | 'ROLE_VIEW'>(initialTab);

  const shortageCount = students.filter(s => s.overallAttendance < 75).length;
  const automatedNotifCount = announcements.filter(a => a.isAutomated).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top IMS Navigation Bar */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            id="tab-analytics-btn"
            onClick={() => setActiveTab('ANALYTICS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'ANALYTICS'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Real-Time Analytics</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>

          <button
            id="tab-attendance-btn"
            onClick={() => setActiveTab('ATTENDANCE')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'ATTENDANCE'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>Attendance Tracking</span>
            {shortageCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full font-mono text-[10px] font-bold">
                {shortageCount} Shortage
              </span>
            )}
          </button>

          <button
            id="tab-notifications-btn"
            onClick={() => setActiveTab('NOTIFICATIONS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'NOTIFICATIONS'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Automated Notifications</span>
            <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full font-mono text-[10px] font-bold">
              {automatedNotifCount} Auto
            </span>
          </button>

          <button
            id="tab-webstructure-btn"
            onClick={() => setActiveTab('WEBSTRUCTURE')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'WEBSTRUCTURE'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Institute Webstructure</span>
          </button>

          <button
            id="tab-role-view-btn"
            onClick={() => setActiveTab('ROLE_VIEW')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'ROLE_VIEW'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>
              {activeRole === 'STUDENT' ? 'Student Workspace' : activeRole === 'FACULTY' ? 'Faculty Desk' : 'Director Cockpit'}
            </span>
          </button>
        </div>
      </div>

      {/* Content Rendering based on Tab */}
      <div>
        {activeTab === 'ANALYTICS' && (
          <RealTimeAnalytics
            students={students}
            staff={staff}
            attendanceRecords={attendanceRecords}
          />
        )}

        {activeTab === 'ATTENDANCE' && (
          <AttendanceTracker
            students={students}
            staff={staff}
            attendanceRecords={attendanceRecords}
            onSaveAttendanceRecord={onSaveAttendanceRecord}
            onTriggerAutomatedShortageAlert={onTriggerAutomatedShortageAlert}
          />
        )}

        {activeTab === 'NOTIFICATIONS' && (
          <NotificationCenter
            announcements={announcements}
            students={students}
            onAddAnnouncement={onAddAnnouncement}
          />
        )}

        {activeTab === 'WEBSTRUCTURE' && (
          <WebstructureOverview
            staffList={staff}
            studentList={students}
            onSelectDepartment={() => setActiveTab('ATTENDANCE')}
          />
        )}

        {activeTab === 'ROLE_VIEW' && (
          <RolePortalView
            activeRole={activeRole}
            students={students}
            staff={staff}
            onOpenAttendanceMarker={() => setActiveTab('ATTENDANCE')}
            onOpenQrProjector={() => setActiveTab('ATTENDANCE')}
          />
        )}
      </div>
    </div>
  );
};
