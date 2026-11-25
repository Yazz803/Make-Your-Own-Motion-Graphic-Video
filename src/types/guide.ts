export type GuideTab = 'gemini-web' | 'cli-local';

export interface GeminiInstallPromptItem {
  id: string;
  stepNumber: string;
  skillName: string;
  skillHandle: string;
  repoName: string;
  repoUrl: string;
  prompt: string;
  description: string;
}

export interface GeminiScreenshotRef {
  src: string;
  title: string;
  caption: string;
  width?: number;
  height?: number;
}

export interface GeminiRecoveryStep {
  number: string;
  title: string;
  description: string;
  tip?: string;
  promptToCopy?: {
    id: string;
    label: string;
    text: string;
  };
  screenshot: GeminiScreenshotRef;
}

export interface GuideStep {
  number: string;
  title: string;
  description: string;
  tip?: string;
}

export interface CliCommandItem {
  id: string;
  label: string;
  repoName: string;
  repoUrl: string;
  command: string;
  note: string;
}
