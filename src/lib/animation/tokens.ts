export const motionTokens = {
  duration: {
    instant: 0.1,
    fast: 0.3,
    medium: 0.6,
    slow: 1.2,
    cinematic: 2.4,
  },
  ease: {
    primary: [0.25, 0.1, 0.25, 1] as const,
    enter: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
} as const;

export const sceneConfigs = [
  { id: 'scene-01' as const, label: 'Cosmic Intro', scrollHeight: 3, pin: true },
  { id: 'scene-02' as const, label: 'Continent Link', scrollHeight: 2.5, pin: true },
  { id: 'scene-03' as const, label: 'The Thesis', scrollHeight: 3, pin: true },
];
