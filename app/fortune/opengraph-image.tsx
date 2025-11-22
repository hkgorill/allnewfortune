import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '2026년 신년운세 결과 - ALL NEW FORTUNE';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #2e1065, #db2777)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div style={{ 
          fontSize: 30, 
          marginBottom: 20,
          background: 'rgba(255,255,255,0.1)',
          padding: '10px 30px',
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          2026년 병오년 뱀띠해 🐍
        </div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20, textShadow: '0 0 50px rgba(219, 39, 119, 0.5)' }}>
          당신의 신년운세 결과
        </div>
        <div style={{ fontSize: 40, opacity: 0.8 }}>
          재물운 💰 연애운 💘 직업운 💼
        </div>
        <div style={{ 
          marginTop: 50,
          fontSize: 24,
          opacity: 0.6
        }}>
          ALL NEW FORTUNE
        </div>
      </div>
    ),
    { ...size }
  );
}

