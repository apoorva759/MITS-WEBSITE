import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  UserCircle, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Building2, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MitsLogo } from './MitsLogo';
import { UserRole, Announcement } from '../types';

interface HeaderProps {
  currentView: 'PUBLIC' | 'DASHBOARD';
  onViewChange: (view: 'PUBLIC' | 'DASHBOARD') => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  announcements: Announcement[];
  onOpenNotifications: () => void;
  onSelectAnnouncement: (announcement: Announcement) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  activeRole,
  onRoleChange,
  announcements,
  onOpenNotifications,
  onSelectAnnouncement,
}) => {
  const [time, setTime] = useState<string>('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const urgentCount = announcements.filter(a => a.priority === 'URGENT' || a.priority === 'HIGH').length;
  const automatedCount = announcements.filter(a => a.isAutomated).length;

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top Institutional Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact & Location */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Phone className="w-3 h-3" /> +91-751-2409300
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Mail className="w-3 h-3" /> info@mitsgwalior.in
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-400">
              Race Course Road, Gola Ka Mandir, Gwalior (M.P.) - 474005
            </span>
          </div>

          {/* Center: Live Marquee of latest announcement */}
          {announcements.length > 0 && (
            <div className="flex items-center gap-2 overflow-hidden max-w-md w-full">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white animate-pulse uppercase tracking-wider flex-shrink-0">
                LIVE FLASH
              </span>
              <button
                onClick={() => onSelectAnnouncement(announcements[0])}
                className="truncate text-slate-200 hover:text-amber-300 text-left transition-colors text-[11px]"
              >
                {announcements[0].title}
              </button>
            </div>
          )}

          {/* Right: Clock & Badges */}
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 font-mono text-amber-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              <Clock className="w-3 h-3 text-amber-400" />
              {time || '09:00:00 AM'}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Govt. Aided Autonomous
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => onViewChange('PUBLIC')}
          className="cursor-pointer transition-transform active:scale-[0.99]"
        >
          <MitsLogo size="md" />
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            id="nav-public-portal-btn"
            onClick={() => onViewChange('PUBLIC')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'PUBLIC'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Institute Portal</span>
          </button>
          <button
            id="nav-ims-dashboard-btn"
            onClick={() => onViewChange('DASHBOARD')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'DASHBOARD'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>IMS Management & Analytics</span>
            <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px]">
              LIVE
            </span>
          </button>
        </div>

        {/* Right: Role Switcher & Notification Center */}
        <div className="flex items-center gap-3">
          {/* Role selector dropdown */}
          <div className="relative">
            <button
              id="header-role-dropdown-btn"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
            >
              <UserCircle className="w-4 h-4 text-amber-600" />
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Role</span>
                <span className="font-bold text-slate-900">
                  {activeRole === 'ADMIN' ? 'Director / Dean' : activeRole === 'FACULTY' ? 'Faculty / HoD' : 'Student'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Switch Active Persona
                </div>
                <button
                  onClick={() => { onRoleChange('ADMIN'); setIsRoleOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                    activeRole === 'ADMIN' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Super Admin / Director</div>
                    <div className="text-[10px] text-slate-500">Full Webstructure & Institute Control</div>
                  </div>
                  {activeRole === 'ADMIN' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                <button
                  onClick={() => { onRoleChange('FACULTY'); setIsRoleOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                    activeRole === 'FACULTY' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Faculty / HoD Portal</div>
                    <div className="text-[10px] text-slate-500">Attendance Logger & Department Workload</div>
                  </div>
                  {activeRole === 'FACULTY' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </button>
                <button
                  onClick={() => { onRoleChange('STUDENT'); setIsRoleOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                    activeRole === 'STUDENT' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Student Portal (0901CS221001)</div>
                    <div className="text-[10px] text-slate-500">Personal Attendance & Academic Ledger</div>
                  </div>
                  {activeRole === 'STUDENT' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              id="header-notif-bell-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
              title="Automated Announcements & Notifications"
            >
              <Bell className="w-4 h-4" />
              {urgentCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {urgentCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Institute Announcements</span>
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      {automatedCount} Auto
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onOpenNotifications();
                    }}
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {announcements.slice(0, 4).map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectAnnouncement(item);
                        setIsNotifOpen(false);
                      }}
                      className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.priority === 'URGENT'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'HIGH'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onOpenNotifications();
                    }}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900"
                  >
                    Open Automated Notification Center &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
