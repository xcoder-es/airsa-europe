export type SceneId = 'scene-01' | 'scene-02' | 'scene-03' | 'scene-04';

export interface SceneConfig {
  id: SceneId;
  label: string;
  scrollHeight: number;
  pin: boolean;
}

export interface SceneProgress {
  progress: number;
  isActive: boolean;
  isComplete: boolean;
}
