"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LZString from "lz-string";

export function useUrlShare<T>() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sharedData, setSharedData] = useState<T | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const shareParam = searchParams.get("share");
    if (shareParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(shareParam);
        if (decompressed) {
          const parsedData = JSON.parse(decompressed);
          setSharedData(parsedData);
        }
      } catch (e) {
        console.error("Failed to parse shared data", e);
      }
    }
    setIsLoaded(true);
  }, [searchParams]);

  const shareData = (data: T) => {
    try {
      const jsonString = JSON.stringify(data);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      
      // 현재 URL에 share 파라미터 추가 (History stack에 쌓지 않고 교체)
      const newUrl = `${window.location.pathname}?share=${compressed}`;
      window.history.replaceState(null, "", newUrl);
    } catch (e) {
      console.error("Failed to compress data", e);
    }
  };

  const clearShareUrl = () => {
    window.history.replaceState(null, "", window.location.pathname);
  };

  return { sharedData, isLoaded, shareData, clearShareUrl };
}

