export type GuideTab = 'gemini-web' | 'cli-local';

export interface GuideStep {
  number: string;
  title: string;
  description: string;
  tip?: string;
}

export interface GeminiScreenshotRef {
  src: string;
  title: string;
  caption: string;
}

export interface CliCommandItem {
  id: string;
  label: string;
  repoName: string;
  repoUrl: string;
  command: string;
  note: string;
}
