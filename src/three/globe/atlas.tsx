'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AtlasState {
  europeGlow: number;
  africaGlow: number;
  madridGlow: number;
  showConnections: boolean;
  connectionProgress: number;
  scrollOffset: number;
  rotationSpeed: number;
  cameraTarget: [number, number, number] | undefined;
}

interface AtlasContextValue {
  state: AtlasState;
  update: (partial: Partial<AtlasState>) => void;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

const defaultState: AtlasState = {
  europeGlow: 0,
  africaGlow: 0.3,
  madridGlow: 0,
  showConnections: false,
  connectionProgress: 0,
  scrollOffset: 0,
  rotationSpeed: 0.05,
  cameraTarget: undefined,
};

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AtlasState>(defaultState);

  const update = useCallback((partial: Partial<AtlasState>) => {
    setState((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const key of Object.keys(partial) as (keyof AtlasState)[]) {
        const value = partial[key];
        if (value !== undefined && next[key] !== value) {
          (next as Record<string, unknown>)[key] = value;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  return (
    <AtlasContext.Provider value={{ state, update }}>{children}</AtlasContext.Provider>
  );
}

export function useAtlas(): AtlasContextValue {
  const ctx = useContext(AtlasContext);
  if (!ctx) {
    throw new Error('useAtlas must be used within an <AtlasProvider>');
  }
  return ctx;
}
