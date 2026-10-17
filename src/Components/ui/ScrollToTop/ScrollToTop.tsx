import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router'

export default function ScrollToTop() {
    const {key} = useLocation();
    const navigationType = useNavigationType();
  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [key, navigationType]);

  return null;
}

