export type UserRole = 'ADMIN' | 'FACULTY' | 'STUDENT';

export type DepartmentCode = 'CSE' | 'IT' | 'AIDS' | 'EC' | 'EE' | 'ME' | 'CE';

export type PriorityLevel = 'INFO' | 'WARNING' | 'HIGH' | 'URGENT';

export type NotificationCategory = 
  | 'ACADEMIC' 
  | 'EXAM' 
  | 'ATTENDANCE' 
  | 'PLACEMENT' 
  | 'ADMINISTRATIVE' 
  | 'EVENT';

export type AttendanceStatus = 'P' | 'A' | 'L' | 'E'; // Present, Absent, Late, Excused

export interface Student {
  id: string;
  enrollmentNo: string;
  name: string;
  email: string;
  phone: string;
  department: DepartmentCode;
  semester: number;
  section: string;
  batch: string;
  overallAttendance: number; // percentage e.g. 71.5
  subjectAttendance: {
    subjectCode: string;
    subjectName: string;
    attended: number;
    total: number;
  }[];
  cgpa: number;
  feeStatus: 'PAID' | 'DUE' | 'PARTIAL';
  hostelResident: boolean;
  avatarUrl?: string;
  consecutiveAbsents: number;
  lastCheckIn?: string;
}

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: DepartmentCode;
  email: string;
  phone: string;
  biometricStatus: 'PRESENT' | 'ABSENT' | 'ON_DUTY' | 'LEAVE';
  punchInTime?: string;
  weeklyTeachingHours: number;
  assignedSubjects: string[];
  cabinNumber: string;
  publicationsCount: number;
  experienceYears: number;
}

export interface AttendanceRecord {
  id: string;
  timestamp: string;
  date: string;
  slot: string;
  subjectCode: string;
  subjectName: string;
  department: DepartmentCode;
  semester: number;
  section: string;
  facultyId: string;
  facultyName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  mode: 'MANUAL_ROSTER' | 'QR_DYNAMIC' | 'BIOMETRIC_PUNCH';
  studentStatus: Record<string, AttendanceStatus>; // studentId -> status
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  priority: PriorityLevel;
  category: NotificationCategory;
  timestamp: string;
  targetAudience: 'ALL' | 'STUDENTS' | 'FACULTY' | 'STAFF' | 'DEPT_SPECIFIC';
  departmentScope?: DepartmentCode;
  channels: ('PORTAL' | 'EMAIL' | 'SMS' | 'APP_PUSH')[];
  isAutomated?: boolean;
  automatedTriggerType?: 'LOW_ATTENDANCE' | 'EXAM_CIRCULAR' | 'BIOMETRIC_ANOMALY' | 'FEE_ALERT';
  readBy: string[];
  pinned?: boolean;
  acknowledgedCount?: number;
}

export interface DepartmentStructure {
  code: DepartmentCode;
  name: string;
  establishedYear: number;
  hodName: string;
  hodEmail: string;
  totalStudents: number;
  facultyCount: number;
  averageAttendance: number;
  accreditedUntil: string;
  labsCount: number;
  description: string;
  programsOffered: string[];
}

export interface WebstructureNode {
  id: string;
  title: string;
  head: string;
  designation: string;
  type: 'GOVERNANCE' | 'ACADEMIC' | 'ADMINISTRATION' | 'STUDENT_SERVICES' | 'RESEARCH';
  children?: WebstructureNode[];
}
