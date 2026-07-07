'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/system/error-boundary';
import { SmoothScrollProvider } from '@/components/system/smooth-scroll-provider';

const Scene01 = dynamic(
  () => import('@/sections/scene-01-cosmic-intro').then((m) => m.Scene01CosmicIntro),
  { ssr: false },
);
const Scene02 = dynamic(
  () => import('@/sections/scene-02-continent-link').then((m) => m.Scene02ContinentLink),
  { ssr: false },
);
const Scene03 = dynamic(
  () => import('@/sections/scene-03-thesis').then((m) => m.Scene03Thesis),
  { ssr: false },
);
const Scene04 = dynamic(
  () => import('@/sections/scene-04-spain-gateway').then((m) => m.Scene04SpainGateway),
  { ssr: false },
);

export function Experience() {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <main className="bg-black">
          <Scene01 />
          <Scene02 />
          <Scene03 />
          <Scene04 />
        </main>
      </SmoothScrollProvider>
    </ErrorBoundary>
  );
}
