import dynamic from 'next/dynamic';

export const Scene01CosmicIntro = dynamic(
  () => import('@/sections/scene-01-cosmic-intro').then((m) => m.Scene01CosmicIntro),
  { ssr: false },
);

export const Scene02ContinentLink = dynamic(
  () => import('@/sections/scene-02-continent-link').then((m) => m.Scene02ContinentLink),
  { ssr: false },
);

export const Scene03Thesis = dynamic(
  () => import('@/sections/scene-03-thesis').then((m) => m.Scene03Thesis),
  { ssr: false },
);

export const Scene04SpainGateway = dynamic(
  () => import('@/sections/scene-04-spain-gateway').then((m) => m.Scene04SpainGateway),
  { ssr: false },
);
