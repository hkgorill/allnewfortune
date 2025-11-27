import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ALL NEW FORTUNE - 2026년 신년운세 & AI 종합 운세';
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
          background: 'linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Main content */}
        <div style={{ 
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}>
          <div style={{ 
            fontSize: 36, 
            marginBottom: 10,
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 40px',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
          }}>
            2026년 병오년 신년운세 🐍
          </div>
          
          <div style={{ 
            fontSize: 96, 
            fontWeight: 'bold', 
            marginBottom: 20,
            background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(236, 72, 153, 0.5)',
            lineHeight: 1.1,
          }}>
            ALL NEW FORTUNE
          </div>
          
          <div style={{ 
            fontSize: 48, 
            opacity: 0.9,
            marginTop: 10,
            fontWeight: 600,
          }}>
            AI가 정밀 분석해주는
          </div>
          
          <div style={{ 
            fontSize: 42, 
            opacity: 0.85,
            marginTop: 10,
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <span>사주</span>
            <span>•</span>
            <span>타로</span>
            <span>•</span>
            <span>MBTI</span>
            <span>•</span>
            <span>심리테스트</span>
            <span>•</span>
            <span>별자리 운세</span>
          </div>
          
          <div style={{ 
            marginTop: 50,
            fontSize: 28,
            opacity: 0.7,
            fontWeight: 300,
          }}>
            생년월일만으로 알아보는 무료 종합 운세 서비스
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}




