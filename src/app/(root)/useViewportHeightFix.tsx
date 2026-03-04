"use client";
import { useEffect } from "react";

export default function useViewportHeightFix() {
  useEffect(() => {
    const setAppHeight = () => {
      // Only update height if the resize was due to orientation change (big height change)
      const currentHeight = window.visualViewport?.height;
      document.documentElement.style.setProperty(
        "--app-height",
        `${currentHeight}px`
      );
    };

    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);
}
