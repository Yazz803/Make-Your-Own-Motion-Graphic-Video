export type TourStepId =
  | 'navbar'
  | 'hero'
  | 'workflow'
  | 'catalog'
  | 'studio-form'
  | 'studio-output'
  | 'preview'
  | 'panduan'
  | 'support'
  | 'footer';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourGuideStep {
  id: TourStepId;
  targetId: TourStepId;
  badge: string;
  title: string;
  description: string;
  tip?: string;
  preferredPlacement: TourPlacement;
}

export type TourGuideStatus = 'pending' | 'completed' | 'skipped';

export interface TourGuideStorageState {
  version: number;
  status: TourGuideStatus;
  lastStepIndex: number;
  updatedAt: string | null;
}
