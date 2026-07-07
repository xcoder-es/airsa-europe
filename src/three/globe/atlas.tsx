'use client';

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export interface AtlasState {
  africaGlow: number;
  europeGlow: number;
  madridGlow: number;
  scrollOffset: number;
  rotationSpeed: number;
}

const DEFAULT_STATE: AtlasState = {
  africaGlow: 0.3,
  europeGlow: 0,
  madridGlow: 0,
  scrollOffset: 0,
  rotationSpeed: 0.04,
};

interface AtlasContextValue {
  state: AtlasState;
  update: (partial: Partial<AtlasState>) => void;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AtlasState>(DEFAULT_STATE);
  const stateRef = useRef(state);
  stateRef.current = state;

  const update = useCallback((partial: Partial<AtlasState>) => {
    const prev = stateRef.current;
    let changed = false;
    const next = { ...prev };
    for (const key of Object.keys(partial) as (keyof AtlasState)[]) {
      const value = partial[key];
      if (value !== undefined && prev[key] !== value) {
        next[key] = value;
        changed = true;
      }
    }
    if (changed) {
      setState(next);
    }
  }, []);

  return (
    <AtlasContext.Provider value={{ state, update }}>
      {children}
    </AtlasContext.Provider>
  );
}

export function useAtlas(): AtlasContextValue {
  const ctx = useContext(AtlasContext);
  if (!ctx) {
    throw new Error('useAtlas must be used within an AtlasProvider');
  }
  return ctx;
}
