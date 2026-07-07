'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface AtlasState {
  europeGlow: number;
  africaGlow: number;
  madridGlow: number;
  madridScale: number;
  showConnections: boolean;
  connectionProgress: number;
  scrollOffset: number;
  rotationSpeed: number;
}

interface AtlasContextValue {
  state: AtlasState;
  update: (partial: Partial<AtlasState>) => void;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

const INITIAL_STATE: AtlasState = {
  europeGlow: 0,
  africaGlow: 0.3,
  madridGlow: 0,
  madridScale: 1,
  showConnections: false,
  connectionProgress: 0,
  scrollOffset: 0,
  rotationSpeed: 0.05,
};

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AtlasState>(INITIAL_STATE);

  const update = useCallback((partial: Partial<AtlasState>) => {
    setState((prev: AtlasState) => {
      let changed = false;
      const next = { ...prev };
      for (const key of Object.keys(partial) as (keyof AtlasState)[]) {
        if (next[key] !== partial[key]) {
          changed = true;
        }
        (next as Record<string, number | boolean>)[key] = partial[key] as
          number | boolean;
      }
      return changed ? next : prev;
    });
  }, []);

  const value = useMemo(() => ({ state, update }), [state, update]);

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas(): AtlasContextValue {
  const ctx = useContext(AtlasContext);
  if (!ctx) {
    throw new Error('useAtlas must be used within an <AtlasProvider>');
  }
  return ctx;
}

export function useAtlasSafe(): AtlasContextValue | null {
  return useContext(AtlasContext);
}
