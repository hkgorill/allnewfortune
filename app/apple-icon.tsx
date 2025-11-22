import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
          borderRadius: '36px', // Apple style smooth corners
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad_apple" x1="0" y1="0" x2="120" y2="120">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
             <filter id="glow_apple">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="60" cy="60" r="50" stroke="url(#grad_apple)" strokeWidth="4" opacity="0.3" />
          <path
            d="M60 10L70 45L105 45L77 68L88 105L60 82L32 105L43 68L15 45L50 45L60 10Z"
            fill="url(#grad_apple)"
            filter="url(#glow_apple)"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}


