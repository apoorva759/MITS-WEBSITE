import { Student, StaffMember, AttendanceRecord, Announcement, DepartmentStructure, WebstructureNode, PriorityLevel } from '../types';

export const MITS_DEPARTMENTS: DepartmentStructure[] = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    establishedYear: 1994,
    hodName: 'Dr. Manish Dixit',
    hodEmail: 'hod_cse@mitsgwalior.in',
    totalStudents: 540,
    facultyCount: 32,
    averageAttendance: 84.6,
    accreditedUntil: '2028 (NBA Tier-I)',
    labsCount: 9,
    description: 'Premier department equipped with NVIDIA Supercomputing Lab, AICTE IDEA Lab, and Advanced Cloud Virtualization Cluster.',
    programsOffered: ['B.Tech CSE', 'M.Tech Cyber Security', 'M.Tech AI & Data Engineering', 'Ph.D in Computing']
  },
  {
    code: 'IT',
    name: 'Information Technology',
    establishedYear: 2000,
    hodName: 'Dr. Sanjeev Khanna',
    hodEmail: 'hod_it@mitsgwalior.in',
    totalStudents: 360,
    facultyCount: 22,
    averageAttendance: 81.2,
    accreditedUntil: '2027 (NBA)',
    labsCount: 7,
    description: 'Center of excellence in Full-Stack Web Architecture, Distributed Ledger, and Mobile Computing systems.',
    programsOffered: ['B.Tech Information Technology', 'M.Tech Software Systems', 'Ph.D in Information Sciences']
  },
  {
    code: 'AIDS',
    name: 'Artificial Intelligence & Data Science',
    establishedYear: 2021,
    hodName: 'Dr. Rajeev Kumar',
    hodEmail: 'hod_aids@mitsgwalior.in',
    totalStudents: 240,
    facultyCount: 16,
    averageAttendance: 87.5,
    accreditedUntil: '2029 (Autonomous)',
    labsCount: 5,
    description: 'Focuses on Deep Learning, Large Language Modeling, Computer Vision, and Autonomous Robotics frameworks.',
    programsOffered: ['B.Tech AI & Data Science', 'Minor in Generative AI']
  },
  {
    code: 'EC',
    name: 'Electronics & Telecommunication',
    establishedYear: 1986,
    hodName: 'Dr. Laxmi Shrivastava',
    hodEmail: 'hod_et@mitsgwalior.in',
    totalStudents: 420,
    facultyCount: 26,
    averageAttendance: 79.4,
    accreditedUntil: '2027 (NBA)',
    labsCount: 8,
    description: 'Specialized in VLSI Design, Embedded IoT, RF Microwave communication and Antenna Arrays.',
    programsOffered: ['B.Tech Electronics & Telecom', 'M.Tech VLSI & Embedded Systems', 'Ph.D in Microwave Engineering']
  },
  {
    code: 'EE',
    name: 'Electrical Engineering',
    establishedYear: 1957,
    hodName: 'Dr. Sulochana Wadhwani',
    hodEmail: 'hod_ee@mitsgwalior.in',
    totalStudents: 380,
    facultyCount: 24,
    averageAttendance: 83.1,
    accreditedUntil: '2028 (NBA Tier-I)',
    labsCount: 8,
    description: 'Foundation department of MITS with Smart Grid Simulator, Electric Vehicle Powertrain testing bed, and Renewable Solar Array.',
    programsOffered: ['B.Tech Electrical Engineering', 'M.Tech Power Electronics', 'Ph.D in Power Systems']
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    establishedYear: 1957,
    hodName: 'Dr. M.K. Gaur',
    hodEmail: 'hod_me@mitsgwalior.in',
    totalStudents: 400,
    facultyCount: 25,
    averageAttendance: 76.8,
    accreditedUntil: '2027 (NBA)',
    labsCount: 10,
    description: 'Houses CNC precision machining centre, Siemens Automation lab, 3D additive manufacturing and CFD simulators.',
    programsOffered: ['B.Tech Mechanical Engineering', 'M.Tech Thermal Engineering', 'M.Tech CAD/CAM']
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    establishedYear: 1957,
    hodName: 'Dr. R. Kansal',
    hodEmail: 'hod_ce@mitsgwalior.in',
    totalStudents: 340,
    facultyCount: 20,
    averageAttendance: 80.5,
    accreditedUntil: '2028 (NBA)',
    labsCount: 7,
    description: 'Pioneers in Structural Dynamics, Earthquake Engineering, Remote Sensing GIS, and Geotechnical stabilization.',
    programsOffered: ['B.Tech Civil Engineering', 'M.Tech Structural Engineering', 'M.Tech Environmental Engineering']
  }
];

