"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden my-6 flex justify-center min-h-[100px]">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

