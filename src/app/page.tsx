import { Navbar } from '@/components/layout';
import { MotionWorkspace } from '@/features/workspace';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Navbar />
      <MotionWorkspace />
    </div>
  );
}