export const MITS_WEBSTRUCTURE_HIERARCHY: WebstructureNode = {
  id: 'bog',
  title: 'Board of Governors (Scindia Dynasty Trust & Govt. of MP)',
  head: 'Shrimant Jyotiraditya M. Scindia',
  designation: 'Chairman, Board of Governors',
  type: 'GOVERNANCE',
  children: [
    {
      id: 'director',
      title: 'Office of the Director',
      head: 'Dr. R. K. Pandit',
      designation: 'Director, MITS Gwalior',
      type: 'GOVERNANCE',
      children: [
        {
          id: 'dean-academics',
          title: 'Dean Academics & Autonomous Curriculum Cell',
          head: 'Dr. Pratesh Jayaswal',
          designation: 'Dean (Academics)',
          type: 'ACADEMIC',
          children: [
            {
              id: 'board-studies',
              title: 'Board of Studies (All 7 Engg. Branches)',
              head: 'Department HoDs Council',
              designation: 'Chairpersons',
              type: 'ACADEMIC'
            },
            {
              id: 'coe-cell',
              title: 'Controller of Examinations (Autonomous Cell)',
              head: 'Dr. P.K. Singhal',
              designation: 'Controller of Examinations',
              type: 'ACADEMIC'
            }
          ]
        },
        {
          id: 'dean-admin',
          title: 'Dean Administration & Campus Infrastructure',
          head: 'Dr. Manjaree Pandit',
          designation: 'Dean (Administration)',
          type: 'ADMINISTRATION',
          children: [
            {
              id: 'registrar',
              title: 'Registrar Office & Human Resources',
              head: 'Col. (Retd.) Arun Kumar',
              designation: 'Registrar',
              type: 'ADMINISTRATION'
            },
            {
              id: 'finance-office',
              title: 'Finance & Accounts Directorate',
              head: 'Shri V.K. Shrivastava',
              designation: 'Chief Accounts Officer',
              type: 'ADMINISTRATION'
            }
          ]
        },
        {
          id: 'dean-students',
          title: 'Dean Student Welfare & Campus Life',
          head: 'Dr. C.S. Malvi',
          designation: 'Dean (Student Welfare)',
          type: 'STUDENT_SERVICES',
          children: [
            {
              id: 'tnp-cell',
              title: 'Training & Placement Cell (Career Development)',
              head: 'Dr. Vikram Rajpoot',
              designation: 'Head, T&P Cell',
              type: 'STUDENT_SERVICES'
            },
            {
              id: 'hostel-administration',
              title: 'Chief Proctor & Chief Warden Council',
              head: 'Dr. Akhilesh Tiwari',
              designation: 'Chief Proctor',
              type: 'STUDENT_SERVICES'
            }
          ]
        },
        {
          id: 'dean-research',
          title: 'Dean Research & Consultancy (R&C)',
          head: 'Dr. D.K. Jain',
          designation: 'Dean (R&D)',
          type: 'RESEARCH',
          children: [
            {
              id: 'idea-lab',
              title: 'AICTE IDEA Lab & IPR Incubation Center',
              head: 'Dr. Hemant Shrivastava',
              designation: 'Coordinator, IDEA Lab',
              type: 'RESEARCH'
            }
          ]
        }
      ]
    }
  ]
};

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-001',
    employeeId: 'MITS-FAC-104',
    name: 'Dr. Manish Dixit',
    designation: 'Professor & HoD',
    department: 'CSE',
    email: 'm_dixit@mitsgwalior.in',
    phone: '+91 94251 12903',
    biometricStatus: 'PRESENT',
    punchInTime: '08:47 AM',
    weeklyTeachingHours: 14,
    assignedSubjects: ['CS-501 Compiler Design', 'CS-702 Distributed Systems'],
    cabinNumber: 'CSE Block Room 204',
    publicationsCount: 48,
    experienceYears: 24
  },
  {
    id: 'stf-002',
    employeeId: 'MITS-FAC-119',
    name: 'Dr. R.S. Jadon',
    designation: 'Professor',
    department: 'CSE',
    email: 'rs_jadon@mitsgwalior.in',
    phone: '+91 94253 44021',
    biometricStatus: 'PRESENT',
    punchInTime: '08:52 AM',
    weeklyTeachingHours: 16,
    assignedSubjects: ['CS-301 Data Structures & Algorithms', 'CS-403 Database Systems'],
    cabinNumber: 'CSE Block Room 208',
    publicationsCount: 62,
    experienceYears: 28
  },
  {
    id: 'stf-003',
    employeeId: 'MITS-FAC-205',
    name: 'Prof. Neha Bharadwaj',
    designation: 'Associate Professor',
    department: 'CSE',
    email: 'neha_b@mitsgwalior.in',
    phone: '+91 98260 77123',
    biometricStatus: 'PRESENT',
    punchInTime: '09:04 AM',
    weeklyTeachingHours: 18,
    assignedSubjects: ['CS-502 Operating Systems', 'CS-305 Discrete Mathematics'],
    cabinNumber: 'CSE Lab 4 Cabin',
    publicationsCount: 19,
    experienceYears: 12
  },
  {
    id: 'stf-004',
    employeeId: 'MITS-FAC-310',
    name: 'Dr. Sanjeev Khanna',
    designation: 'Professor & HoD',
    department: 'IT',
    email: 's_khanna@mitsgwalior.in',
    phone: '+91 94257 88201',
    biometricStatus: 'PRESENT',
    punchInTime: '08:58 AM',
    weeklyTeachingHours: 14,
    assignedSubjects: ['IT-601 Cloud Architecture', 'IT-402 Computer Networks'],
    cabinNumber: 'IT Block Room 102',
    publicationsCount: 38,
    experienceYears: 21
  },
  {
    id: 'stf-005',
    employeeId: 'MITS-FAC-322',
    name: 'Prof. Ankit Sharma',
    designation: 'Assistant Professor',
    department: 'IT',
    email: 'asharma@mitsgwalior.in',
    phone: '+91 91114 55672',
    biometricStatus: 'ON_DUTY',
    punchInTime: '08:40 AM',
    weeklyTeachingHours: 20,
    assignedSubjects: ['IT-304 Web Technology & Services', 'IT-503 Software Engg'],
    cabinNumber: 'IT Lab 2 Cabin',
    publicationsCount: 11,
    experienceYears: 8
  },
  {
    id: 'stf-006',
    employeeId: 'MITS-FAC-401',
    name: 'Dr. Rajeev Kumar',
    designation: 'Professor & HoD',
    department: 'AIDS',
    email: 'r_kumar@mitsgwalior.in',
    phone: '+91 94250 99312',
    biometricStatus: 'PRESENT',
    punchInTime: '08:35 AM',
    weeklyTeachingHours: 14,
    assignedSubjects: ['AI-501 Neural Networks & Deep Learning', 'DS-301 Probability for AI'],
    cabinNumber: 'IDEA Lab Admin Office',
    publicationsCount: 42,
    experienceYears: 19
  },
  {
    id: 'stf-007',
    employeeId: 'MITS-FAC-508',
    name: 'Dr. Laxmi Shrivastava',
    designation: 'Professor & HoD',
    department: 'EC',
    email: 'l_shrivastava@mitsgwalior.in',
    phone: '+91 98270 12044',
    biometricStatus: 'PRESENT',
    punchInTime: '08:55 AM',
    weeklyTeachingHours: 15,
    assignedSubjects: ['EC-401 Signals & Systems', 'EC-602 VLSI Fabrication'],
    cabinNumber: 'EC Block Room 301',
    publicationsCount: 54,
    experienceYears: 25
  },
  {
    id: 'stf-008',
    employeeId: 'MITS-FAC-615',
    name: 'Dr. Sulochana Wadhwani',
    designation: 'Professor & HoD',
    department: 'EE',
    email: 's_wadhwani@mitsgwalior.in',
    phone: '+91 94252 66089',
    biometricStatus: 'PRESENT',
    punchInTime: '08:50 AM',
    weeklyTeachingHours: 15,
    assignedSubjects: ['EE-501 Power Electronics & Drives', 'EE-302 Electrical Machines'],
    cabinNumber: 'EE Main Block 105',
    publicationsCount: 58,
    experienceYears: 26
  },
  {
    id: 'stf-009',
    employeeId: 'MITS-FAC-703',
    name: 'Dr. M.K. Gaur',
    designation: 'Professor & HoD',
    department: 'ME',
    email: 'mk_gaur@mitsgwalior.in',
    phone: '+91 94251 33451',
    biometricStatus: 'LEAVE',
    punchInTime: undefined,
    weeklyTeachingHours: 14,
    assignedSubjects: ['ME-601 Heat & Mass Transfer'],
    cabinNumber: 'Siemens CoE Cabin',
    publicationsCount: 51,
    experienceYears: 27
  },
  {
    id: 'stf-010',
    employeeId: 'MITS-FAC-812',
    name: 'Dr. R. Kansal',
    designation: 'Professor & HoD',
    department: 'CE',
    email: 'r_kansal@mitsgwalior.in',
    phone: '+91 94253 77890',
    biometricStatus: 'PRESENT',
    punchInTime: '09:12 AM',
    weeklyTeachingHours: 14,
    assignedSubjects: ['CE-401 Theory of Structures', 'CE-603 Soil Mechanics'],
    cabinNumber: 'Civil Block Room 101',
    publicationsCount: 39,
    experienceYears: 23
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-001',
    enrollmentNo: '0901CS221001',
    name: 'Aaditya Sharma',
    email: 'aaditya.0901cs22@mitsgwalior.in',
    phone: '+91 98261 44102',
    department: 'CSE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 89.4,
    subjectAttendance: [
      { subjectCode: 'CS-501', subjectName: 'Compiler Design', attended: 28, total: 30 },
      { subjectCode: 'CS-502', subjectName: 'Operating Systems', attended: 29, total: 32 },
      { subjectCode: 'CS-503', subjectName: 'Computer Networks', attended: 26, total: 30 },
      { subjectCode: 'CS-504', subjectName: 'Design & Analysis of Algorithms', attended: 27, total: 30 }
    ],
    cgpa: 8.92,
    feeStatus: 'PAID',
    hostelResident: true,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 08:50 AM'
  },
  {
    id: 'std-002',
    enrollmentNo: '0901CS221014',
    name: 'Pooja Verma',
    email: 'pooja.0901cs22@mitsgwalior.in',
    phone: '+91 97521 88319',
    department: 'CSE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 94.2,
    subjectAttendance: [
      { subjectCode: 'CS-501', subjectName: 'Compiler Design', attended: 29, total: 30 },
      { subjectCode: 'CS-502', subjectName: 'Operating Systems', attended: 31, total: 32 },
      { subjectCode: 'CS-503', subjectName: 'Computer Networks', attended: 28, total: 30 },
      { subjectCode: 'CS-504', subjectName: 'Design & Analysis of Algorithms', attended: 29, total: 30 }
    ],
    cgpa: 9.41,
    feeStatus: 'PAID',
    hostelResident: false,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 08:44 AM'
  },
  {
    id: 'std-003',
    enrollmentNo: '0901CS221045',
    name: 'Rohan Rathore',
    email: 'rohan.0901cs22@mitsgwalior.in',
    phone: '+91 94254 99112',
    department: 'CSE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 68.3, // LOW ATTENDANCE ALERT!
    subjectAttendance: [
      { subjectCode: 'CS-501', subjectName: 'Compiler Design', attended: 20, total: 30 },
      { subjectCode: 'CS-502', subjectName: 'Operating Systems', attended: 21, total: 32 },
      { subjectCode: 'CS-503', subjectName: 'Computer Networks', attended: 21, total: 30 },
      { subjectCode: 'CS-504', subjectName: 'Design & Analysis of Algorithms', attended: 21, total: 30 }
    ],
    cgpa: 6.84,
    feeStatus: 'PAID',
    hostelResident: true,
    consecutiveAbsents: 3,
    lastCheckIn: '3 days ago'
  },
  {
    id: 'std-004',
    enrollmentNo: '0901CS221088',
    name: 'Suhani Soni',
    email: 'suhani.0901cs22@mitsgwalior.in',
    phone: '+91 91118 76543',
    department: 'CSE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 71.9, // LOW ATTENDANCE ALERT!
    subjectAttendance: [
      { subjectCode: 'CS-501', subjectName: 'Compiler Design', attended: 21, total: 30 },
      { subjectCode: 'CS-502', subjectName: 'Operating Systems', attended: 23, total: 32 },
      { subjectCode: 'CS-503', subjectName: 'Computer Networks', attended: 22, total: 30 },
      { subjectCode: 'CS-504', subjectName: 'Design & Analysis of Algorithms', attended: 22, total: 30 }
    ],
    cgpa: 7.15,
    feeStatus: 'PARTIAL',
    hostelResident: false,
    consecutiveAbsents: 2,
    lastCheckIn: 'Yesterday 09:15 AM'
  },
  {
    id: 'std-005',
    enrollmentNo: '0901CS221092',
    name: 'Vikas Kushwaha',
    email: 'vikas.0901cs22@mitsgwalior.in',
    phone: '+91 93001 22910',
    department: 'CSE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 82.5,
    subjectAttendance: [
      { subjectCode: 'CS-501', subjectName: 'Compiler Design', attended: 25, total: 30 },
      { subjectCode: 'CS-502', subjectName: 'Operating Systems', attended: 26, total: 32 },
      { subjectCode: 'CS-503', subjectName: 'Computer Networks', attended: 25, total: 30 },
      { subjectCode: 'CS-504', subjectName: 'Design & Analysis of Algorithms', attended: 25, total: 30 }
    ],
    cgpa: 7.90,
    feeStatus: 'PAID',
    hostelResident: true,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 08:58 AM'
  },
  {
    id: 'std-006',
    enrollmentNo: '0901IT221008',
    name: 'Anushka Saxena',
    email: 'anushka.0901it22@mitsgwalior.in',
    phone: '+91 98264 55120',
    department: 'IT',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 88.0,
    subjectAttendance: [
      { subjectCode: 'IT-501', subjectName: 'Cloud Computing', attended: 26, total: 30 },
      { subjectCode: 'IT-502', subjectName: 'Distributed Databases', attended: 27, total: 30 }
    ],
    cgpa: 8.74,
    feeStatus: 'PAID',
    hostelResident: false,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 09:02 AM'
  },
  {
    id: 'std-007',
    enrollmentNo: '0901IT221034',
    name: 'Devendra Tomar',
    email: 'devendra.0901it22@mitsgwalior.in',
    phone: '+91 94250 18239',
    department: 'IT',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 64.5, // LOW ATTENDANCE ALERT!
    subjectAttendance: [
      { subjectCode: 'IT-501', subjectName: 'Cloud Computing', attended: 19, total: 30 },
      { subjectCode: 'IT-502', subjectName: 'Distributed Databases', attended: 20, total: 30 }
    ],
    cgpa: 6.42,
    feeStatus: 'DUE',
    hostelResident: true,
    consecutiveAbsents: 4,
    lastCheckIn: '4 days ago'
  },
  {
    id: 'std-008',
    enrollmentNo: '0901AI231012',
    name: 'Kashish Bhargava',
    email: 'kashish.0901ai23@mitsgwalior.in',
    phone: '+91 96301 77291',
    department: 'AIDS',
    semester: 3,
    section: 'A',
    batch: '2023-2027',
    overallAttendance: 91.3,
    subjectAttendance: [
      { subjectCode: 'AI-301', subjectName: 'Data Structures for AI', attended: 28, total: 30 },
      { subjectCode: 'AI-302', subjectName: 'Mathematics for Machine Learning', attended: 27, total: 30 }
    ],
    cgpa: 9.15,
    feeStatus: 'PAID',
    hostelResident: true,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 08:48 AM'
  },
  {
    id: 'std-009',
    enrollmentNo: '0901EC221019',
    name: 'Manish Rawat',
    email: 'manish.0901ec22@mitsgwalior.in',
    phone: '+91 99268 44018',
    department: 'EC',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 73.1, // LOW ATTENDANCE ALERT!
    subjectAttendance: [
      { subjectCode: 'EC-501', subjectName: 'Microprocessors & Microcontrollers', attended: 22, total: 30 }
    ],
    cgpa: 7.20,
    feeStatus: 'PAID',
    hostelResident: false,
    consecutiveAbsents: 1,
    lastCheckIn: 'Yesterday 11:30 AM'
  },
  {
    id: 'std-010',
    enrollmentNo: '0901EE221051',
    name: 'Tanvi Agarwal',
    email: 'tanvi.0901ee22@mitsgwalior.in',
    phone: '+91 98263 11822',
    department: 'EE',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    overallAttendance: 86.4,
    subjectAttendance: [
      { subjectCode: 'EE-501', subjectName: 'Power Systems Analysis', attended: 26, total: 30 }
    ],
    cgpa: 8.56,
    feeStatus: 'PAID',
    hostelResident: true,
    consecutiveAbsents: 0,
    lastCheckIn: 'Today 08:52 AM'
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-rec-101',
    timestamp: '2026-09-22T09:00:00Z',
    date: '2026-09-22',
    slot: '09:00 AM - 10:00 AM',
    subjectCode: 'CS-501',
    subjectName: 'Compiler Design',
    department: 'CSE',
    semester: 5,
    section: 'A',
    facultyId: 'stf-001',
    facultyName: 'Dr. Manish Dixit',
    totalStudents: 5,
    presentCount: 4,
    absentCount: 1,
    lateCount: 0,
    mode: 'MANUAL_ROSTER',
    studentStatus: {
      'std-001': 'P',
      'std-002': 'P',
      'std-003': 'A',
      'std-004': 'P',
      'std-005': 'P'
    }
  },
  {
    id: 'att-rec-102',
    timestamp: '2026-09-22T10:00:00Z',
    date: '2026-09-22',
    slot: '10:00 AM - 11:00 AM',
    subjectCode: 'CS-502',
    subjectName: 'Operating Systems',
    department: 'CSE',
    semester: 5,
    section: 'A',
    facultyId: 'stf-003',
    facultyName: 'Prof. Neha Bharadwaj',
    totalStudents: 5,
    presentCount: 3,
    absentCount: 2,
    lateCount: 0,
    mode: 'QR_DYNAMIC',
    studentStatus: {
      'std-001': 'P',
      'std-002': 'P',
      'std-003': 'A',
      'std-004': 'A',
      'std-005': 'P'
    }
  },
  {
    id: 'att-rec-103',
    timestamp: '2026-09-22T11:15:00Z',
    date: '2026-09-22',
    slot: '11:15 AM - 12:15 PM',
    subjectCode: 'IT-501',
    subjectName: 'Cloud Architecture',
    department: 'IT',
    semester: 5,
    section: 'A',
    facultyId: 'stf-004',
    facultyName: 'Dr. Sanjeev Khanna',
    totalStudents: 2,
    presentCount: 1,
    absentCount: 1,
    lateCount: 0,
    mode: 'MANUAL_ROSTER',
    studentStatus: {
      'std-006': 'P',
      'std-007': 'A'
    }
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Automated Alert: 14 Students Identified Below 75% Attendance Threshold in 5th Sem',
    content: 'Automated IMS telemetry audit has detected that 14 students across CSE and IT 5th Semester currently have cumulative attendance below the mandatory 75% autonomous threshold. Parents and mentors have been automatically notified via SMS & Institutional Email.',
    author: 'IMS Autonomous Trigger Engine',
    authorRole: 'System Automation',
    priority: 'URGENT',
    category: 'ATTENDANCE',
    timestamp: '15 minutes ago',
    targetAudience: 'ALL',
    channels: ['PORTAL', 'EMAIL', 'SMS'],
    isAutomated: true,
    automatedTriggerType: 'LOW_ATTENDANCE',
    readBy: ['stf-001'],
    pinned: true,
    acknowledgedCount: 42
  },
  {
    id: 'ann-002',
    title: 'Autonomous End-Semester Examination Schedule (Nov-Dec 2026) Published',
    content: 'The Autonomous Examination Cell has officially uploaded the timetable for Mid-Semester and End-Semester Theory & Practical examinations for B.Tech / M.Tech / MCA. Students can download hall tickets starting 10th October.',
    author: 'Dr. P.K. Singhal',
    authorRole: 'Controller of Examinations',
    priority: 'HIGH' as PriorityLevel,
    category: 'EXAM',
    timestamp: '2 hours ago',
    targetAudience: 'STUDENTS',
    channels: ['PORTAL', 'EMAIL', 'APP_PUSH'],
    readBy: ['std-001', 'std-002'],
    pinned: true,
    acknowledgedCount: 128
  },
  {
    id: 'ann-003',
    title: 'Campus Recruitment Drive: Cisco & Goldman Sachs On-Site Interviews',
    content: 'Training & Placement Cell invites eligible 7th Semester B.Tech students (CSE, IT, AIDS, EC with CGPA >= 7.5 and no active backlogs) to report at MITS Golden Jubilee Auditorium tomorrow at 08:30 AM in formal attire with 3 copies of resume.',
    author: 'Dr. Vikram Rajpoot',
    authorRole: 'Head, Training & Placement Cell',
    priority: 'HIGH' as PriorityLevel,
    category: 'PLACEMENT',
    timestamp: '5 hours ago',
    targetAudience: 'STUDENTS',
    departmentScope: 'CSE',
    channels: ['PORTAL', 'SMS', 'APP_PUSH'],
    readBy: ['std-001'],
    acknowledgedCount: 89
  },
  {
    id: 'ann-004',
    title: 'Staff Biometric Compliance Notice & Faculty Research Grant Application',
    content: 'All faculty members are reminded that biometric check-in cutoff is 09:15 AM. Proposals for AICTE-MODROBS and Institute Seed Research Grants (up to INR 5.0 Lakhs) are now open via Dean R&D portal.',
    author: 'Dr. R. K. Pandit',
    authorRole: 'Director, MITS Gwalior',
    priority: 'INFO',
    category: 'ADMINISTRATIVE',
    timestamp: 'Yesterday at 04:30 PM',
    targetAudience: 'FACULTY',
    channels: ['PORTAL', 'EMAIL'],
    readBy: ['stf-001', 'stf-004', 'stf-006'],
    acknowledgedCount: 67
  },
  {
    id: 'ann-005',
    title: 'National Robotics & Generative AI Hackathon at AICTE IDEA Lab',
    content: 'MITS Gwalior AICTE IDEA Lab is hosting a 36-hour inter-collegiate Hackathon sponsored by Madhya Pradesh Council of Science & Technology (MPCST). Cash prizes worth INR 2,50,000 to be won.',
    author: 'Dr. Hemant Shrivastava',
    authorRole: 'Coordinator, IDEA Lab',
    priority: 'INFO',
    category: 'EVENT',
    timestamp: '2 days ago',
    targetAudience: 'ALL',
    channels: ['PORTAL'],
    readBy: ['std-002'],
    acknowledgedCount: 310
  }
];
