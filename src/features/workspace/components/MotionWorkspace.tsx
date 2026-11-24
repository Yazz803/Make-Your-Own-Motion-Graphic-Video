'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Footer, Navbar, StarfieldCanvas } from '@/components/layout';
import { StyleCatalog } from '@/features/catalog';
import { PromptStudio } from '@/features/prompt-studio';
import { SkillGuideSection } from '@/features/skill-guide';
import { LiveStagePreview } from '@/features/stage-preview';
import { SupportDeveloperSection } from '@/features/support';
import { TourGuideOverlay, useTourGuide } from '@/features/tour-guide';
import { useStudioConfig } from '@/hooks';
import { resolveMotionStyleById } from '@/lib/studio-config';
import type { AspectRatio, MotionStyle } from '@/types';
import HeroSection from './HeroSection';

export default function MotionWorkspace() {
  const { config, updateConfig } = useStudioConfig();
  const selectedStyle = useMemo(
    () => resolveMotionStyleById(config.styleId),
    [config.styleId]
  );
  const [ambientMotion, setAmbientMotion] = useState<boolean>(true);
  const tourTriggerRef = useRef<HTMLButtonElement | null>(null);
  const tour = useTourGuide();

  const handleSelectStyle = useCallback(
    (style: MotionStyle) => {
      updateConfig((prev) => ({ ...prev, styleId: style.id }));
    },
    [updateConfig]
  );

  const handleChangeAspectRatio = useCallback(
    (aspectRatio: AspectRatio) => {
      updateConfig((prev) => ({ ...prev, aspectRatio }));
    },
    [updateConfig]
  );

  return (
    <>
      <StarfieldCanvas animated={ambientMotion} />

      <Navbar
        ambientMotion={ambientMotion}
        onToggleAmbientMotion={() => setAmbientMotion((prev) => !prev)}
        isTourOpen={tour.isOpen}
        onStartTour={tour.startTour}
        tourTriggerRef={tourTriggerRef}
      />

      <main id="top" className="relative z-10">
        <HeroSection
          selectedStyle={selectedStyle}
          aspectRatio={config.aspectRatio}
          ambientMotion={ambientMotion}
        />

        <StyleCatalog
          selectedStyleId={selectedStyle.id}
          onSelectStyle={handleSelectStyle}
        />

        <PromptStudio
          selectedStyle={selectedStyle}
          onSelectStyle={handleSelectStyle}
          aspectRatio={config.aspectRatio}
          onChangeAspectRatio={handleChangeAspectRatio}
        />

        <LiveStagePreview
          aspectRatio={config.aspectRatio}
          onChangeAspectRatio={handleChangeAspectRatio}
        />

        <SkillGuideSection />

        <SupportDeveloperSection />
      </main>

      <Footer />

      <TourGuideOverlay
        isOpen={tour.isOpen}
        openedManually={tour.openedManually}
        step={tour.currentStep}
        stepIndex={tour.currentStepIndex}
        totalSteps={tour.totalSteps}
        restoreFocusRef={tourTriggerRef}
        onNext={tour.nextStep}
        onPrev={tour.prevStep}
        onSkip={tour.skipTour}
        onGoToStep={tour.goToStep}
      />
    </>
  );
}
