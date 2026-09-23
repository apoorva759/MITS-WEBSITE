import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PublicWebsite } from './components/PublicWebsite/PublicWebsite';
import { DashboardLayout } from './components/Dashboard/DashboardLayout';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { 
  INITIAL_STUDENTS, 
  INITIAL_STAFF, 
  INITIAL_ATTENDANCE_RECORDS, 
  INITIAL_ANNOUNCEMENTS 
} from './data/initialData';
import { 
  Student, 
  StaffMember, 
  AttendanceRecord, 
  Announcement, 
  UserRole 
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'PUBLIC' | 'DASHBOARD'>('DASHBOARD');
  const [activeRole, setActiveRole] = useState<UserRole>('ADMIN');

  // Core application state with local storage persistence fallback
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('mits_ims_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('mits_ims_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('mits_ims_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_RECORDS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('mits_ims_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('mits_ims_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('mits_ims_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('mits_ims_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('mits_ims_announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Handler for saving a new attendance session
  const handleSaveAttendanceRecord = (newRecord: AttendanceRecord) => {
    setAttendanceRecords(prev => [newRecord, ...prev]);

    // Recalculate each impacted student's cumulative attendance
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        const sessionStatus = newRecord.studentStatus[student.id];
        if (!sessionStatus) return student;

        // Current simulated base: total 32 lectures
        const currentTotal = 32;
        const currentAttended = Math.round((student.overallAttendance / 100) * currentTotal);

        const newAttended = (sessionStatus === 'P' || sessionStatus === 'E') 
          ? currentAttended + 1 
          : currentAttended;
        const newTotal = currentTotal + 1;
        const newPercentage = Number(((newAttended / newTotal) * 100).toFixed(1));

        const isConsecutiveAbsent = sessionStatus === 'A' 
          ? student.consecutiveAbsents + 1 
          : 0;

        // Trigger automated warning if newly dropped below 75%
        if (student.overallAttendance >= 75 && newPercentage < 75) {
          triggerAutomatedShortageNotice(student, newPercentage);
        }

        return {
          ...student,
          overallAttendance: newPercentage,
          consecutiveAbsents: isConsecutiveAbsent,
          lastCheckIn: sessionStatus === 'P' ? 'Just now (Session Logged)' : student.lastCheckIn,
        };
      });
    });
  };

  // Automated notification generator for student shortage
  const triggerAutomatedShortageNotice = (student: Student, currentPct?: number) => {
    const pct = currentPct ?? student.overallAttendance;
    const newNotice: Announcement = {
      id: `ann-shortage-${student.id}-${Date.now()}`,
      title: `Automated Shortage Notice: ${student.name} (${student.enrollmentNo}) below 75% Criteria`,
      content: `Official warning issued to ${student.name}, enrolled in B.Tech ${student.department} (Semester ${student.semester}). Cumulative attendance has dropped to ${pct}%. Parental SMS & Email communications have been auto-dispatched to ${student.phone}. Minimum 75% required for autonomous exam hall ticket clearance.`,
      author: 'IMS Autonomous Attendance Sentinel',
      authorRole: 'System Bot',
      priority: 'URGENT',
      category: 'ATTENDANCE',
      timestamp: 'Just now',
      targetAudience: 'ALL',
      departmentScope: student.department,
      channels: ['PORTAL', 'EMAIL', 'SMS', 'APP_PUSH'],
      isAutomated: true,
      automatedTriggerType: 'LOW_ATTENDANCE',
      readBy: [],
      pinned: true,
      acknowledgedCount: 0
    };

    setAnnouncements(prev => [newNotice, ...prev]);
  };

  const handleAddAnnouncement = (newAnnouncement: Announcement) => {
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const handleAcknowledge = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, acknowledgedCount: (a.acknowledgedCount || 0) + 1 }
          : a
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Global Institution Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        announcements={announcements}
        onOpenNotifications={() => {
          setCurrentView('DASHBOARD');
        }}
        onSelectAnnouncement={setSelectedAnnouncement}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {currentView === 'PUBLIC' ? (
          <PublicWebsite
            onGoToDashboard={() => setCurrentView('DASHBOARD')}
            announcements={announcements}
            onSelectAnnouncement={setSelectedAnnouncement}
          />
        ) : (
          <DashboardLayout
            activeRole={activeRole}
            students={students}
            staff={staff}
            attendanceRecords={attendanceRecords}
            announcements={announcements}
            onSaveAttendanceRecord={handleSaveAttendanceRecord}
            onAddAnnouncement={handleAddAnnouncement}
            onTriggerAutomatedShortageAlert={triggerAutomatedShortageNotice}
          />
        )}
      </main>

      {/* Announcement Detail Modal */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        onAcknowledge={handleAcknowledge}
      />
    </div>
  );
}
