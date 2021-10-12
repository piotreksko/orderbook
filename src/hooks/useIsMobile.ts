import { useEffect, useState } from "react";
import { SMALL_SCREEN_WIDTH } from "src/constants/screens";
import { throttle } from "src/utils/throttle";

function useIsMobile(delay = 100): boolean {
  const getIsMobile = (): boolean => window.innerWidth < SMALL_SCREEN_WIDTH;
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(getIsMobile());
    };
    const debouncedHandleResize = throttle(handleResize, delay);
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [delay]);

  return isMobile;
}

export default useIsMobile;
