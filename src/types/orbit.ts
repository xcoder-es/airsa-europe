export interface OrbitNode {
  id: string;
  label: string;
  color?: string;
}

export interface OrbitSystemProps {
  centerText: string;
  nodes: OrbitNode[];
  progress: number;
  subtitle?: string;
  className?: string;
}
