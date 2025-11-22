"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAdSenseProps {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: string;
}

export default function GoogleAdSense({
  slot,
  style = { display: "block" },
  format = "auto",
  responsive = "true",
}: GoogleAdSenseProps) {
  // AdSense 승인 전까지 비활성화
  return null;

  /*
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번 보이면 관찰 중단
        }
      },
      { threshold: 0, rootMargin: "200px" } // 화면에 들어오기 200px 전부터 로드 준비
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      const pushAd = () => {
        try {
          // 너비 체크: 0이면 잠시 후 재시도
          if (adRef.current && adRef.current.offsetWidth === 0) {
            setTimeout(pushAd, 200);
            return;
          }
          // 이미 광고가 있는지 확인 (더블 로드 방지)
          const adsbygoogle = (window as any).adsbygoogle || [];
          const adElement = adRef.current?.querySelector(".adsbygoogle");

          // data-ad-status가 filled면 이미 로드된 것
          if (adElement && adElement.getAttribute("data-ad-status")) {
            setIsLoaded(true);
            return;
          }

          // 안전하게 push
          if (adRef.current && adRef.current.offsetWidth > 0) {
             (adsbygoogle).push({});
             setIsLoaded(true);
          } else {
             setTimeout(pushAd, 200);
          }

        } catch (err: any) {
          // 너비 0 에러는 재시도 (콘솔 로그 생략)
          if (err?.message?.includes("availableWidth=0") || err?.toString()?.includes("availableWidth=0")) {
            setTimeout(pushAd, 500);
            return;
          }
          console.error("AdSense error:", err);
        }
      };

      // 초기 실행 시 약간의 지연
      setTimeout(pushAd, 100);
    }
  }, [isVisible, isLoaded]);

  return (
    <div 
      ref={adRef}
      className="w-full overflow-hidden my-6 flex justify-center min-h-[100px] text-center"
    >
      <ins
        className="adsbygoogle block w-full"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
  */
}
