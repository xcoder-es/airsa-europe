'use client';

import dynamic from 'next/dynamic';

const Experience = dynamic(
  () => import('@/components/experience').then((m) => m.Experience),
  { ssr: false },
);

export default function Home() {
  return <Experience />;
}
