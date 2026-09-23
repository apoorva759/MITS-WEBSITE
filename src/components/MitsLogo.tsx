import React from 'react';

interface MitsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
}

export const MitsLogo: React.FC<MitsLogoProps> = ({
  size = 'md',
  variant = 'color',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-base', sub: 'text-xs' },
    lg: { icon: 'w-14 h-14', text: 'text-xl', sub: 'text-sm' },
    xl: { icon: 'w-20 h-20', text: 'text-2xl', sub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* MITS Gwalior Royal Emblem Crest */}
      <div
        className={`relative ${currentSize.icon} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 shadow-md p-1.5 border border-amber-400/40`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200 fill-current drop-shadow-sm">
          {/* Outer Royal Arch / Gear Ring */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Scindia Crown / Shield Contour */}
          <path
            d="M 50 14 L 74 26 C 74 58 50 78 50 78 C 50 78 26 58 26 26 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          
          {/* Lamp of Knowledge / Flame of Learning */}
          <path
            d="M 50 30 C 53 35 57 38 57 43 C 57 48 53 51 50 51 C 47 51 43 48 43 43 C 43 38 47 35 50 30 Z"
            fill="#fef08a"
          />
          <ellipse cx="50" cy="53" rx="14" ry="4" fill="currentColor" />
          <path d="M 40 54 L 44 62 L 56 62 L 60 54 Z" fill="currentColor" />
          <line x1="38" y1="64" x2="62" y2="64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          {/* 1957 Established Banner */}
          <rect x="28" y="81" width="44" height="12" rx="3" fill="#0f172a" stroke="currentColor" strokeWidth="1.5" />
          <text
            x="50"
            y="90"
            fill="#fde68a"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="'Cinzel', serif"
          >
            ESTD 1957
          </text>
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-wider uppercase font-serif ${
              variant === 'light' ? 'text-white' : 'text-slate-900'
            } ${currentSize.text}`}
          >
            MITS GWALIOR
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/30">
            NAAC A++
          </span>
        </div>
        {showSubtitle && (
          <p
            className={`font-medium line-clamp-1 ${
              variant === 'light' ? 'text-slate-300' : 'text-slate-500'
            } ${currentSize.sub}`}
          >
            Madhav Institute of Technology & Science
          </p>
        )}
      </div>
    </div>
  );
};
