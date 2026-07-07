import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let gsapPromise: Promise<{
  gsap: typeof import('gsap').default;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}> | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function initScrollOrchestrator() {
  if (!gsapPromise) {
    gsapPromise = (async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    })();
  }
  return gsapPromise;
}
