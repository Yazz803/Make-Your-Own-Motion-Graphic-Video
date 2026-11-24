import Navbar from '@/components/Navbar';
import MotionWorkspace from '@/components/MotionWorkspace';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Navbar />
      <MotionWorkspace />
    </div>
  );
}
