export type RepoSource = 'bang-motion' | 'lemo-opuscar';

export type AspectRatio = '9:16' | '16:9' | '1:1';

export type DurationSec = 15 | 30 | 45 | 60;

export interface MotionStyle {
  id: string;
  name: string;
  repo: RepoSource;
  skillHandle: '@bang-motion' | '@lemo-opuscar';
  repoUrl: string;
  stylePath: string;
  engine: string;
  station: string;
  shortDesc: string;
  visualLanguage: string;
  cameraGrammar: string;
  bestFor: string[];
  palette: string[];
  imageUrl: string;
  demoTitle?: string;
  promptDirective: string;
}

export interface CompactStyleSeed {
  slug: string;
  name: string;
  demoTitle: string;
  desc: string;
  palette?: string[];
}

export interface StationConfig {
  station: string;
  engine: string;
  defaultPalette: string[];
  cameraGrammar: string;
  bestFor: string[];
  visualPrefix: string;
  items: CompactStyleSeed[];
}

export interface QuickBriefPreset {
  id: string;
  label: string;
  styleId: string;
  aspectRatio: AspectRatio;
  durationSec: DurationSec;
  topic: string;
  audience: string;
}
