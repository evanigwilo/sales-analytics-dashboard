// React
import { useState, useEffect } from "react";

// Custom Hooks
import { useResize } from "@/hooks/useResize";

export const useMobile = (): boolean => {
  const minWidth = 575;

  // Define a media query
  const mediaQuery = `(max-width: ${minWidth - 1}px)`;

  // Function to check if the viewport matches the media query
  const checkMobile = () => window.matchMedia(mediaQuery).matches;

  // State to store if the device is mobile
  const [isMobile, setIsMobile] = useState<boolean>(checkMobile);

  // Update state on resize
  useResize(() => {
    setIsMobile(checkMobile());
  });

  // Effect to handle initial setup and cleanup
  useEffect(() => {
    // Check on mount
    setIsMobile(checkMobile());

    // Optional: Handle cleanup if necessary
    return () => {
      // No cleanup needed here for media queries
    };
  }, []);

  return isMobile;
};
