'use client';

import { useState } from 'react';
import { Footer, Navbar, StarfieldCanvas } from '@/components/layout';
import { StyleCatalog } from '@/features/catalog';
import { PromptStudio } from '@/features/prompt-studio';
import { SkillGuideSection } from '@/features/skill-guide';
import { LiveStagePreview } from '@/features/stage-preview';
import { MOTION_STYLES } from '@/lib/constants';
import type { AspectRatio, MotionStyle } from '@/types';
import HeroSection from './HeroSection';

export default function MotionWorkspace() {
  const [selectedStyle, setSelectedStyle] = useState<MotionStyle>(
    MOTION_STYLES[0]
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [ambientMotion, setAmbientMotion] = useState<boolean>(true);

  return (
    <>
      <StarfieldCanvas animated={ambientMotion} />

      <Navbar
        ambientMotion={ambientMotion}
        onToggleAmbientMotion={() => setAmbientMotion((prev) => !prev)}
      />

      <main id="top" className="relative z-10">
        <HeroSection
          selectedStyle={selectedStyle}
          aspectRatio={aspectRatio}
          ambientMotion={ambientMotion}
        />

        <StyleCatalog
          selectedStyleId={selectedStyle.id}
          onSelectStyle={setSelectedStyle}
        />

        <PromptStudio
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
          aspectRatio={aspectRatio}
          onChangeAspectRatio={setAspectRatio}
        />

        <LiveStagePreview
          aspectRatio={aspectRatio}
          onChangeAspectRatio={setAspectRatio}
        />

        <SkillGuideSection />
      </main>

      <Footer />
    </>
  );
}
