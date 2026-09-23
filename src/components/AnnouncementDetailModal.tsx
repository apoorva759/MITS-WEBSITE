import React from 'react';
import { 
  FileText, 
  Clock, 
  User, 
  Radio, 
  CheckCircle2, 
  Share2, 
  Bot, 
  Smartphone, 
  AlertTriangle 
} from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementDetailModalProps {
  announcement: Announcement | null;
  onClose: () => void;
  onAcknowledge?: (id: string) => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  onClose,
  onAcknowledge,
}) => {
  if (!announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                  announcement.priority === 'URGENT'
                    ? 'bg-rose-600 text-white'
                    : announcement.priority === 'HIGH'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {announcement.priority}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                {announcement.category}
              </span>
              {announcement.isAutomated && (
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
                  <Bot className="w-3 h-3 text-emerald-600" />
                  Automated Trigger Bot
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-serif leading-snug">
              {announcement.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <strong>Issued By:</strong> {announcement.author} ({announcement.authorRole})
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {announcement.timestamp}
          </span>
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-blue-500" />
            Target: {announcement.targetAudience}
          </span>
        </div>

        <div className="text-slate-700 text-sm leading-relaxed space-y-3 whitespace-pre-line py-2">
          {announcement.content}
        </div>

        {/* Multi-channel audit strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold text-[11px]">Dispatched Channels:</span>
            {announcement.channels.map(ch => (
              <span key={ch} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                {ch}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onAcknowledge) onAcknowledge(announcement.id);
                onClose();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acknowledge Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
