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
          background: '#111827',
        }}
      >
         {/* Background Gradient Glow */}
         <div style={{
            position: 'absolute',
            width: '512px',
            height: '512px',
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
         }} />

        <svg
          width="340"
          height="340"
          viewBox="0 0 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad_512" x1="0" y1="0" x2="340" y2="340">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            <filter id="glow_512">
              <feGaussianBlur stdDeviation="10" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Complex Orbits */}
          <circle cx="170" cy="170" r="160" stroke="url(#grad_512)" strokeWidth="3" strokeOpacity="0.2" />
          <circle cx="170" cy="170" r="130" stroke="url(#grad_512)" strokeWidth="2" strokeDasharray="15 15" strokeOpacity="0.4" />
          
          {/* Planet/Node decorations */}
          <circle cx="170" cy="10" r="6" fill="#FCD34D" />
          <circle cx="170" cy="330" r="6" fill="#FCD34D" />
          <circle cx="10" cy="170" r="6" fill="#60A5FA" />
          <circle cx="330" cy="170" r="6" fill="#A78BFA" />

          {/* Main Star Symbol */}
          <path
            d="M170 40 L195 135 L290 135 L215 195 L240 290 L170 235 L100 290 L125 195 L50 135 L145 135 Z"
            fill="url(#grad_512)"
            filter="url(#glow_512)"
          />
        </svg>
        
        {/* Text Label (Optional for 512 icon) - Let's keep it symbol only for clean look */}
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}





