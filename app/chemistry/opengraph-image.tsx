import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '궁합 테스트 결과 - ALL NEW FORTUNE';
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
          background: 'linear-gradient(to bottom right, #9f1239, #db2777)',
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
          두 사람의 인연은? 💕
        </div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20, textShadow: '0 0 50px rgba(236, 72, 153, 0.5)' }}>
          궁합 점수 확인하기
        </div>
        <div style={{ fontSize: 40, opacity: 0.8 }}>
          겉궁합부터 속궁합까지 완벽 분석
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

