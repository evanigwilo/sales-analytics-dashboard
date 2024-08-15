// React
import { useLayoutEffect } from "react";

export const useResize = (callback: (ev?: UIEvent) => void, runOnce = true) => {
  useLayoutEffect(() => {
    // Define the resize handler
    const handleResize = (ev: UIEvent) => {
      callback(ev);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Execute callback immediately if runOnce is true
    if (runOnce) {
      callback();
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback, runOnce]); // Include dependencies to handle changes
};
