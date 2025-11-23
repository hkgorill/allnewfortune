import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '정통 사주팔자 분석 - ALL NEW FORTUNE';
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
          background: 'linear-gradient(to bottom right, #064e3b, #0d9488)',
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
          AI가 분석하는 정통 명리학 📜
        </div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20, textShadow: '0 0 50px rgba(16, 185, 129, 0.5)' }}>
          나의 사주팔자 분석
        </div>
        <div style={{ fontSize: 40, opacity: 0.8 }}>
          타고난 기운과 운명의 흐름 확인하기
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




