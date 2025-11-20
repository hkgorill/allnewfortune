'use client';

import { useEffect, useRef } from 'react';

interface KakaoAdFitProps {
  unit: string;
  width: string;
  height: string;
  className?: string;
}

export default function KakaoAdFit({ unit, width, height, className }: KakaoAdFitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // 이미 광고가 로드되었는지 확인 (중복 로드 방지)
    if (adRef.current.querySelector('iframe')) return;

    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', unit);
    ins.setAttribute('data-ad-width', width);
    ins.setAttribute('data-ad-height', height);

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    adRef.current.appendChild(ins);
    adRef.current.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 정리 (필요 시)
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [unit, width, height]);

  return (
    <div className={`flex justify-center items-center overflow-hidden rounded-xl shadow-sm bg-white/50 backdrop-blur-sm border border-white/50 ${className}`}>
       <div ref={adRef} style={{ minWidth: `${width}px`, minHeight: `${height}px` }} />
    </div>
  );
}
