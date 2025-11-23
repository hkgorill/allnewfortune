import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111827', // Solid dark bg for PWA
        }}
      >
         {/* Background Gradient Circle */}
         <div style={{
            position: 'absolute',
            width: '192px',
            height: '192px',
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
         }} />
        
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad_192" x1="0" y1="0" x2="128" y2="128">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <filter id="glow_192">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Orbit Rings */}
          <circle cx="64" cy="64" r="58" stroke="url(#grad_192)" strokeWidth="2" strokeOpacity="0.3" />
          <circle cx="64" cy="64" r="48" stroke="url(#grad_192)" strokeWidth="1" strokeDasharray="8 8" strokeOpacity="0.5" />

          {/* Main Star */}
          <path
            d="M64 14L74 50L110 50L81 74L92 110L64 88L36 110L47 74L18 50L54 50L64 14Z"
            fill="url(#grad_192)"
            filter="url(#glow_192)"
          />
        </svg>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}





